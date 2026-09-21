import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  Plus, 
  Menu, 
  Sparkles,
  Command
} from 'lucide-react';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const { 
    setActiveView, 
    notifications, 
    setIsNotificationsDrawerOpen, 
    setIsCommandPaletteOpen 
  } = useApp();

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-[#FFFDFE]/90 backdrop-blur-md border-b border-[#F1E7EE] px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Menu & Breadcrumb Search trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-xl border border-pinkborder text-zinc-600 hover:bg-[#FFF7FB]"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Command Bar Trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-[#F1E7EE] bg-[#FFF7FB]/60 hover:bg-[#FFF7FB] text-zinc-400 text-xs transition-all shadow-pink-sm group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-400 group-hover:text-[#E85AAD] transition-colors" />
            <span className="text-zinc-500 font-medium">Search posts, channels, media, or actions...</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-white border border-pinkborder px-2 py-0.5 rounded-lg text-[10px] font-bold text-zinc-400">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Action Icons & Create Post CTA */}
      <div className="flex items-center gap-3">
        {/* Quick Upgrade status chip */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 border border-pinkborder text-xs font-semibold text-[#C93D91]">
          <Sparkles className="w-3.5 h-3.5 text-[#E85AAD]" />
          <span>All 7 Networks Synced</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationsDrawerOpen(true)}
          className="relative p-2.5 rounded-xl border border-[#F1E7EE] bg-[#FFFDFE] hover:bg-[#FFF7FB] text-zinc-600 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-zinc-700" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E85AAD] border-2 border-white rounded-full animate-ping" />
          )}
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E85AAD] border-2 border-white rounded-full" />
          )}
        </button>

        {/* Primary CTA: Create Post */}
        <button
          onClick={() => setActiveView('create')}
          className="gradient-btn px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-pink-md group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          <span>Create Post</span>
        </button>
      </div>
    </header>
  );
};
