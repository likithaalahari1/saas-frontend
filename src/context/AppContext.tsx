import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '../services/api';

import { 
  SocialAccount, 
  Post, 
  MediaAsset, 
  InboxMessage, 
  TeamMember, 
  NotificationItem, 
  Workspace, 
  PlatformId,
  PostStatus
} from '../types';
import { 
  initialAccounts, 
  initialPosts, 
  initialMediaAssets, 
  initialInboxMessages, 
  initialTeamMembers, 
  initialNotifications, 
  initialWorkspaces 
} from '../data/mockData';

export type AppView = 
  | 'overview' 
  | 'create' 
  | 'calendar' 
  | 'drafts' 
  | 'published' 
  | 'social-accounts' 
  | 'analytics' 
  | 'inbox' 
  | 'media-library' 
  | 'team-approvals' 
  | 'settings';

interface AppContextType {
  mode: 'landing' | 'app';
  setMode: (mode: 'landing' | 'app') => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  setActiveWorkspace: (ws: Workspace) => void;
  accounts: SocialAccount[];
  posts: Post[];
  mediaAssets: MediaAsset[];
  inboxMessages: InboxMessage[];
  teamMembers: TeamMember[];
  notifications: NotificationItem[];
  
  // UI Drawers & Modals
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isNotificationsDrawerOpen: boolean;
  setIsNotificationsDrawerOpen: (open: boolean) => void;
  
  // OAuth Connect Simulation Modal
  isConnectModalOpen: boolean;
  setIsConnectModalOpen: (open: boolean) => void;
  connectingPlatform: PlatformId | null;
  startConnectPlatform: (platform: PlatformId) => void;
  completeConnectPlatform: () => void;
  disconnectPlatform: (accountId: string) => void;
  reauthorizePlatform: (accountId: string) => void;

  // Post Actions
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePostStatus: (postId: string, status: PostStatus) => void;
  deletePost: (postId: string) => void;
  duplicatePost: (postId: string) => void;
  
  // Inbox actions
  sendInboxReply: (threadId: string, replyText: string) => void;
  
  // Media upload
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => void;

  // Real-time publishing simulation
  isPublishingProgress: boolean;
  publishingProgressMap: Record<string, { percent: number; status: 'waiting' | 'publishing' | 'done' | 'failed' }>;
  simulatePublishing: (platforms: PlatformId[], onComplete: () => void) => void;

  // Quick edit post state (pass to create studio)
  editingPost: Post | null;
  setEditingPost: (post: Post | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'landing' | 'app'>('app');
  const [activeView, setActiveView] = useState<AppView>('overview');
  
  const [workspaces] = useState<Workspace[]>(initialWorkspaces);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(initialWorkspaces[0]);
  
  const [accounts, setAccounts] = useState<SocialAccount[]>(initialAccounts);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(initialMediaAssets);
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>(initialInboxMessages);
  const [teamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<PlatformId | null>(null);

  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Publishing animation state
  const [isPublishingProgress, setIsPublishingProgress] = useState(false);
  const [publishingProgressMap, setPublishingProgressMap] = useState<Record<string, { percent: number; status: 'waiting' | 'publishing' | 'done' | 'failed' }>>({});

  // Fetch live connected accounts from production Django backend
  useEffect(() => {
    async function loadAccounts() {
      try {
        const liveData = await fetchApi<any[]>('/accounts/');
        if (Array.isArray(liveData) && liveData.length > 0) {
          setAccounts(prev => prev.map(acc => {
            const found = liveData.find(item => item.platform === acc.platform && item.is_connected);
            if (found) {
              return {
                ...acc,
                name: found.account_name || acc.name,
                username: found.username || acc.username,
                connected: true,
                health: found.health || 'healthy',
                lastSynced: 'Just now',
                followersCount: found.followers_count || 18400,
                postsPublishedCount: found.posts_published_count || 42
              };
            }
            return acc;
          }));
        }
      } catch (e) {
        console.log('Backend sync status:', e);
      }
    }
    loadAccounts();
  }, []);


  const startConnectPlatform = (platform: PlatformId) => {
    setConnectingPlatform(platform);
    setIsConnectModalOpen(true);
  };

  const completeConnectPlatform = () => {
    if (!connectingPlatform) return;
    setAccounts(prev => prev.map(acc => {
      if (acc.platform === connectingPlatform) {
        return {
          ...acc,
          connected: true,
          health: 'healthy',
          lastSynced: 'Just now',
          warningMessage: undefined
        };
      }
      return acc;
    }));
    
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'success',
      title: 'Social Account Connected',
      message: `${connectingPlatform.toUpperCase()} account was connected successfully!`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    setIsConnectModalOpen(false);
    setConnectingPlatform(null);
  };

  const disconnectPlatform = (accountId: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === accountId) {
        return {
          ...acc,
          connected: false,
          health: 'expired',
          lastSynced: 'Disconnected'
        };
      }
      return acc;
    }));
  };

  const reauthorizePlatform = (accountId: string) => {
    const acc = accounts.find(a => a.id === accountId);
    if (acc) {
      startConnectPlatform(acc.platform);
    }
  };

  const createPost = (newPostData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPosts(prev => [created, ...prev]);
  };

  const updatePostStatus = (postId: string, status: PostStatus) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          status,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const duplicatePost = (postId: string) => {
    const found = posts.find(p => p.id === postId);
    if (found) {
      const dup: Post = {
        ...found,
        id: `post-${Date.now()}`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        globalCaption: `${found.globalCaption} (Copy)`
      };
      setPosts(prev => [dup, ...prev]);
    }
  };

  const sendInboxReply = (inboxId: string, replyText: string) => {
    setInboxMessages(prev => prev.map(item => {
      if (item.id === inboxId) {
        return {
          ...item,
          unread: false,
          thread: [
            ...item.thread,
            {
              id: `m-${Date.now()}`,
              sender: 'user',
              text: replyText,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return item;
    }));
  };

  const addMediaAsset = (assetData: Omit<MediaAsset, 'id' | 'createdAt'>) => {
    const asset: MediaAsset = {
      ...assetData,
      id: `media-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setMediaAssets(prev => [asset, ...prev]);
  };

  const simulatePublishing = (platforms: PlatformId[], onComplete: () => void) => {
    setIsPublishingProgress(true);
    const initialMap: Record<string, { percent: number; status: 'waiting' | 'publishing' | 'done' | 'failed' }> = {};
    platforms.forEach(p => {
      initialMap[p] = { percent: 0, status: 'waiting' };
    });
    setPublishingProgressMap(initialMap);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < platforms.length) {
        const platform = platforms[idx];
        setPublishingProgressMap(prev => ({
          ...prev,
          [platform]: { percent: 100, status: 'done' }
        }));
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsPublishingProgress(false);
          onComplete();
        }, 800);
      }
    }, 900);
  };

  return (
    <AppContext.Provider value={{
      mode,
      setMode,
      activeView,
      setActiveView,
      workspaces,
      activeWorkspace,
      setActiveWorkspace,
      accounts,
      posts,
      mediaAssets,
      inboxMessages,
      teamMembers,
      notifications,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      isNotificationsDrawerOpen,
      setIsNotificationsDrawerOpen,
      isConnectModalOpen,
      setIsConnectModalOpen,
      connectingPlatform,
      startConnectPlatform,
      completeConnectPlatform,
      disconnectPlatform,
      reauthorizePlatform,
      createPost,
      updatePostStatus,
      deletePost,
      duplicatePost,
      sendInboxReply,
      addMediaAsset,
      isPublishingProgress,
      publishingProgressMap,
      simulatePublishing,
      editingPost,
      setEditingPost
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
