import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo, platformMeta } from '../common/BrandLogo';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  PenTool, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck, 
  Users, 
  ChevronDown, 
  Play,
  Star
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setMode } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const platforms = ['instagram', 'facebook', 'linkedin', 'twitter', 'tiktok', 'youtube', 'pinterest'] as const;

  return (
    <div className="min-h-screen bg-[#FFFDFE] text-zinc-900 font-sans selection:bg-pink-100 selection:text-[#C93D91]">
      {/* Top Navbar */}
      <nav className="h-20 border-b border-[#F1E7EE] bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between">
        <BrandLogo size="lg" />

        <div className="hidden md:flex items-center gap-8 text-xs font-bold text-zinc-600">
          <a href="#features" className="hover:text-[#E85AAD] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#E85AAD] transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-[#E85AAD] transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-[#E85AAD] transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode('app')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('app')}
            className="gradient-btn px-5 py-2.5 rounded-xl text-white font-extrabold text-xs shadow-pink-md flex items-center gap-1.5"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-16 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center space-y-8 relative overflow-hidden">
        {/* Soft Pink Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FCE7F3] to-[#FFF7FB] rounded-full blur-3xl opacity-60 -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 border border-pinkborder text-xs font-extrabold text-[#C93D91] shadow-pink-sm">
          <Sparkles className="w-4 h-4 text-[#E85AAD]" />
          <span>The Unified Social Media Management Studio</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 max-w-4xl mx-auto leading-[1.1]">
          Your entire social media workflow.{' '}
          <span className="gradient-text">One workspace.</span>
        </h1>

        <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Create, schedule, publish and analyze content across all your social platforms from one beautiful, lightweight workspace.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setMode('app')}
            className="w-full sm:w-auto gradient-btn px-8 py-4 rounded-2xl text-white font-extrabold text-sm shadow-pink-lg flex items-center justify-center gap-2 group"
          >
            <span>Start Creating for Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setMode('app')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-pinkborder bg-white text-zinc-800 font-bold text-sm hover:bg-[#FFF7FB] transition-colors shadow-pink-sm flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-[#E85AAD] fill-[#E85AAD]" />
            <span>Interactive Live Demo</span>
          </button>
        </div>

        {/* Connected Platforms Bar */}
        <div className="pt-10 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Publish seamlessly to all 7 major networks</span>
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            {platforms.map(p => {
              const meta = platformMeta[p];
              return (
                <div key={p} className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-pinkborder shadow-pink-sm">
                  {meta?.icon}
                  <span className="text-xs font-bold text-zinc-800">{meta?.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* HERO UI PREVIEW CARD */}
        <div className="pt-8">
          <div className="rounded-3xl border-4 border-white shadow-pink-lg bg-white overflow-hidden max-w-5xl mx-auto relative group cursor-pointer" onClick={() => setMode('app')}>
            <div className="bg-[#FFF7FB] p-3 border-b border-pinkborder flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="font-mono text-[11px] text-zinc-500 ml-2">app.socially.com/workspace/overview</span>
              </div>
              <span className="font-extrabold text-[#C93D91] bg-pink-100 px-2.5 py-0.5 rounded-full text-[10px]">Click to Launch Studio 🚀</span>
            </div>

            <div className="p-6 bg-[#FFFDFE] space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-white border border-pinkborder">
                  <div className="text-xs font-bold text-zinc-400">Total Reach</div>
                  <div className="text-2xl font-extrabold text-zinc-900 mt-1">248,500</div>
                  <div className="text-[11px] text-emerald-600 font-bold">+22.4% this month</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-pinkborder">
                  <div className="text-xs font-bold text-zinc-400">Scheduled Posts</div>
                  <div className="text-2xl font-extrabold text-zinc-900 mt-1">12 Queue</div>
                  <div className="text-[11px] text-purple-600 font-bold">Auto-sync enabled</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-pinkborder">
                  <div className="text-xs font-bold text-zinc-400">Sync Health</div>
                  <div className="text-2xl font-extrabold text-emerald-600 mt-1">100% Active</div>
                  <div className="text-[11px] text-zinc-400 font-medium">7 Accounts connected</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-pinkborder">
                  <div className="text-xs font-bold text-zinc-400">Avg Engagement</div>
                  <div className="text-2xl font-extrabold text-zinc-900 mt-1">5.84%</div>
                  <div className="text-[11px] text-emerald-600 font-bold">Top 5% category</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF7FB] border border-pinkborder flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#E85AAD] text-white font-bold">LIVE</div>
                  <div>
                    <span className="font-extrabold text-zinc-900">“Create Once → Customize → Publish Everywhere”</span>
                    <p className="text-zinc-500 text-[11px]">Override captions per channel with live pixel-perfect Instagram, LinkedIn & TikTok previews.</p>
                  </div>
                </div>
                <span className="text-[#C93D91] font-extrabold">Explore Studio →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION: CREATE ONCE FLOW */}
      <section id="how-it-works" className="py-20 bg-[#FFF7FB]/60 border-y border-[#F1E7EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
              Create once. Customize per platform. Publish everywhere.
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 font-medium">
              Say goodbye to copying and pasting captions manually across 6 different social apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-pinkborder shadow-pink-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#E85AAD] flex items-center justify-center font-extrabold text-lg">1</div>
              <h3 className="font-extrabold text-lg text-zinc-900">One Content Editor</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Write your core message once. Add images, videos, carousels, and global hashtags in a clean focus studio.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-pinkborder shadow-pink-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-extrabold text-lg">2</div>
              <h3 className="font-extrabold text-lg text-zinc-900">Per-Channel Customization</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Tailor captions for LinkedIn professionalism, add Instagram Reel tags, or YouTube video titles with live previews.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-pinkborder shadow-pink-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-extrabold text-lg">3</div>
              <h3 className="font-extrabold text-lg text-zinc-900">Simultaneous Multi-Publishing</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Publish immediately or schedule optimal posting times with real-time status updates across all connected channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-6 md:px-12 space-y-12 text-center">
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
            Simple, predictable pricing.
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 font-medium">
            Choose the plan that fits your growth. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Starter */}
          <div className="bg-white p-8 rounded-3xl border border-pinkborder shadow-pink-sm space-y-6">
            <div>
              <h3 className="font-extrabold text-lg text-zinc-900">Starter</h3>
              <p className="text-xs text-zinc-500 mt-1">For creators & individual managers</p>
              <div className="text-3xl font-extrabold text-zinc-900 mt-4">$0 <span className="text-xs text-zinc-400 font-medium">/ forever</span></div>
            </div>

            <ul className="space-y-3 text-xs text-zinc-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Up to 3 Social Accounts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 10 Scheduled Posts / mo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Global Content Editor</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Basic Analytics</li>
            </ul>

            <button onClick={() => setMode('app')} className="w-full py-3 rounded-2xl border border-pinkborder text-zinc-800 font-bold text-xs hover:bg-[#FFF7FB]">
              Get Started Free
            </button>
          </div>

          {/* Pro (Featured) */}
          <div className="bg-gradient-to-b from-[#FFF7FB] to-white p-8 rounded-3xl border-2 border-[#E85AAD] shadow-pink-lg space-y-6 relative">
            <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#E85AAD] text-white text-[10px] font-extrabold shadow-pink-sm">
              MOST POPULAR
            </span>

            <div>
              <h3 className="font-extrabold text-lg text-zinc-900">Pro Plan</h3>
              <p className="text-xs text-zinc-500 mt-1">For growing brands & agencies</p>
              <div className="text-3xl font-extrabold text-zinc-900 mt-4">$29 <span className="text-xs text-zinc-400 font-medium">/ month</span></div>
            </div>

            <ul className="space-y-3 text-xs text-zinc-700 font-semibold">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#E85AAD]" /> All 7 Connected Social Networks</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#E85AAD]" /> Unlimited Scheduled Posts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#E85AAD]" /> Per-Platform Customization & Previews</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#E85AAD]" /> Unified Inbox & CRM Context</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#E85AAD]" /> Team Approvals Workflow</li>
            </ul>

            <button onClick={() => setMode('app')} className="w-full gradient-btn py-3.5 rounded-2xl text-white font-extrabold text-xs shadow-pink-md">
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-white p-8 rounded-3xl border border-pinkborder shadow-pink-sm space-y-6">
            <div>
              <h3 className="font-extrabold text-lg text-zinc-900">Enterprise</h3>
              <p className="text-xs text-zinc-500 mt-1">For multi-brand organizations</p>
              <div className="text-3xl font-extrabold text-zinc-900 mt-4">$99 <span className="text-xs text-zinc-400 font-medium">/ month</span></div>
            </div>

            <ul className="space-y-3 text-xs text-zinc-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Multiple Workspaces</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Dedicated Account Manager</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Custom API & Webhooks</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> SSO & Audit Logs</li>
            </ul>

            <button onClick={() => setMode('app')} className="w-full py-3 rounded-2xl border border-pinkborder text-zinc-800 font-bold text-xs hover:bg-[#FFF7FB]">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#F1E7EE] bg-[#FFF7FB] py-12 px-6 md:px-12 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <BrandLogo size="md" />
          <div className="flex items-center gap-6 font-semibold text-zinc-600">
            <a href="#features" className="hover:text-[#E85AAD]">Privacy Policy</a>
            <a href="#features" className="hover:text-[#E85AAD]">Terms of Service</a>
            <a href="#features" className="hover:text-[#E85AAD]">Security OAuth Scope</a>
          </div>
          <div>© 2026 Socially Management Studio. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
