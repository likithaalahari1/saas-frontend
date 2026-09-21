import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformBadge } from '../common/BrandLogo';
import { BarChart3, TrendingUp, Users, Eye, Heart, Video, ArrowUpRight, Calendar, Download } from 'lucide-react';

export const AnalyticsSuite: React.FC = () => {
  const { accounts } = useApp();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Interactive sample metric cards
  const metrics = [
    { title: 'Total Reach', value: '248,500', change: '+22.4%', isUp: true, icon: <Eye className="w-4 h-4 text-[#E85AAD]" /> },
    { title: 'Engagement Rate', value: '5.84%', change: '+1.2%', isUp: true, icon: <TrendingUp className="w-4 h-4 text-emerald-600" /> },
    { title: 'Total Followers', value: '380,500', change: '+4,210', isUp: true, icon: <Users className="w-4 h-4 text-purple-600" /> },
    { title: 'Total Likes & Shares', value: '42,100', change: '+14.8%', isUp: true, icon: <Heart className="w-4 h-4 text-pink-600" /> },
    { title: 'Video Views', value: '184,200', change: '+38.5%', isUp: true, icon: <Video className="w-4 h-4 text-blue-600" /> }
  ];

  // SVG Chart Simulation path data
  const reachPoints = [40, 65, 50, 85, 75, 110, 95, 140, 130, 180, 160, 220];
  const maxReach = 250;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1E7EE] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            Performance Intelligence
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Analytics Dashboard</h1>
          <p className="text-xs text-zinc-500 font-medium">Cross-network engagement, reach, and audience growth overview.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#FFF7FB] p-1 rounded-2xl border border-pinkborder">
            {(['7d', '30d', '90d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timeRange === range ? 'bg-[#E85AAD] text-white shadow-pink-sm' : 'text-zinc-600 hover:bg-white'
                }`}
              >
                Last {range.replace('d', ' Days')}
              </button>
            ))}
          </div>

          <button className="px-4 py-2 rounded-xl border border-pinkborder bg-white text-zinc-700 font-bold text-xs hover:bg-[#FFF7FB] flex items-center gap-1.5">
            <Download className="w-4 h-4 text-zinc-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-5 rounded-3xl bg-white border border-[#F1E7EE] shadow-pink-sm hover:shadow-pink-md transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-zinc-400 tracking-wider">{m.title}</span>
              <div className="p-2 rounded-xl bg-[#FFF7FB] border border-pinkborder">
                {m.icon}
              </div>
            </div>

            <div className="text-2xl font-extrabold text-zinc-900">{m.value}</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{m.change} vs prev {timeRange}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reach Over Time SVG Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#F1E7EE] p-6 shadow-pink-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-zinc-900">Reach & Impressions Growth</h3>
              <p className="text-xs text-zinc-500">Cross-channel reach aggregated real-time</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[#E85AAD]"><span className="w-2.5 h-2.5 rounded-full bg-[#E85AAD]" /> Reach</span>
              <span className="flex items-center gap-1.5 text-purple-600"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Impressions</span>
            </div>
          </div>

          {/* Clean SVG Area Chart */}
          <div className="h-64 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E85AAD" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E85AAD" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#F1E7EE" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#F1E7EE" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#F1E7EE" strokeDasharray="4 4" />

              {/* Area fill */}
              <path
                d={`M 0,200 L ${reachPoints.map((pt, i) => `${(i / (reachPoints.length - 1)) * 500},${200 - (pt / maxReach) * 180}`).join(' L ')} L 500,200 Z`}
                fill="url(#pinkGradient)"
              />

              {/* Line */}
              <path
                d={`M ${reachPoints.map((pt, i) => `${(i / (reachPoints.length - 1)) * 500},${200 - (pt / maxReach) * 180}`).join(' L ')}`}
                fill="none"
                stroke="#E85AAD"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              {reachPoints.map((pt, i) => {
                const cx = (i / (reachPoints.length - 1)) * 500;
                const cy = 200 - (pt / maxReach) * 180;
                return (
                  <circle key={i} cx={cx} cy={cy} r="4" fill="#FFFFFF" stroke="#E85AAD" strokeWidth="2.5" />
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between text-[10px] font-bold text-zinc-400 pt-2 border-t border-[#F1E7EE]">
            <span>Sep 01</span><span>Sep 05</span><span>Sep 10</span><span>Sep 15</span><span>Sep 20</span><span>Today</span>
          </div>
        </div>

        {/* Channel Share Comparison */}
        <div className="bg-white rounded-3xl border border-[#F1E7EE] p-6 shadow-pink-sm space-y-4">
          <h3 className="font-extrabold text-base text-zinc-900">Platform Reach Share</h3>

          <div className="space-y-3">
            {[
              { name: 'Instagram', pct: '38%', count: '94,200 reach', color: 'bg-[#E4405F]' },
              { name: 'TikTok', pct: '28%', count: '69,500 reach', color: 'bg-zinc-900' },
              { name: 'LinkedIn', pct: '18%', count: '44,700 reach', color: 'bg-[#0A66C2]' },
              { name: 'Facebook', pct: '16%', count: '39,700 reach', color: 'bg-[#1877F2]' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-zinc-900">{item.name}</span>
                  <span className="text-zinc-600">{item.pct} ({item.count})</span>
                </div>
                <div className="w-full h-2 bg-pink-50 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Comparison Table */}
      <div className="bg-white rounded-3xl border border-[#F1E7EE] p-6 shadow-pink-sm space-y-4">
        <h3 className="font-extrabold text-base text-zinc-900">Channel Performance Breakdown</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FFF7FB] border-b border-pinkborder text-[11px] font-extrabold text-zinc-400 uppercase">
                <th className="p-3">Platform</th>
                <th className="p-3">Total Followers</th>
                <th className="p-3">Posts Published</th>
                <th className="p-3">Avg. Engagement Rate</th>
                <th className="p-3">Top Post Likes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pinkborder">
              {accounts.slice(0, 5).map(acc => (
                <tr key={acc.id} className="hover:bg-[#FFF7FB]/40">
                  <td className="p-3 font-bold text-zinc-900 flex items-center gap-2">
                    <PlatformBadge platform={acc.platform} showName={true} />
                  </td>
                  <td className="p-3 font-semibold text-zinc-700">{acc.followersCount.toLocaleString()}</td>
                  <td className="p-3 font-semibold text-zinc-700">{acc.postsPublishedCount}</td>
                  <td className="p-3 font-bold text-emerald-600">6.2%</td>
                  <td className="p-3 font-semibold text-zinc-900">2,450</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
