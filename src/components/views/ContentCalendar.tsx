import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformBadge } from '../common/BrandLogo';
import { Post } from '../../types';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Trash2, 
  Copy, 
  Edit3, 
  X,
  Sparkles
} from 'lucide-react';

export const ContentCalendar: React.FC = () => {
  const { posts, setActiveView, setEditingPost, deletePost, duplicatePost } = useApp();
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Sample calendar days mapping for September 2026
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  // Group posts by day number
  const postsByDay: Record<number, Post[]> = {};
  posts.forEach(p => {
    if (p.scheduledAt) {
      const date = new Date(p.scheduledAt);
      const day = date.getDate();
      if (!postsByDay[day]) postsByDay[day] = [];
      postsByDay[day].push(p);
    } else {
      // Default sample placement for demo richness
      const defaultDay = 28;
      if (!postsByDay[defaultDay]) postsByDay[defaultDay] = [];
      if (!postsByDay[defaultDay].some(x => x.id === p.id)) {
        postsByDay[defaultDay].push(p);
      }
    }
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1E7EE] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            Visual Content Planner
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Content Calendar</h1>
          <p className="text-xs text-zinc-500 font-medium">Manage and schedule content across all platforms visually.</p>
        </div>

        {/* View Switcher & Month Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#FFF7FB] p-1 rounded-2xl border border-pinkborder">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'month' ? 'bg-[#E85AAD] text-white shadow-pink-sm' : 'text-zinc-600 hover:bg-white'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'week' ? 'bg-[#E85AAD] text-white shadow-pink-sm' : 'text-zinc-600 hover:bg-white'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'day' ? 'bg-[#E85AAD] text-white shadow-pink-sm' : 'text-zinc-600 hover:bg-white'
              }`}
            >
              Day
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl border border-pinkborder bg-white text-zinc-600 hover:bg-[#FFF7FB]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-extrabold text-zinc-900 px-3">September 2026</span>
            <button className="p-2 rounded-xl border border-pinkborder bg-white text-zinc-600 hover:bg-[#FFF7FB]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setActiveView('create')}
            className="gradient-btn px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-pink-md"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* CALENDAR GRID */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-3xl border border-[#F1E7EE] shadow-pink-sm overflow-hidden">
          {/* Days of Week Row */}
          <div className="grid grid-cols-7 border-b border-[#F1E7EE] bg-[#FFF7FB]">
            {daysOfWeek.map(day => (
              <div key={day} className="p-3 text-center text-xs font-extrabold text-zinc-400 tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Month Days Cells */}
          <div className="grid grid-cols-7 border-b border-[#F1E7EE]">
            {calendarDays.map(day => {
              const dayPosts = postsByDay[day] || [];
              const isToday = day === 21;
              return (
                <div 
                  key={day} 
                  className={`min-h-[120px] p-2 border-r border-b border-[#F1E7EE] flex flex-col justify-between transition-colors hover:bg-[#FFF7FB]/60 ${
                    isToday ? 'bg-pink-50/40' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday ? 'bg-[#E85AAD] text-white shadow-pink-sm' : 'text-zinc-700'
                    }`}>
                      {day}
                    </span>
                    {dayPosts.length > 0 && (
                      <span className="text-[10px] font-extrabold text-[#C93D91] bg-pink-100 px-1.5 py-0.2 rounded-full">
                        {dayPosts.length}
                      </span>
                    )}
                  </div>

                  {/* Day Posts List Cards */}
                  <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[100px]">
                    {dayPosts.map(post => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="p-1.5 rounded-xl border border-pinkborder bg-white hover:border-[#E85AAD] cursor-pointer shadow-xs transition-all space-y-1 group"
                      >
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-semibold">
                          <span className="flex items-center gap-1 text-purple-700 font-bold">
                            <Clock className="w-3 h-3 text-purple-500" />
                            10:30 AM
                          </span>
                          <span className="capitalize text-[9px] px-1 rounded bg-pink-100 text-[#C93D91] font-bold">
                            {post.status}
                          </span>
                        </div>

                        <p className="text-[11px] font-semibold text-zinc-900 truncate line-clamp-1 group-hover:text-[#C93D91]">
                          {post.globalCaption}
                        </p>

                        <div className="flex items-center gap-1 flex-wrap pt-0.5">
                          {post.platforms.map(p => (
                            <PlatformBadge key={p} platform={p} showName={false} size="sm" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'week' && (
        <div className="bg-white rounded-3xl border border-pinkborder p-6 shadow-pink-sm text-center text-xs text-zinc-500">
          Week View Active — Showing 7-Day Content Swimlanes. Click any slot to schedule.
        </div>
      )}

      {viewMode === 'day' && (
        <div className="bg-white rounded-3xl border border-pinkborder p-6 shadow-pink-sm text-center text-xs text-zinc-500">
          Day View Active — Hourly publishing schedule timeline for September 21, 2026.
        </div>
      )}

      {/* POST INSPECTION / EDIT MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-pinkborder rounded-3xl w-full max-w-lg p-6 shadow-pink-lg space-y-4">
            <div className="flex items-center justify-between border-b border-pinkborder pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-pink-100 text-[#C93D91]">
                  {selectedPost.status}
                </span>
                <span className="text-xs font-semibold text-zinc-400">ID: {selectedPost.id}</span>
              </div>
              <button onClick={() => setSelectedPost(null)} className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedPost.globalMediaUrls[0] && (
                <div className="rounded-2xl overflow-hidden aspect-video border border-pinkborder">
                  <img src={selectedPost.globalMediaUrls[0]} alt="Media" className="w-full h-full object-cover" />
                </div>
              )}

              <p className="text-xs text-zinc-800 font-medium leading-relaxed bg-[#FFF7FB] p-3 rounded-2xl border border-pinkborder">
                {selectedPost.globalCaption}
              </p>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1 block">Scheduled Platforms</label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedPost.platforms.map(p => (
                    <PlatformBadge key={p} platform={p} size="md" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-pinkborder">
              <button
                onClick={() => {
                  deletePost(selectedPost.id);
                  setSelectedPost(null);
                }}
                className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    duplicatePost(selectedPost.id);
                    setSelectedPost(null);
                  }}
                  className="px-3.5 py-2 rounded-xl border border-pinkborder text-xs font-bold text-zinc-700 hover:bg-[#FFF7FB] flex items-center gap-1"
                >
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Duplicate</span>
                </button>

                <button
                  onClick={() => {
                    setEditingPost(selectedPost);
                    setSelectedPost(null);
                    setActiveView('create');
                  }}
                  className="gradient-btn px-4 py-2 rounded-xl text-white font-extrabold text-xs flex items-center gap-1 shadow-pink-md"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit in Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
