import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformBadge } from '../common/BrandLogo';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Share2, 
  PenTool, 
  ArrowUpRight, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { posts, accounts, setActiveView, setEditingPost, reauthorizePlatform } = useApp();

  const totalPostsThisMonth = 42;
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
  const publishedCount = posts.filter(p => p.status === 'published' || p.status === 'partially_published').length;
  const draftsCount = posts.filter(p => p.status === 'draft').length;
  const connectedAccountsCount = accounts.filter(a => a.connected).length;

  const scheduledPosts = posts.filter(p => p.status === 'scheduled');
  const recentPublished = posts.filter(p => p.status === 'published' || p.status === 'partially_published');
  const warningAccount = accounts.find(a => a.health === 'warning');

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#FFF7FB] via-white to-[#FCE7F3]/40 p-6 rounded-3xl border border-[#F1E7EE] shadow-pink-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE7F3] text-[#C93D91] text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E85AAD] animate-ping" />
            Socially Studio Overview
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Good morning, Likitha 👋
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1">
            Here’s what’s happening across your connected social channels today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('analytics')}
            className="px-4 py-2.5 rounded-xl border border-pinkborder bg-white text-zinc-700 font-bold text-xs hover:bg-[#FFF7FB] transition-colors"
          >
            View Full Report
          </button>
          <button
            onClick={() => {
              setEditingPost(null);
              setActiveView('create');
            }}
            className="gradient-btn px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-pink-md"
          >
            <PenTool className="w-4 h-4" />
            <span>Create New Post</span>
          </button>
        </div>
      </div>

      {/* Account Warning Banner if any */}
      {warningAccount && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold text-amber-900">{warningAccount.name} ({warningAccount.username}) Needs Attention</span>
              <p className="text-amber-700 text-[11px]">{warningAccount.warningMessage}</p>
            </div>
          </div>
          <button
            onClick={() => reauthorizePlatform(warningAccount.id)}
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 transition-colors"
          >
            Reauthorize Channel
          </button>
        </div>
      )}

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Posts */}
        <div className="p-5 rounded-2xl bg-white border border-[#F1E7EE] shadow-pink-sm hover:shadow-pink-md transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Posts</span>
            <div className="p-2 rounded-xl bg-pink-50 text-[#C93D91]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-zinc-900">{totalPostsThisMonth}</div>
          <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% this month</span>
          </div>
        </div>

        {/* Scheduled */}
        <div className="p-5 rounded-2xl bg-white border border-[#F1E7EE] shadow-pink-sm hover:shadow-pink-md transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Scheduled</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-zinc-900">{scheduledCount + 12}</div>
          <div className="text-[11px] text-zinc-400 font-medium mt-1">Ready in calendar queue</div>
        </div>

        {/* Published */}
        <div className="p-5 rounded-2xl bg-white border border-[#F1E7EE] shadow-pink-sm hover:shadow-pink-md transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Published</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-zinc-900">{publishedCount + 24}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">99.8% Sync Success</div>
        </div>

        {/* Drafts */}
        <div className="p-5 rounded-2xl bg-white border border-[#F1E7EE] shadow-pink-sm hover:shadow-pink-md transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Drafts</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-zinc-900">{draftsCount + 6}</div>
          <div className="text-[11px] text-zinc-400 font-medium mt-1">In progress studio</div>
        </div>

        {/* Connected Accounts */}
        <div className="p-5 rounded-2xl bg-white border border-[#F1E7EE] shadow-pink-sm hover:shadow-pink-md transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Connected</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-zinc-900">{connectedAccountsCount} / 7</div>
          <div className="text-[11px] text-[#C93D91] font-semibold mt-1">IG, FB, LI, X, TT, YT</div>
        </div>
      </div>

      {/* Main Grid: Scheduled Queue & Channels Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Upcoming Scheduled & Recent Published */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Scheduled Queue Card */}
          <div className="bg-white rounded-3xl border border-[#F1E7EE] p-6 shadow-pink-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-base text-zinc-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#E85AAD]" />
                  Upcoming Scheduled Queue
                </h3>
                <p className="text-xs text-zinc-500 font-medium">Posts queued to auto-publish across multiple platforms</p>
              </div>

              <button
                onClick={() => setActiveView('calendar')}
                className="text-xs font-bold text-[#C93D91] hover:underline flex items-center gap-1"
              >
                <span>Full Calendar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {scheduledPosts.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-400">No upcoming scheduled posts.</div>
              ) : (
                scheduledPosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-2xl border border-pinkborder bg-[#FFF7FB]/40 hover:bg-[#FFF7FB] transition-colors flex items-start gap-4">
                    {post.globalMediaUrls[0] && (
                      <img 
                        src={post.globalMediaUrls[0]} 
                        alt="Post media" 
                        className="w-16 h-16 rounded-xl object-cover border border-pinkborder shrink-0" 
                      />
                    )}

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <p className="text-xs font-semibold text-zinc-900 line-clamp-2 leading-snug">
                        {post.globalCaption}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap pt-0.5">
                        {post.platforms.map(p => (
                          <PlatformBadge key={p} platform={p} size="sm" showName={false} />
                        ))}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                        {post.scheduledAt ? new Date(post.scheduledAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Scheduled'}
                      </div>
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setActiveView('create');
                        }}
                        className="mt-2 text-[11px] font-bold text-[#C93D91] hover:underline"
                      >
                        Edit in Studio
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Published Activity */}
          <div className="bg-white rounded-3xl border border-[#F1E7EE] p-6 shadow-pink-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base text-zinc-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Recent Published Activity
              </h3>

              <button
                onClick={() => setActiveView('published')}
                className="text-xs font-bold text-[#C93D91] hover:underline flex items-center gap-1"
              >
                <span>View All History</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {recentPublished.map(post => (
                <div key={post.id} className="p-4 rounded-2xl border border-pinkborder hover:border-[#E85AAD]/40 transition-colors space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-medium text-zinc-800 line-clamp-2">
                      {post.globalCaption}
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                      Published
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      {post.platforms.map(p => (
                        <PlatformBadge key={p} platform={p} size="sm" showName={true} />
                      ))}
                    </div>

                    {post.analytics && (
                      <div className="flex items-center gap-3 font-semibold text-zinc-700">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-zinc-400" />
                          {post.analytics.impressions.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-pink-500" />
                          {post.analytics.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                          {post.analytics.comments.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Connected Social Channels Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#F1E7EE] p-6 shadow-pink-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-zinc-900">Connected Accounts</h3>
                <p className="text-xs text-zinc-500 font-medium">Real-time OAuth Sync</p>
              </div>

              <button
                onClick={() => setActiveView('social-accounts')}
                className="text-xs font-bold text-[#C93D91] hover:underline"
              >
                Manage All
              </button>
            </div>

            <div className="space-y-3">
              {accounts.slice(0, 5).map(acc => (
                <div key={acc.id} className="p-3.5 rounded-2xl border border-pinkborder bg-[#FFF7FB]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={acc.avatar} alt={acc.name} className="w-9 h-9 rounded-xl object-cover border border-pinkborder" />
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-zinc-900 truncate">{acc.name}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{acc.username}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {acc.connected ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Synced
                      </span>
                    ) : (
                      <button
                        onClick={() => reauthorizePlatform(acc.id)}
                        className="text-[10px] font-bold text-[#C93D91] hover:underline"
                      >
                        Connect
                      </button>
                    )}
                    <div className="text-[9px] text-zinc-400 mt-0.5">{acc.postsPublishedCount} posts</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveView('social-accounts')}
              className="w-full py-2.5 rounded-2xl border border-dashed border-[#E85AAD] text-[#C93D91] font-bold text-xs hover:bg-[#FFF7FB] transition-colors"
            >
              + Connect Another Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
