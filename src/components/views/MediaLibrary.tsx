import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderKanban, Upload, Search, Grid, List, Plus, Trash2, Edit2, Download, Send, Tag } from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const { mediaAssets, addMediaAsset, setActiveView, setEditingPost } = useApp();
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const folders = ['all', 'Campaign Assets', 'Screenshots', 'Team Shoots', 'Guides & Ebooks', 'Diagrams'];

  const filteredAssets = mediaAssets.filter(asset => {
    const matchesFolder = activeFolder === 'all' || asset.folder === activeFolder;
    const matchesQuery = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || asset.tags.some(t => t.includes(searchQuery.toLowerCase()));
    return matchesFolder && matchesQuery;
  });

  const handleSimulatedUpload = () => {
    addMediaAsset({
      name: `asset_${Date.now()}.jpg`,
      url: 'https://images.unsplash.com/photo-1542744094-3a312169945b?auto=format&fit=crop&w=800&q=80',
      type: 'image',
      dimensions: '1920 x 1080',
      sizeBytes: 2100000,
      folder: activeFolder === 'all' ? 'Campaign Assets' : activeFolder,
      tags: ['new', 'uploaded']
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1E7EE] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1">
            <FolderKanban className="w-3.5 h-3.5" />
            Centralized Asset Management
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Media Library</h1>
          <p className="text-xs text-zinc-500 font-medium">Manage high-resolution images, videos, GIFs, and brand assets.</p>
        </div>

        <button
          onClick={handleSimulatedUpload}
          className="gradient-btn px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-pink-md"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Asset</span>
        </button>
      </div>

      {/* Folders & Filters Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-pinkborder shadow-pink-sm">
        {/* Folder navigation chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {folders.map(f => (
            <button
              key={f}
              onClick={() => setActiveFolder(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                activeFolder === f ? 'bg-[#E85AAD] text-white shadow-pink-sm' : 'text-zinc-600 hover:bg-[#FFF7FB]'
              }`}
            >
              {f === 'all' ? 'All Assets' : f}
            </button>
          ))}
        </div>

        {/* View toggle & Search */}
        <div className="flex items-center gap-3">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by tag or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-pinkborder text-xs outline-none focus:border-[#E85AAD]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#FFF7FB] p-1 rounded-xl border border-pinkborder">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white text-[#C93D91] shadow-xs' : 'text-zinc-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white text-[#C93D91] shadow-xs' : 'text-zinc-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Asset Grid Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssets.map(asset => (
            <div key={asset.id} className="bg-white rounded-3xl border border-[#F1E7EE] p-4 shadow-pink-sm hover:shadow-pink-md transition-all space-y-3 group">
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-pinkborder bg-zinc-100">
                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold uppercase">
                  {asset.type}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-zinc-900 truncate">{asset.name}</h4>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                  <span>{asset.dimensions}</span>
                  <span>{(asset.sizeBytes / 1000000).toFixed(1)} MB</span>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-wrap">
                {asset.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-pink-50 text-[#C93D91] text-[10px] font-bold">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-[#F1E7EE] flex items-center justify-between">
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setActiveView('create');
                  }}
                  className="gradient-btn px-3 py-1.5 rounded-xl text-white font-extrabold text-xs flex items-center gap-1 shadow-pink-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Use in Post</span>
                </button>

                <div className="flex items-center gap-1 text-zinc-400">
                  <button className="p-1.5 hover:text-zinc-700"><Download className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#F1E7EE] p-4 shadow-pink-sm text-xs">
          List View Active — Showing {filteredAssets.length} assets with metadata.
        </div>
      )}
    </div>
  );
};
