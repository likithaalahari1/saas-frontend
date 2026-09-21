import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformId, PostVariant } from '../../types';
import { platformMeta } from '../common/BrandLogo';
import confetti from 'canvas-confetti';
import { 
  Upload, 
  Smile, 
  Hash, 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  AtSign, 
  Check, 
  Smartphone, 
  Monitor, 
  Send, 
  Calendar as CalendarIcon, 
  Save, 
  X, 
  Layers, 
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  Repeat,
  Play,
  Image as ImageIcon
import { fetchApi } from '../../services/api';

export const CreatePostStudio: React.FC = () => {

  const { 
    accounts, 
    createPost, 
    setActiveView, 
    editingPost, 
    setEditingPost,
    simulatePublishing,
    isPublishingProgress,
    publishingProgressMap,
    mediaAssets
  } = useApp();

  // Selected platforms to publish to
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>(
    editingPost ? editingPost.platforms : ['instagram', 'facebook', 'linkedin', 'twitter']
  );

  // Global Caption & Media
  const [globalCaption, setGlobalCaption] = useState(
    editingPost ? editingPost.globalCaption : '🚀 Excited to share our latest product features! Streamline your multi-platform social workflows in one place.'
  );

  const [globalMedia, setGlobalMedia] = useState<string[]>(
    editingPost ? editingPost.globalMediaUrls : ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80']
  );

  // Platform Overrides Tab
  const [activeTab, setActiveTab] = useState<'global' | PlatformId>('global');

  // Platform specific custom variants state
  const [variants, setVariants] = useState<Record<PlatformId, Partial<PostVariant>>>({
    instagram: { caption: '', hashtags: ['#marketing', '#saas', '#design'], customOptions: { postType: 'carousel' } },
    facebook: { caption: '' },
    linkedin: { caption: '', hashtags: ['#Productivity', '#B2B'] },
    twitter: { caption: '', hashtags: ['#buildinpublic'] },
    tiktok: { caption: '', hashtags: ['#techtok'], customOptions: { tiktokCoverUrl: '' } },
    youtube: { caption: '', customOptions: { title: 'Socially Platform Deep Dive Guide', tags: ['saas', 'tutorial'] } },
    pinterest: { caption: '' }
  });

  // Active Preview Mode
  const [previewPlatform, setPreviewPlatform] = useState<PlatformId>('instagram');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  // Modal States
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('2026-09-28');
  const [scheduleTime, setScheduleTime] = useState('10:30');
  const [scheduleTimezone, setScheduleTimezone] = useState('Asia/Kolkata');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Sync active preview platform with selected platform tabs
  useEffect(() => {
    if (activeTab !== 'global') {
      setPreviewPlatform(activeTab);
    }
  }, [activeTab]);

  const togglePlatform = (p: PlatformId) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length === 1) return; // keep at least 1
      setSelectedPlatforms(prev => prev.filter(item => item !== p));
    } else {
      setSelectedPlatforms(prev => [...prev, p]);
    }
  };

  const getEffectiveCaption = (platform: PlatformId) => {
    const custom = variants[platform]?.caption;
    return custom && custom.trim() !== '' ? custom : globalCaption;
  };

  const updateVariantCaption = (platform: PlatformId, text: string) => {
    setVariants(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        caption: text
      }
    }));
  };

  const handlePublishNow = async () => {
    try {
      await fetchApi('/posts/', {
        method: 'POST',
        body: JSON.stringify({
          global_caption: globalCaption,
          global_media_urls: globalMedia,
          platforms: selectedPlatforms,
          status: 'published',
          variants: Object.fromEntries(
            selectedPlatforms.map(p => [
              p,
              {
                caption: getEffectiveCaption(p),
                hashtags: variants[p]?.hashtags || [],
                custom_options: variants[p]?.customOptions || {}
              }
            ])
          )
        })
      });
    } catch (e) {
      console.log('Backend sync status:', e);
    }

    simulatePublishing(selectedPlatforms, () => {
      // Trigger celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });


      // Save post in state
      createPost({
        globalCaption,
        globalMediaUrls: globalMedia,
        platforms: selectedPlatforms,
        variants: Object.fromEntries(
          selectedPlatforms.map(p => [
            p,
            {
              platform: p,
              caption: getEffectiveCaption(p),
              hashtags: variants[p]?.hashtags || [],
              mediaUrls: globalMedia,
              status: 'published'
            }
          ])
        ) as any,
        status: 'published',
        publishedAt: new Date().toISOString(),
        createdBy: {
          id: 'u-1',
          name: 'Likitha Sri',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
        }
      });

      setTimeout(() => {
        setActiveView('published');
      }, 1200);
    });
  };

  const handleScheduleConfirm = () => {
    createPost({
      globalCaption,
      globalMediaUrls: globalMedia,
      platforms: selectedPlatforms,
      variants: Object.fromEntries(
        selectedPlatforms.map(p => [
          p,
          {
            platform: p,
            caption: getEffectiveCaption(p),
            hashtags: variants[p]?.hashtags || [],
            mediaUrls: globalMedia,
            status: 'pending'
          }
        ])
      ) as any,
      status: 'scheduled',
      scheduledAt: `${scheduleDate}T${scheduleTime}:00Z`,
      createdBy: {
        id: 'u-1',
        name: 'Likitha Sri',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
      }
    });

    setIsScheduleModalOpen(false);
    setActiveView('calendar');
  };

  const handleSaveDraft = () => {
    createPost({
      globalCaption,
      globalMediaUrls: globalMedia,
      platforms: selectedPlatforms,
      variants: Object.fromEntries(
        selectedPlatforms.map(p => [
          p,
          {
            platform: p,
            caption: getEffectiveCaption(p),
            hashtags: variants[p]?.hashtags || [],
            mediaUrls: globalMedia,
            status: 'pending'
          }
        ])
      ) as any,
      status: 'draft',
      createdBy: {
        id: 'u-1',
        name: 'Likitha Sri',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
      }
    });

    setActiveView('drafts');
  };

  const insertHashtag = (tag: string) => {
    setGlobalCaption(prev => prev + ' ' + tag);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1E7EE] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FCE7F3] text-[#C93D91] text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Content Creation Studio
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Create Content</h1>
          <p className="text-xs text-zinc-500 font-medium">Create once and publish across your connected channels seamlessly.</p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 rounded-xl border border-pinkborder bg-white text-zinc-700 font-bold text-xs hover:bg-[#FFF7FB] transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4 text-zinc-400" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-4 py-2 rounded-xl border border-[#E85AAD] bg-pink-50 text-[#C93D91] font-bold text-xs hover:bg-pink-100 transition-colors flex items-center gap-1.5"
          >
            <CalendarIcon className="w-4 h-4 text-[#E85AAD]" />
            <span>Schedule</span>
          </button>

          <button
            onClick={handlePublishNow}
            className="gradient-btn px-5 py-2.5 rounded-xl text-white font-extrabold text-xs flex items-center gap-2 shadow-pink-md"
          >
            <Send className="w-4 h-4" />
            <span>Publish Now</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Editor & Customizer vs Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Platform Selector & Customization Editor */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Target Platforms Selection Bar */}
          <div className="bg-white rounded-3xl border border-[#F1E7EE] p-5 shadow-pink-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
                Publish To ({selectedPlatforms.length} selected)
              </label>
              <span className="text-[11px] text-zinc-400 font-medium">Click platform to toggle</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {accounts.map(acc => {
                const isSelected = selectedPlatforms.includes(acc.platform);
                const meta = platformMeta[acc.platform];
                return (
                  <button
                    key={acc.id}
                    onClick={() => togglePlatform(acc.platform)}
                    className={`p-3 rounded-2xl border transition-all flex items-center gap-2.5 text-left ${
                      isSelected 
                        ? 'border-[#E85AAD] bg-gradient-to-r from-[#FFF7FB] to-[#FCE7F3]/50 shadow-sm' 
                        : 'border-[#F1E7EE] bg-white opacity-60 hover:opacity-100 hover:bg-[#FFF7FB]'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white border border-pinkborder shadow-xs">
                      {meta?.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-zinc-900 truncate">{meta?.name}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{acc.username}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-[#E85AAD] text-white' : 'border border-zinc-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Platform Customization Tabs Bar */}
          <div className="bg-white rounded-3xl border border-[#F1E7EE] p-5 shadow-pink-sm space-y-4">
            {/* Customization Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#F1E7EE]">
              <button
                onClick={() => setActiveTab('global')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'global' 
                    ? 'bg-[#E85AAD] text-white shadow-pink-sm' 
                    : 'text-zinc-600 hover:bg-[#FFF7FB]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Global Content</span>
              </button>

              {selectedPlatforms.map(p => {
                const meta = platformMeta[p];
                const isActive = activeTab === p;
                const hasCustom = Boolean(variants[p]?.caption && variants[p]?.caption?.trim() !== '');
                return (
                  <button
                    key={p}
                    onClick={() => setActiveTab(p)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                      isActive 
                        ? 'border-[#C93D91] bg-[#FCE7F3] text-[#C93D91]' 
                        : 'border-[#F1E7EE] text-zinc-600 hover:bg-[#FFF7FB]'
                    }`}
                  >
                    {meta?.icon}
                    <span>{meta?.name}</span>
                    {hasCustom && <span className="w-1.5 h-1.5 rounded-full bg-[#E85AAD]" />}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: Global vs Platform Override */}
            {activeTab === 'global' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-zinc-900">Global Post Caption</label>
                    <span className="text-[11px] font-bold text-zinc-400">
                      {globalCaption.length} / 2,200 chars
                    </span>
                  </div>

                  <div className="relative border border-[#F1E7EE] rounded-2xl p-3 focus-within:border-[#E85AAD] focus-within:ring-2 focus-within:ring-[#FCE7F3] transition-all bg-[#FFF7FB]/20">
                    <textarea
                      rows={5}
                      value={globalCaption}
                      onChange={(e) => setGlobalCaption(e.target.value)}
                      placeholder="Write your message here once..."
                      className="w-full text-xs text-zinc-900 bg-transparent outline-none resize-none placeholder:text-zinc-400 font-medium leading-relaxed"
                    />

                    {/* Editor Formatting Toolbar */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F1E7EE] text-zinc-500">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-white hover:text-zinc-800"><Bold className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-white hover:text-zinc-800"><Italic className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-white hover:text-zinc-800"><LinkIcon className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-white hover:text-zinc-800"><Smile className="w-3.5 h-3.5 text-[#E85AAD]" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-white hover:text-zinc-800"><Hash className="w-3.5 h-3.5 text-purple-600" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-white hover:text-zinc-800"><AtSign className="w-3.5 h-3.5" /></button>
                      </div>

                      {/* AI Hashtag suggestions chips */}
                      <div className="hidden sm:flex items-center gap-1.5 text-[10px]">
                        <span className="font-bold text-zinc-400">Add:</span>
                        {['#SocialMedia', '#Marketing', '#SaaS', '#Growth'].map(tag => (
                          <button
                            key={tag}
                            onClick={() => insertHashtag(tag)}
                            className="px-2 py-0.5 rounded-full bg-pink-100 text-[#C93D91] font-bold hover:bg-pink-200 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media Attachment Drag & Drop Zone */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-zinc-900">Media Attachments</label>
                    <button
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="text-xs font-bold text-[#C93D91] hover:underline flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Choose from Media Library</span>
                    </button>
                  </div>

                  {/* Upload zone */}
                  {globalMedia.length === 0 ? (
                    <div 
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="border-2 border-dashed border-[#F1E7EE] hover:border-[#E85AAD] rounded-2xl p-6 text-center bg-[#FFF7FB]/40 cursor-pointer transition-colors space-y-2"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#E85AAD] mx-auto flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold text-zinc-900">Drag media here or click to upload</div>
                      <div className="text-[10px] text-zinc-400">JPG, PNG, MP4, MOV up to 500MB</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {globalMedia.map((url, i) => (
                        <div key={i} className="relative group rounded-2xl overflow-hidden border border-pinkborder aspect-video bg-zinc-100">
                          <img src={url} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                          <button
                            onClick={() => setGlobalMedia(prev => prev.filter((_, idx) => idx !== i))}
                            className="absolute top-2 right-2 p-1 rounded-full bg-zinc-900/70 text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setIsMediaPickerOpen(true)}
                        className="rounded-2xl border-2 border-dashed border-[#F1E7EE] hover:border-[#E85AAD] flex flex-col items-center justify-center text-xs font-bold text-zinc-400 hover:text-[#C93D91] aspect-video bg-[#FFF7FB]/40 transition-colors"
                      >
                        <Upload className="w-5 h-5 mb-1" />
                        <span>Add More</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* PLATFORM CUSTOM OVERRIDE EDITOR */
              <div className="space-y-4 animate-fade-in">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pinkborder text-xs text-zinc-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {platformMeta[activeTab]?.icon}
                    <span className="font-bold text-zinc-900">{platformMeta[activeTab]?.name} Custom Override</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">Overrides global caption for this channel</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-zinc-900">Custom Caption for {platformMeta[activeTab]?.name}</label>
                  <textarea
                    rows={4}
                    value={variants[activeTab]?.caption || ''}
                    onChange={(e) => updateVariantCaption(activeTab, e.target.value)}
                    placeholder={`Write custom caption specific for ${platformMeta[activeTab]?.name} (Leave empty to use Global Caption)...`}
                    className="w-full p-3 text-xs text-zinc-900 bg-[#FFF7FB]/20 border border-[#F1E7EE] rounded-2xl outline-none focus:border-[#E85AAD] font-medium leading-relaxed"
                  />
                </div>

                {/* Specific option overrides */}
                {activeTab === 'instagram' && (
                  <div className="p-3 bg-white border border-pinkborder rounded-2xl space-y-2 text-xs">
                    <span className="font-bold text-zinc-800">Instagram Post Type</span>
                    <div className="flex gap-2">
                      {['feed', 'reel', 'carousel', 'story'].map(type => (
                        <button
                          key={type}
                          onClick={() => setVariants(prev => ({
                            ...prev,
                            instagram: { ...prev.instagram, customOptions: { postType: type as any } }
                          }))}
                          className={`px-3 py-1.5 rounded-xl capitalize font-bold text-xs border ${
                            variants.instagram?.customOptions?.postType === type 
                              ? 'bg-[#E85AAD] text-white border-[#E85AAD]' 
                              : 'bg-zinc-50 text-zinc-600 border-zinc-200'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'youtube' && (
                  <div className="space-y-3 p-3 bg-white border border-pinkborder rounded-2xl text-xs">
                    <span className="font-bold text-zinc-800">YouTube Video Settings</span>
                    <input
                      type="text"
                      placeholder="Video Title"
                      value={variants.youtube?.customOptions?.title || ''}
                      onChange={(e) => setVariants(prev => ({
                        ...prev,
                        youtube: { ...prev.youtube, customOptions: { ...prev.youtube?.customOptions, title: e.target.value } }
                      }))}
                      className="w-full p-2.5 rounded-xl border border-pinkborder text-xs outline-none focus:border-[#E85AAD]"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Real-Time Platform Preview Engine */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-[#F1E7EE] p-5 shadow-pink-sm sticky top-20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xs text-zinc-900 uppercase tracking-wider">Live Platform Preview</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Desktop vs Mobile Preview Toggle */}
              <div className="flex items-center gap-1 bg-[#FFF7FB] p-1 rounded-xl border border-pinkborder">
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg ${previewDevice === 'mobile' ? 'bg-white shadow-xs text-[#C93D91]' : 'text-zinc-400'}`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg ${previewDevice === 'desktop' ? 'bg-white shadow-xs text-[#C93D91]' : 'text-zinc-400'}`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Platform Preview Selector Bar */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {selectedPlatforms.map(p => {
                const isSelected = previewPlatform === p;
                const meta = platformMeta[p];
                return (
                  <button
                    key={p}
                    onClick={() => setPreviewPlatform(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      isSelected 
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' 
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {meta?.icon}
                    <span>{meta?.name}</span>
                  </button>
                );
              })}
            </div>

            {/* PREVIEW FRAME CONTAINER */}
            <div className={`mx-auto transition-all ${
              previewDevice === 'mobile' ? 'max-w-[320px] rounded-[36px] p-3 border-4 border-zinc-800 bg-zinc-900 shadow-pink-lg' : 'w-full rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm'
            }`}>
              <div className="bg-white rounded-[24px] overflow-hidden text-zinc-900 space-y-3 p-3">
                {/* Instagram Preview */}
                {previewPlatform === 'instagram' && (
                  <div className="space-y-3 font-sans text-xs">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80" alt="Avatar" className="w-7 h-7 rounded-full object-cover border border-pink-300" />
                        <span className="font-bold text-xs text-zinc-900">acmebrand</span>
                      </div>
                      <span className="text-zinc-400 text-[10px]">•••</span>
                    </div>

                    <div className="aspect-square bg-zinc-100 rounded-xl overflow-hidden border border-zinc-100">
                      {globalMedia[0] ? (
                        <img src={globalMedia[0]} alt="IG Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">No media attached</div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-zinc-800 px-1">
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-zinc-700" />
                        <MessageCircle className="w-4 h-4 text-zinc-700" />
                        <Send className="w-4 h-4 text-zinc-700" />
                      </div>
                      <BookmarkIcon className="w-4 h-4 text-zinc-700" />
                    </div>

                    <div className="px-1 space-y-1">
                      <div className="font-extrabold text-[11px]">4,820 likes</div>
                      <p className="text-xs text-zinc-800 leading-snug line-clamp-3">
                        <span className="font-bold mr-1.5">acmebrand</span>
                        {getEffectiveCaption('instagram')}
                      </p>
                    </div>
                  </div>
                )}

                {/* LinkedIn Preview */}
                {previewPlatform === 'linkedin' && (
                  <div className="space-y-3 font-sans text-xs">
                    <div className="flex items-start gap-2.5">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Company" className="w-8 h-8 rounded-md object-cover" />
                      <div>
                        <div className="font-bold text-xs text-zinc-900">Acme Inc. Company Page</div>
                        <div className="text-[10px] text-zinc-400">19,400 followers • Now • 🌐</div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-800 leading-relaxed line-clamp-4">
                      {getEffectiveCaption('linkedin')}
                    </p>

                    {globalMedia[0] && (
                      <div className="rounded-xl overflow-hidden border border-zinc-200 aspect-video">
                        <img src={globalMedia[0]} alt="LI Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-zinc-500 text-[11px] font-semibold">
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5 text-blue-600" /> Like</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> Comment</span>
                      <span className="flex items-center gap-1"><Repeat className="w-3.5 h-3.5" /> Repost</span>
                      <span className="flex items-center gap-1"><Send className="w-3.5 h-3.5" /> Send</span>
                    </div>
                  </div>
                )}

                {/* X (Twitter) Preview */}
                {previewPlatform === 'twitter' && (
                  <div className="space-y-2.5 font-sans text-xs">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" alt="X Avatar" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-xs text-zinc-900">Acme HQ</div>
                        <div className="text-[10px] text-zinc-400">@acme_hq</div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-900 leading-relaxed">
                      {getEffectiveCaption('twitter')}
                    </p>

                    {globalMedia[0] && (
                      <div className="rounded-2xl overflow-hidden border border-zinc-200 aspect-video">
                        <img src={globalMedia[0]} alt="X Media" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-zinc-400 pt-2 text-[11px]">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <Repeat className="w-3.5 h-3.5" />
                      <Heart className="w-3.5 h-3.5" />
                      <Share2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                {/* TikTok Preview */}
                {previewPlatform === 'tiktok' && (
                  <div className="relative aspect-[9/16] max-h-[380px] bg-black rounded-2xl overflow-hidden text-white p-3 flex flex-col justify-between">
                    {globalMedia[0] ? (
                      <img src={globalMedia[0]} alt="TikTok Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-400">TikTok Video Preview</div>
                    )}
                    <div className="relative z-10 flex justify-end">
                      <div className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-bold">@acme_tok</div>
                    </div>
                    <div className="relative z-10 space-y-1">
                      <div className="font-bold text-xs">@acme_tok</div>
                      <p className="text-[11px] text-zinc-200 line-clamp-2">{getEffectiveCaption('tiktok')}</p>
                    </div>
                  </div>
                )}

                {/* YouTube Preview */}
                {previewPlatform === 'youtube' && (
                  <div className="space-y-2 text-xs">
                    <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden relative flex items-center justify-center">
                      {globalMedia[0] ? (
                        <img src={globalMedia[0]} alt="YT" className="w-full h-full object-cover opacity-90" />
                      ) : (
                        <Play className="w-8 h-8 text-red-600" />
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] text-white font-mono">10:24</div>
                    </div>
                    <h4 className="font-extrabold text-xs text-zinc-900">{variants.youtube?.customOptions?.title || 'Socially Overview'}</h4>
                    <p className="text-[11px] text-zinc-500 line-clamp-2">{getEffectiveCaption('youtube')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PUBLISHING PROGRESS MODAL SIMULATION (Section 26) */}
      {isPublishingProgress && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-[#F1E7EE] rounded-3xl w-full max-w-md p-6 shadow-pink-lg space-y-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#E85AAD] mx-auto flex items-center justify-center">
              <Send className="w-6 h-6 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-zinc-900">Publishing Everywhere...</h3>
              <p className="text-xs text-zinc-500">Distributing content across selected social networks</p>
            </div>

            <div className="space-y-3 text-left">
              {selectedPlatforms.map(p => {
                const meta = platformMeta[p];
                const info = publishingProgressMap[p];
                const isDone = info?.status === 'done';
                return (
                  <div key={p} className="p-3 rounded-2xl border border-pinkborder bg-[#FFF7FB]/40 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2">
                        {meta?.icon}
                        <span>{meta?.name}</span>
                      </div>
                      <span className={isDone ? 'text-emerald-600 font-extrabold' : 'text-zinc-400'}>
                        {isDone ? '100% ✓' : 'Uploading...'}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#E85AAD] to-[#8B5CF6] transition-all duration-500" 
                        style={{ width: `${info?.percent || 0}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULING MODAL (Section 11) */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-pinkborder rounded-3xl w-full max-w-md p-6 shadow-pink-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-pinkborder">
              <h3 className="font-extrabold text-base text-zinc-900">Schedule Multi-Channel Post</h3>
              <button onClick={() => setIsScheduleModalOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-zinc-700">Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-pinkborder outline-none focus:border-[#E85AAD] font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700">Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full p-3 rounded-xl border border-pinkborder outline-none focus:border-[#E85AAD] font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700">Timezone</label>
                <select
                  value={scheduleTimezone}
                  onChange={(e) => setScheduleTimezone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-pinkborder outline-none focus:border-[#E85AAD] font-semibold"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                  <option value="America/New_York">America/New_York (EST -5:00)</option>
                  <option value="Europe/London">Europe/London (GMT +0:00)</option>
                </select>
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 text-purple-900 text-[11px] font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>AI Recommendation: 10:30 AM has +24% higher engagement on LinkedIn & Instagram!</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-pinkborder text-xs font-bold text-zinc-600 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleConfirm}
                className="gradient-btn px-5 py-2.5 rounded-xl text-white font-extrabold text-xs shadow-pink-md"
              >
                Confirm & Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEDIA PICKER MODAL */}
      {isMediaPickerOpen && (
        <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-pinkborder rounded-3xl w-full max-w-2xl p-6 shadow-pink-lg space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-pinkborder">
              <h3 className="font-extrabold text-base text-zinc-900">Select Media from Library</h3>
              <button onClick={() => setIsMediaPickerOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-3 p-1">
              {mediaAssets.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => {
                    setGlobalMedia(prev => [...prev, asset.url]);
                    setIsMediaPickerOpen(false);
                  }}
                  className="group relative rounded-2xl overflow-hidden border border-pinkborder aspect-video cursor-pointer hover:border-[#E85AAD] transition-all"
                >
                  <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                    + Insert Media
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Icon
function BookmarkIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}
