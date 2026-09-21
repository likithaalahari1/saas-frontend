import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformBadge } from '../common/BrandLogo';
import { PlatformId } from '../../types';
import { CheckCircle2, AlertOctagon, RotateCw, Eye, Heart, MessageCircle, ExternalLink } from 'lucide-react';

export const PublishedHistory: React.FC = () => {
  const { posts, reauthorizePlatform, simulatePublishing, updatePostStatus } = useApp();
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const historyPosts = posts.filter(p => p.status === 'published' || p.status === 'partially_published' || p.status === 'failed');

  const handleRetryFailedPlatform = (postId: string, platform: PlatformId) => {
    setRetryingId(postId);
    simulatePublishing([platform], () => {
      updatePostStatus(postId, 'published');
      setRetryingId(null);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1E7EE] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Publishing Audit Log
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Published History</h1>
          <p className="text-xs text-zinc-500 font-medium">Complete record of published posts, channel statuses, and engagement metrics.</p>
        </div>
      </div>

      {/* History Log Table */}
      <div className="bg-white rounded-3xl border border-[#F1E7EE] shadow-pink-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFF7FB] border-b border-[#F1E7EE] text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider">
                <th className="p-4">Content</th>
                <th className="p-4">Target Channels & Status</th>
                <th className="p-4">Published Date</th>
                <th className="p-4">Performance Metrics</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1E7EE] text-xs">
              {historyPosts.map(post => {
                const isPartialOrFailed = post.status === 'partially_published' || post.status === 'failed';
                return (
                  <tr key={post.id} className="hover:bg-[#FFF7FB]/50 transition-colors">
                    {/* Content preview */}
                    <td className="p-4 max-w-xs">
                      <div className="flex items-start gap-3">
                        {post.globalMediaUrls[0] && (
                          <img src={post.globalMediaUrls[0]} alt="Media" className="w-12 h-12 rounded-xl object-cover border border-pinkborder shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-zinc-900 line-clamp-2 leading-snug">{post.globalCaption}</p>
                          <span className="text-[10px] text-zinc-400 font-medium">Created by {post.createdBy.name}</span>
                        </div>
                      </div>
                    </td>

                    {/* Channels Breakdown */}
                    <td className="p-4">
                      <div className="space-y-1.5">
                        {post.platforms.map(p => {
                          const variant = post.variants[p];
                          const isFailed = variant?.status === 'failed';
                          return (
                            <div key={p} className="flex items-center gap-2">
                              <PlatformBadge platform={p} size="sm" />
                              {isFailed ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <AlertOctagon className="w-3 h-3" /> Failed
                                  </span>
                                  <button
                                    onClick={() => handleRetryFailedPlatform(post.id, p)}
                                    className="text-[10px] font-bold text-[#C93D91] hover:underline flex items-center gap-0.5"
                                  >
                                    <RotateCw className={`w-3 h-3 ${retryingId === post.id ? 'animate-spin' : ''}`} />
                                    Retry
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  ✓ Published
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    {/* Published Date */}
                    <td className="p-4 text-zinc-600 font-semibold whitespace-nowrap">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                    </td>

                    {/* Performance */}
                    <td className="p-4">
                      {post.analytics ? (
                        <div className="space-y-1 text-[11px] font-semibold text-zinc-700">
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-400">Reach:</span>
                            <span className="font-extrabold text-zinc-900">{post.analytics.reach.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-3 text-zinc-500">
                            <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-pink-500" /> {post.analytics.likes}</span>
                            <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-blue-500" /> {post.analytics.comments}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-zinc-400 font-medium">Syncing stats...</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <button className="px-3 py-1.5 rounded-xl border border-pinkborder text-zinc-700 hover:bg-pink-50 font-bold text-xs inline-flex items-center gap-1">
                        <span>View Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
