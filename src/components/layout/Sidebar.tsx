import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { 
  LayoutDashboard, 
  PenTool, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Share2, 
  BarChart3, 
  MessageSquare, 
  FolderKanban, 
  Users, 
  Settings, 
  HelpCircle, 
  ChevronDown, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ setMobileOpen }) => {
  const { 
    activeView, 
    setActiveView, 
    workspaces, 
    activeWorkspace, 
    setActiveWorkspace,
    accounts,
    posts,
    inboxMessages,
    setMode
  } = useApp();

  const [wsDropdownOpen, setWsDropdownOpen] = useState(false);

  const mainNavItems: { id: AppView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'create', label: 'Create Post', icon: <PenTool className="w-4 h-4 text-[#E85AAD]" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" />, badge: posts.filter(p => p.status === 'scheduled').length },
    { id: 'drafts', label: 'Drafts', icon: <FileText className="w-4 h-4" />, badge: posts.filter(p => p.status === 'draft').length },
    { id: 'published', label: 'Published', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'social-accounts', label: 'Social Accounts', icon: <Share2 className="w-4 h-4" />, badge: accounts.filter(a => a.connected).length },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'inbox', label: 'Inbox', icon: <MessageSquare className="w-4 h-4" />, badge: inboxMessages.filter(m => m.unread).length },
    { id: 'media-library', label: 'Media Library', icon: <FolderKanban className="w-4 h-4" /> },
  ];

  const secondaryNavItems: { id: AppView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'team-approvals', label: 'Team & Approvals', icon: <Users className="w-4 h-4" />, badge: posts.filter(p => p.status === 'in_review').length },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: AppView) => {
    setActiveView(view);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <aside className="w-64 h-screen bg-[#FFFDFE] border-r border-[#F1E7EE] flex flex-col justify-between select-none sticky top-0 z-30">
      {/* Top Header & Workspace Switcher */}
      <div className="p-4 space-y-4">
        {/* Logo Header */}
        <div className="flex items-center justify-between px-2 pt-1">
          <BrandLogo size="md" />
        </div>

        {/* Workspace Switcher */}
        <div className="relative">
          <button
            onClick={() => setWsDropdownOpen(!wsDropdownOpen)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#F1E7EE] bg-[#FFF7FB]/60 hover:bg-[#FFF7FB] transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src={activeWorkspace.logo} 
                alt={activeWorkspace.name}
                className="w-6 h-6 rounded-lg object-cover border border-pinkborder" 
              />
              <span className="font-semibold text-sm text-zinc-900 truncate">
                {activeWorkspace.name}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
          </button>

          {wsDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-pinkborder rounded-xl shadow-pink-lg py-1.5 z-50 animate-fade-in">
              <div className="px-3 py-1 text-[11px] font-semibold text-zinc-400 uppercase">
                Workspaces
              </div>
              {workspaces.map(ws => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspace(ws);
                    setWsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-[#FFF7FB] transition-colors ${
                    ws.id === activeWorkspace.id ? 'font-bold text-[#C93D91] bg-[#FCE7F3]/40' : 'text-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={ws.logo} alt={ws.name} className="w-5 h-5 rounded-md object-cover" />
                    <span>{ws.name}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-100 text-[#C93D91] font-medium">
                    {ws.plan}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Navigation List */}
        <div className="space-y-1">
          <div className="px-2 pb-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Menu
          </div>
          {mainNavItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#FCE7F3] to-[#FFF7FB] text-[#C93D91] border border-[#F1E7EE] shadow-sm' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-[#FFF7FB]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`transition-transform group-hover:scale-110 ${isActive ? 'text-[#C93D91]' : 'text-zinc-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-[#E85AAD] text-white' : 'bg-pink-100 text-[#C93D91]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="my-2 border-t border-[#F1E7EE]" />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <div className="px-2 pb-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Organization
          </div>
          {secondaryNavItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-[#FCE7F3] text-[#C93D91] border border-[#F1E7EE]' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-[#FFF7FB]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#C93D91]' : 'text-zinc-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={() => setMode('landing')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-[#FFF7FB] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-zinc-400" />
              <span>Marketing Landing</span>
            </div>
            <span className="text-[10px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded">View</span>
          </button>
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="p-3 m-3 bg-gradient-to-br from-[#FFF7FB] to-[#FCE7F3]/40 border border-[#F1E7EE] rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" 
                alt="Likitha Sri" 
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-zinc-900 truncate">Likitha Sri</div>
              <div className="text-[10px] text-zinc-500 truncate">{activeWorkspace.name}</div>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#E85AAD] text-white rounded-full shadow-pink-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            PRO
          </span>
        </div>

        <div className="pt-2 border-t border-[#F1E7EE] flex items-center justify-between text-[11px] text-zinc-500 font-medium">
          <span>Connected: 6 channels</span>
          <span className="text-[#C93D91] font-bold">100% Active</span>
        </div>
      </div>
    </aside>
  );
};
