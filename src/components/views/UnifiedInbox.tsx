import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformBadge } from '../common/BrandLogo';
import { PlatformId } from '../../types';
import { MessageSquare, Send, Paperclip, Smile, Search, CheckCircle2, User, Phone, Mail } from 'lucide-react';

export const UnifiedInbox: React.FC = () => {
  const { inboxMessages, sendInboxReply } = useApp();
  const [selectedChannel, setSelectedChannel] = useState<PlatformId | 'all'>('all');
  const [activeThreadId, setActiveThreadId] = useState<string>(inboxMessages[0]?.id || 'inbox-1');
  const [replyText, setReplyText] = useState('');

  const filteredMessages = inboxMessages.filter(m => selectedChannel === 'all' || m.platform === selectedChannel);
  const activeConversation = inboxMessages.find(m => m.id === activeThreadId) || inboxMessages[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sendInboxReply(activeThreadId, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-4 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1E7EE] pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-100 text-[#C93D91] text-xs font-bold mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            Unified Social Inbox
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Social Inbox</h1>
          <p className="text-xs text-zinc-500 font-medium">All customer conversations across Instagram, Facebook & LinkedIn in one place.</p>
        </div>
      </div>

      {/* 3-Column Unified Chat Workspace */}
      <div className="bg-white rounded-3xl border border-[#F1E7EE] shadow-pink-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* Column 1 (3 cols): Conversation List Sidebar */}
        <div className="lg:col-span-4 border-r border-[#F1E7EE] flex flex-col justify-between bg-[#FFF7FB]/30">
          <div className="p-3 border-b border-[#F1E7EE] space-y-2">
            {/* Channel filter chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {(['all', 'instagram', 'facebook', 'linkedin'] as const).map(ch => (
                <button
                  key={ch}
                  onClick={() => setSelectedChannel(ch)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                    selectedChannel === ch ? 'bg-[#E85AAD] text-white shadow-pink-sm' : 'text-zinc-600 hover:bg-white'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>

            {/* Search conversations */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-pinkborder text-xs outline-none bg-white focus:border-[#E85AAD]"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#F1E7EE]">
            {filteredMessages.map(item => {
              const isActive = item.id === activeThreadId;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveThreadId(item.id)}
                  className={`p-3.5 cursor-pointer transition-colors space-y-1 ${
                    isActive ? 'bg-[#FCE7F3]/60 border-l-4 border-l-[#E85AAD]' : 'hover:bg-[#FFF7FB]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={item.sender.avatar} alt={item.sender.name} className="w-9 h-9 rounded-full object-cover border border-pinkborder" />
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold text-zinc-900 truncate">{item.sender.name}</div>
                        <PlatformBadge platform={item.platform} size="sm" />
                      </div>
                    </div>

                    <span className="text-[10px] text-zinc-400 font-medium shrink-0">{item.timestamp}</span>
                  </div>

                  <p className="text-xs text-zinc-600 line-clamp-1 font-medium pl-1">
                    {item.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2 (5 cols): Active Chat Thread Window */}
        <div className="lg:col-span-5 border-r border-[#F1E7EE] flex flex-col justify-between bg-white">
          {activeConversation ? (
            <>
              {/* Chat Thread Header */}
              <div className="p-4 border-b border-[#F1E7EE] flex items-center justify-between bg-[#FFF7FB]/60">
                <div className="flex items-center gap-3">
                  <img src={activeConversation.sender.avatar} alt="Sender" className="w-9 h-9 rounded-full object-cover border border-pinkborder" />
                  <div>
                    <h3 className="font-extrabold text-sm text-zinc-900">{activeConversation.sender.name}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                      <span>{activeConversation.sender.username}</span>
                      <span>•</span>
                      <PlatformBadge platform={activeConversation.platform} size="sm" showName={true} />
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Online
                </span>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FFFDFE]">
                {activeConversation.thread.map((msg) => {
                  const isMe = msg.sender === 'user';
                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`p-3 rounded-2xl max-w-sm text-xs leading-relaxed ${
                        isMe 
                          ? 'bg-gradient-to-r from-[#E85AAD] to-[#8B5CF6] text-white rounded-br-none shadow-pink-sm' 
                          : 'bg-[#FFF7FB] text-zinc-800 border border-pinkborder rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-zinc-400 font-semibold mt-1 px-1">{msg.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form Footer */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-[#F1E7EE] bg-[#FFF7FB]/40 space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder={`Reply to ${activeConversation.sender.name} on ${activeConversation.platform}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full pl-3 pr-20 py-2.5 rounded-2xl border border-pinkborder text-xs outline-none focus:border-[#E85AAD] bg-white font-medium"
                  />

                  <div className="absolute right-2 flex items-center gap-1 text-zinc-400">
                    <button type="button" className="p-1 hover:text-zinc-600"><Paperclip className="w-4 h-4" /></button>
                    <button type="button" className="p-1 hover:text-[#E85AAD]"><Smile className="w-4 h-4" /></button>
                    <button type="submit" className="p-1.5 rounded-xl bg-[#E85AAD] text-white hover:bg-[#C93D91] transition-colors shadow-xs">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-zinc-400">Select a conversation to reply</div>
          )}
        </div>

        {/* Column 3 (3 cols): Right Context Side Panel */}
        <div className="hidden lg:block lg:col-span-3 p-4 bg-[#FFF7FB]/20 space-y-4">
          {activeConversation && (
            <div className="space-y-4 text-xs">
              <div className="text-center space-y-2 pb-3 border-b border-[#F1E7EE]">
                <img src={activeConversation.sender.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-white shadow-pink-sm" />
                <div>
                  <h4 className="font-extrabold text-sm text-zinc-900">{activeConversation.sender.name}</h4>
                  <p className="text-[11px] text-zinc-400 font-medium">{activeConversation.sender.username}</p>
                </div>
              </div>

              <div className="space-y-2 bg-white p-3 rounded-2xl border border-pinkborder">
                <span className="font-bold text-zinc-800 text-[11px] uppercase tracking-wider block">Customer Context</span>
                <div className="flex items-center gap-2 text-zinc-600">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span>VIP Creator Account</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>elena@designstudio.com</span>
                </div>
              </div>

              <div className="space-y-2 bg-white p-3 rounded-2xl border border-pinkborder">
                <span className="font-bold text-zinc-800 text-[11px] uppercase tracking-wider block">Recent Interactions</span>
                <p className="text-[11px] text-zinc-500 leading-snug">Liked product launch Reel (2 days ago)</p>
                <p className="text-[11px] text-zinc-500 leading-snug">Commented on UX guide (1 week ago)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
