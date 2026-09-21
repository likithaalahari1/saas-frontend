import React, { useState, useEffect } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { 
  Search, 
  PenTool, 
  Calendar, 
  Share2, 
  BarChart3, 
  MessageSquare, 
  FolderKanban, 
  Users, 
  FileText, 
  CheckCircle2, 
  X
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, setActiveView, posts, accounts } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickNavs: { label: string; view: AppView; icon: React.ReactNode }[] = [
    { label: 'Create New Multi-Platform Post', view: 'create', icon: <PenTool className="w-4 h-4 text-[#E85AAD]" /> },
    { label: 'View Content Calendar', view: 'calendar', icon: <Calendar className="w-4 h-4 text-purple-600" /> },
    { label: 'Manage Connected Accounts', view: 'social-accounts', icon: <Share2 className="w-4 h-4 text-blue-600" /> },
    { label: 'Analytics Dashboard', view: 'analytics', icon: <BarChart3 className="w-4 h-4 text-emerald-600" /> },
    { label: 'Unified Inbox Messages', view: 'inbox', icon: <MessageSquare className="w-4 h-4 text-[#E85AAD]" /> },
    { label: 'Media Library Assets', view: 'media-library', icon: <FolderKanban className="w-4 h-4 text-amber-600" /> },
    { label: 'Review Drafts', view: 'drafts', icon: <FileText className="w-4 h-4 text-zinc-600" /> },
    { label: 'Published History', view: 'published', icon: <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> },
    { label: 'Team Approval Pipeline', view: 'team-approvals', icon: <Users className="w-4 h-4 text-indigo-600" /> }
  ];

  const filteredNavs = quickNavs.filter(n => n.label.toLowerCase().includes(query.toLowerCase()));
  const filteredPosts = posts.filter(p => p.globalCaption.toLowerCase().includes(query.toLowerCase()));

  const handleSelectNav = (view: AppView) => {
    setActiveView(view);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div 
        className="bg-white border border-[#F1E7EE] rounded-2xl w-full max-w-xl shadow-pink-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-3 border-b border-[#F1E7EE] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#E85AAD]" />
          <input
            type="text"
            placeholder="Type a command or search posts, accounts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-sm bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400 font-medium"
          />
          <button 
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-zinc-400 hover:bg-[#FFF7FB] hover:text-zinc-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3">
          {/* Quick Actions / Navigation */}
          <div>
            <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Navigation & Quick Actions
            </div>
            <div className="space-y-0.5">
              {filteredNavs.map((nav, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectNav(nav.view)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#FFF7FB] text-left text-xs font-semibold text-zinc-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-pink-50 border border-pinkborder">
                      {nav.icon}
                    </span>
                    <span>{nav.label}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono group-hover:text-[#C93D91]">Jump ↵</span>
                </button>
              ))}
            </div>
          </div>

          {/* Posts match */}
          {query.trim() !== '' && filteredPosts.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Matching Posts
              </div>
              {filteredPosts.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelectNav('published')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[#FFF7FB] border border-transparent hover:border-pinkborder transition-all text-xs"
                >
                  <div className="font-semibold text-zinc-900 truncate mb-1">{p.globalCaption}</div>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                    <span className="capitalize px-1.5 py-0.5 rounded bg-pink-100 text-[#C93D91] font-bold">{p.status}</span>
                    <span>Created: {new Date(p.createdAt).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Accounts */}
          {query.trim() !== '' && (
            <div>
              <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Social Channels
              </div>
              {accounts.filter(a => a.name.toLowerCase().includes(query.toLowerCase())).map(a => (
                <div key={a.id} className="flex items-center justify-between p-2 text-xs font-semibold text-zinc-800">
                  <span>{a.name} ({a.username})</span>
                  <span className="text-[#C93D91] font-bold text-[10px]">{a.connected ? 'Connected' : 'Not Connected'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Command Footer */}
        <div className="p-2.5 bg-[#FFF7FB] border-t border-[#F1E7EE] flex items-center justify-between text-[11px] text-zinc-400 font-medium">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-pinkborder text-zinc-600 font-mono">↑↓</kbd> navigate
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-pinkborder text-zinc-600 font-mono">ESC</kbd> close
          </div>
          <span className="text-[#C93D91] font-bold">Socially Command Palette</span>
        </div>
      </div>
    </div>
  );
};
