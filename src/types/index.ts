export type PlatformId = 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'pinterest';

export type PostStatus = 'draft' | 'in_review' | 'changes_requested' | 'approved' | 'scheduled' | 'published' | 'partially_published' | 'failed';

export type UserRole = 'owner' | 'admin' | 'editor' | 'approver' | 'viewer';

export interface SocialAccount {
  id: string;
  platform: PlatformId;
  name: string;
  username: string;
  avatar: string;
  connected: boolean;
  lastSynced: string;
  postsPublishedCount: number;
  followersCount: number;
  health: 'healthy' | 'warning' | 'expired';
  warningMessage?: string;
}

export interface PostVariant {
  platform: PlatformId;
  caption: string;
  hashtags: string[];
  mediaUrls: string[];
  customOptions?: {
    postType?: 'feed' | 'reel' | 'carousel' | 'story' | 'shorts' | 'video';
    title?: string; // YouTube
    tags?: string[]; // YouTube
    thumbnailUrl?: string; // YouTube
    tiktokCoverUrl?: string; // TikTok
    privacy?: 'public' | 'unlisted' | 'private';
  };
  status: 'pending' | 'published' | 'failed';
  errorMessage?: string;
}

export interface Post {
  id: string;
  globalCaption: string;
  globalMediaUrls: string[];
  platforms: PlatformId[];
  variants: Record<PlatformId, PostVariant>;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  scheduledAt?: string;
  publishedAt?: string;
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
  approvalHistory?: {
    status: PostStatus;
    updatedBy: string;
    updatedAt: string;
    comment?: string;
  }[];
  commentsCount?: number;
  analytics?: {
    impressions: number;
    reach: number;
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
  };
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'gif';
  dimensions?: string;
  sizeBytes: number;
  folder: string;
  tags: string[];
  createdAt: string;
}

export interface InboxMessage {
  id: string;
  platform: PlatformId;
  sender: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  unread: boolean;
  thread: {
    id: string;
    sender: 'user' | 'customer';
    text: string;
    time: string;
  }[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: 'active' | 'invited';
  lastActive: string;
}

export interface NotificationItem {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface Workspace {
  id: string;
  name: string;
  logo: string;
  plan: 'Pro Plan' | 'Enterprise Plan' | 'Starter';
  membersCount: number;
}
