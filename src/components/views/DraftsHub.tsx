import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformBadge } from '../common/BrandLogo';
import { PlatformId } from '../../types';
import { FileText, Plus, Search, Edit3, Copy, Trash2, Send } from 'lucide-react';

export const DraftsHub: React.FC = () => {
  const { posts, setActiveView, setEditingPost, duplicatePost, deletePost, simulatePublishing } = useApp();
  const [filterPlatform, setFilterPlatform] = useState<PlatformId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const drafts = posts.filter(p => p.status === 'draft');

  const filteredDrafts = drafts.filter(d => {
    const matchesPlatform = filterPlatform === 'all' || d.platforms.includes(filterPlatform);
    const matchesQuery = d.globalCaption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1E7EE] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1">
            <FileText className="w-3.5 h-3.5" />
            Unpublished Drafts Studio
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Drafts</h1>
          <p className="text-xs text-zinc-500 font-medium">Work-in-progress content stored securely before scheduling.</p>
        </div>

        <button
          onClick={() => {
            setEditingPost(null);
            setActiveView('create');
          }}
          className="gradient-btn px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-pink-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Draft</span>
        </button>
      </div>

      {/* Filter & Search Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-pinkborder shadow-pink-sm">
        {/* Platform filter tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {(['all', 'instagram', 'facebook', 'linkedin', 'twitter', 'tiktok', 'youtube'] as const).map(p => (
            <button
              key={p}
              onClick={() => setFilterPlatform(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                filterPlatform === p 
                  ? 'bg-[#E85AAD] text-white shadow-pink-sm' 
                  : 'text-zinc-600 hover:bg-[#FFF7FB]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search drafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-pinkborder text-xs outline-none focus:border-[#E85AAD] font-medium"
          />
        </div>
      </div>

      {/* Draft Cards Grid */}
      {filteredDrafts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-pinkborder p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-zinc-900">No Drafts Found</h3>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto">Start creating content and save your progress anytime as a draft.</p>
          <button
            onClick={() => setActiveView('create')}
            className="gradient-btn px-4 py-2 rounded-xl text-white font-bold text-xs shadow-pink-md"
          >
            Create New Draft
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrafts.map(draft => (
            <div key={draft.id} className="bg-white rounded-3xl border border-[#F1E7EE] p-5 shadow-pink-sm hover:shadow-pink-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                {draft.globalMediaUrls[0] && (
                  <div className="rounded-2xl overflow-hidden aspect-video border border-pinkborder">
                    <img src={draft.globalMediaUrls[0]} alt="Draft" className="w-full h-full object-cover" />
                  </div>
                )}

                <p className="text-xs font-bold text-zinc-900 line-clamp-3 leading-relaxed">
                  {draft.globalCaption}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {draft.platforms.map(p => (
                    <PlatformBadge key={p} platform={p} size="sm" />
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1E7EE] flex items-center justify-between text-xs">
                <span className="text-[10px] text-zinc-400 font-semibold">
                  Last edited {new Date(draft.updatedAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => duplicatePost(draft.id)}
                    className="p-1.5 rounded-lg border border-pinkborder text-zinc-500 hover:bg-pink-50 hover:text-[#C93D91]"
                    title="Duplicate"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deletePost(draft.id)}
                    className="p-1.5 rounded-lg border border-pinkborder text-zinc-500 hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setEditingPost(draft);
                      setActiveView('create');
                    }}
                    className="gradient-btn px-3 py-1.5 rounded-xl text-white font-bold text-xs flex items-center gap-1 shadow-pink-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
