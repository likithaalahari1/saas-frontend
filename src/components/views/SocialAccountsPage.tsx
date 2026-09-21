import React from 'react';
import { useApp } from '../../context/AppContext';
import { platformMeta } from '../common/BrandLogo';
import { Share2, Plus, AlertTriangle, RefreshCw, Unlink, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SocialAccountsPage: React.FC = () => {
  const { accounts, startConnectPlatform, disconnectPlatform, reauthorizePlatform } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1E7EE] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-1">
            <Share2 className="w-3.5 h-3.5" />
            OAuth Account Management
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Social Accounts</h1>
          <p className="text-xs text-zinc-500 font-medium">Connect and manage all your social channels securely.</p>
        </div>
      </div>

      {/* Security Info Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-white to-purple-50 border border-pinkborder shadow-pink-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white border border-pinkborder text-[#E85AAD] shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-zinc-900">OAuth 2.0 Token Encryption Protocol</span>
            <p className="text-zinc-500 text-[11px]">Socially never stores raw passwords. All access tokens are encrypted using AES-256 with automated background token rotation.</p>
          </div>
        </div>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {accounts.map(acc => {
          const meta = platformMeta[acc.platform];
          const isWarning = acc.health === 'warning';
          return (
            <div key={acc.id} className="bg-white rounded-3xl border border-[#F1E7EE] p-6 shadow-pink-sm hover:shadow-pink-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Top Channel Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-pinkborder shadow-pink-sm" style={{ backgroundColor: meta?.bgColor }}>
                      {meta?.icon}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-zinc-900">{meta?.name}</h3>
                      <p className="text-xs text-zinc-400 font-medium">{acc.username}</p>
                    </div>
                  </div>

                  {acc.connected ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
                      Disconnected
                    </span>
                  )}
                </div>

                {/* Account details */}
                {acc.connected ? (
                  <div className="space-y-2 bg-[#FFF7FB]/50 p-3 rounded-2xl border border-pinkborder text-xs">
                    <div className="flex justify-between text-zinc-600">
                      <span>Account Name:</span>
                      <span className="font-bold text-zinc-900">{acc.name}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Followers:</span>
                      <span className="font-bold text-zinc-900">{acc.followersCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Posts Published:</span>
                      <span className="font-bold text-zinc-900">{acc.postsPublishedCount}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Last Synced:</span>
                      <span className="font-bold text-emerald-600">{acc.lastSynced}</span>
                    </div>

                    {isWarning && (
                      <div className="pt-2 border-t border-amber-200 text-amber-700 text-[11px] flex items-center gap-1.5 font-medium">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{acc.warningMessage}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 text-center text-xs text-zinc-400 space-y-1">
                    <p>Connect your {meta?.name} account to publish posts & track reach.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#F1E7EE] flex items-center justify-between gap-2">
                {acc.connected ? (
                  <>
                    <button
                      onClick={() => reauthorizePlatform(acc.id)}
                      className="px-3 py-2 rounded-xl border border-pinkborder text-xs font-bold text-zinc-700 hover:bg-[#FFF7FB] flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Reauthorize</span>
                    </button>

                    <button
                      onClick={() => disconnectPlatform(acc.id)}
                      className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Unlink className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startConnectPlatform(acc.platform)}
                    className="w-full gradient-btn py-2.5 rounded-xl text-white font-extrabold text-xs shadow-pink-md flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Connect {meta?.name}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
