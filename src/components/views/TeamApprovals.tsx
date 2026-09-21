import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Users, Plus, CheckCircle2, Clock, AlertCircle, Shield, Mail, Check, MessageCircle } from 'lucide-react';

export const TeamApprovals: React.FC = () => {
  const { teamMembers, posts, updatePostStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'approvals' | 'members'>('approvals');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('editor');

  const inReviewPosts = posts.filter(p => p.status === 'in_review');

  const approvalPipeline: { label: string; status: string; color: string }[] = [
    { label: 'Draft', status: 'draft', color: 'bg-zinc-200 text-zinc-700' },
    { label: 'In Review', status: 'in_review', color: 'bg-amber-100 text-amber-800' },
    { label: 'Changes Requested', status: 'changes_requested', color: 'bg-red-100 text-red-700' },
    { label: 'Approved', status: 'approved', color: 'bg-emerald-100 text-emerald-800' },
    { label: 'Scheduled', status: 'scheduled', color: 'bg-purple-100 text-purple-800' },
    { label: 'Published', status: 'published', color: 'bg-[#FCE7F3] text-[#C93D91]' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1E7EE] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <Users className="w-3.5 h-3.5" />
            Enterprise Collaboration
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Team & Approvals</h1>
          <p className="text-xs text-zinc-500 font-medium">Manage team permissions and approve content before publishing.</p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-[#FFF7FB] p-1 rounded-2xl border border-pinkborder">
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'approvals' ? 'bg-[#E85AAD] text-white shadow-pink-sm' : 'text-zinc-600 hover:bg-white'
            }`}
          >
            Approval Pipeline ({inReviewPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'members' ? 'bg-[#E85AAD] text-white shadow-pink-sm' : 'text-zinc-600 hover:bg-white'
            }`}
          >
            Team Directory ({teamMembers.length})
          </button>
        </div>
      </div>

      {/* APPROVAL WORKFLOW SECTION */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          {/* Workflow Status Timeline Bar */}
          <div className="bg-white p-4 rounded-3xl border border-pinkborder shadow-pink-sm space-y-2">
            <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">Approval Workflow Pipeline</h3>
            <div className="flex items-center justify-between overflow-x-auto py-2">
              {approvalPipeline.map((step, idx) => (
                <div key={step.status} className="flex items-center gap-2 shrink-0">
                  <div className={`px-3 py-1.5 rounded-xl text-xs font-bold ${step.color}`}>
                    {idx + 1}. {step.label}
                  </div>
                  {idx < approvalPipeline.length - 1 && <span className="text-zinc-300 font-bold">→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Posts in Review List */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-zinc-900">Pending Review ({inReviewPosts.length})</h3>

            {inReviewPosts.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-pinkborder text-center text-xs text-zinc-400">
                All posts have been reviewed and approved!
              </div>
            ) : (
              inReviewPosts.map(post => (
                <div key={post.id} className="bg-white rounded-3xl border border-[#F1E7EE] p-5 shadow-pink-sm space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <img src={post.createdBy.avatar} alt={post.createdBy.name} className="w-10 h-10 rounded-full object-cover border border-pinkborder shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-zinc-900">{post.createdBy.name} submitted post</h4>
                        <p className="text-[11px] text-zinc-400 font-medium">Submitted for editorial review • {new Date(post.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updatePostStatus(post.id, 'changes_requested')}
                        className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 text-xs font-bold"
                      >
                        Request Changes
                      </button>

                      <button
                        onClick={() => updatePostStatus(post.id, 'approved')}
                        className="gradient-btn px-4 py-1.5 rounded-xl text-white text-xs font-extrabold shadow-pink-sm flex items-center gap-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve & Schedule</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FFF7FB] rounded-2xl border border-pinkborder text-xs text-zinc-800 leading-relaxed font-medium">
                    {post.globalCaption}
                  </div>

                  {post.approvalHistory && post.approvalHistory[0] && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center gap-2 font-medium">
                      <MessageCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Note from {post.approvalHistory[0].updatedBy}: "{post.approvalHistory[0].comment}"</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TEAM MEMBERS SECTION */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          {/* Invite Member Box */}
          <div className="bg-white p-5 rounded-3xl border border-pinkborder shadow-pink-sm space-y-3">
            <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">Invite Team Member</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 p-2.5 rounded-xl border border-pinkborder text-xs outline-none focus:border-[#E85AAD]"
              />

              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as UserRole)}
                className="p-2.5 rounded-xl border border-pinkborder text-xs font-bold text-zinc-700 outline-none"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="approver">Approver</option>
                <option value="viewer">Viewer</option>
              </select>

              <button className="gradient-btn px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-pink-md">
                Send Invitation
              </button>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-3xl border border-[#F1E7EE] shadow-pink-sm overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FFF7FB] border-b border-pinkborder text-[11px] font-extrabold text-zinc-400 uppercase">
                  <th className="p-4">Member</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pinkborder">
                {teamMembers.map(m => (
                  <tr key={m.id} className="hover:bg-[#FFF7FB]/40">
                    <td className="p-4 flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover border border-pinkborder" />
                      <div>
                        <div className="font-extrabold text-zinc-900">{m.name}</div>
                        <div className="text-[11px] text-zinc-400 font-medium">{m.email}</div>
                      </div>
                    </td>

                    <td className="p-4 font-bold capitalize text-zinc-800">
                      <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-extrabold border border-purple-100">
                        {m.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {m.status}
                      </span>
                    </td>

                    <td className="p-4 text-zinc-500 font-semibold">{m.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
