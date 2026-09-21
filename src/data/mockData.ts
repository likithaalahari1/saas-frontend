import { SocialAccount, Post, MediaAsset, InboxMessage, TeamMember, NotificationItem, Workspace } from '../types';

export const initialWorkspaces: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Acme Brand Co.',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    plan: 'Pro Plan',
    membersCount: 8,
  },
  {
    id: 'ws-2',
    name: 'Studio Creative',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    plan: 'Enterprise Plan',
    membersCount: 15,
  }
];

export const initialAccounts: SocialAccount[] = [
  {
    id: 'acc-1',
    platform: 'instagram',
    name: 'Instagram Official',
    username: '@instagram_channel',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    connected: false,
    lastSynced: 'Not connected',
    postsPublishedCount: 0,
    followersCount: 0,
    health: 'expired'
  },
  {
    id: 'acc-2',
    platform: 'facebook',
    name: 'Facebook Page',
    username: '@facebook_page',
    avatar: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=150&q=80',
    connected: false,
    lastSynced: 'Not connected',
    postsPublishedCount: 0,
    followersCount: 0,
    health: 'expired'
  },
  {
    id: 'acc-3',
    platform: 'linkedin',
    name: 'LinkedIn Company Page',
    username: '@linkedin_company',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    connected: false,
    lastSynced: 'Not connected',
    postsPublishedCount: 0,
    followersCount: 0,
    health: 'expired'
  },
  {
    id: 'acc-4',
    platform: 'twitter',
    name: 'X (Twitter) Channel',
    username: '@twitter_channel',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    connected: false,
    lastSynced: 'Not connected',
    postsPublishedCount: 0,
    followersCount: 0,
    health: 'expired'
  },
  {
    id: 'acc-5',
    platform: 'tiktok',
    name: 'TikTok Channel',
    username: '@tiktok_channel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    connected: false,
    lastSynced: 'Not connected',
    postsPublishedCount: 0,
    followersCount: 0,
    health: 'expired'
  },
  {
    id: 'acc-6',
    platform: 'youtube',
    name: 'YouTube Channel',
    username: '@youtube_channel',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    connected: false,
    lastSynced: 'Not connected',
    postsPublishedCount: 0,
    followersCount: 0,
    health: 'expired'
  },
  {
    id: 'acc-7',
    platform: 'pinterest',
    name: 'Pinterest Board',
    username: '@pinterest_board',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    connected: false,
    lastSynced: 'Not connected',
    postsPublishedCount: 0,
    followersCount: 0,
    health: 'expired'
  }
];

export const initialPosts: Post[] = [
  {
    id: 'post-101',
    globalCaption: '🚀 Exciting news! We are officially launching our next-gen social media suite. Create once, customize per channel, and publish everywhere seamless.',
    globalMediaUrls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    ],
    platforms: ['instagram', 'facebook', 'linkedin', 'twitter'],
    variants: {
      instagram: {
        platform: 'instagram',
        caption: '🚀 Exciting news! We are launching our next-gen social suite.\n\n✨ Features:\n• Single-click multi-channel distribution\n• Native previews\n• Automated analytics\n\nLink in bio! #SocialMedia #SaaS #MarketingStudio',
        hashtags: ['#SocialMedia', '#SaaS', '#MarketingStudio', '#ContentCreation'],
        mediaUrls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
        customOptions: { postType: 'carousel' },
        status: 'published'
      },
      facebook: {
        platform: 'facebook',
        caption: '🚀 Exciting news! We are officially launching our next-gen social media suite. Create once, customize per channel, and publish everywhere seamless. Check out the link below to get started today!',
        hashtags: ['#Socially', '#Productivity'],
        mediaUrls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
        status: 'published'
      },
      linkedin: {
        platform: 'linkedin',
        caption: 'We are thrilled to announce the official release of Socially — a unified social media management studio designed for modern marketing teams.\n\nKey capabilities:\n1. Global Content Creation Studio\n2. Real-time platform previews\n3. Cross-network analytics\n\nRead our full launch announcement here.',
        hashtags: ['#SaaS', '#MarketingTech', '#Productivity'],
        mediaUrls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'],
        status: 'published'
      },
      twitter: {
        platform: 'twitter',
        caption: '🚀 Big product update! Create once → Customize → Publish Everywhere with @socially.\n\nNo more manual copy-pasting across 6 platforms. Try it today 👇',
        hashtags: ['#buildinpublic', '#saas'],
        mediaUrls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
        status: 'published'
      },
      tiktok: {
        platform: 'tiktok',
        caption: 'Watch how we publish to 5 networks in 10 seconds ⚡️ #techtok #productivity',
        hashtags: ['#techtok'],
        mediaUrls: [],
        status: 'pending'
      },
      youtube: {
        platform: 'youtube',
        caption: 'Full overview of Socially platform capabilities.',
        hashtags: [],
        mediaUrls: [],
        status: 'pending'
      },
      pinterest: {
        platform: 'pinterest',
        caption: 'Minimalist social media dashboard design concept.',
        hashtags: [],
        mediaUrls: [],
        status: 'pending'
      }
    },
    status: 'published',
    createdAt: '2026-09-21T10:00:00Z',
    updatedAt: '2026-09-21T10:05:00Z',
    publishedAt: '2026-09-21T10:05:00Z',
    createdBy: {
      id: 'u-1',
      name: 'Likitha Sri',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    analytics: {
      impressions: 48200,
      reach: 34100,
      likes: 2450,
      comments: 312,
      shares: 184,
      clicks: 890
    }
  },
  {
    id: 'post-102',
    globalCaption: 'Behind the scenes of our creative studio workflow! How we design content that converts across Instagram and TikTok.',
    globalMediaUrls: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'],
    platforms: ['instagram', 'tiktok', 'facebook'],
    variants: {
      instagram: {
        platform: 'instagram',
        caption: 'Behind the scenes at Acme Studio 🎬 Swipe to see our content workflow setup! #BehindTheScenes #CreativeStudio',
        hashtags: ['#BehindTheScenes', '#CreativeStudio'],
        mediaUrls: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'],
        customOptions: { postType: 'reel' },
        status: 'pending'
      },
      tiktok: {
        platform: 'tiktok',
        caption: 'A day in the life of a social media manager ☕️ #dayinmylife #marketing',
        hashtags: ['#dayinmylife', '#marketing'],
        mediaUrls: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'],
        customOptions: { tiktokCoverUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
        status: 'pending'
      },
      facebook: {
        platform: 'facebook',
        caption: 'Behind the scenes of our creative studio workflow! How we design content that converts.',
        hashtags: [],
        mediaUrls: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'],
        status: 'pending'
      },
      linkedin: { platform: 'linkedin', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      twitter: { platform: 'twitter', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      youtube: { platform: 'youtube', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      pinterest: { platform: 'pinterest', caption: '', hashtags: [], mediaUrls: [], status: 'pending' }
    },
    status: 'scheduled',
    scheduledAt: '2026-09-28T10:30:00Z',
    createdAt: '2026-09-20T14:30:00Z',
    updatedAt: '2026-09-21T08:00:00Z',
    createdBy: {
      id: 'u-1',
      name: 'Likitha Sri',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'post-103',
    globalCaption: '10 Essential UX Principles for Modern SaaS Dashboards. Swipe through the guide!',
    globalMediaUrls: ['https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80'],
    platforms: ['linkedin', 'twitter'],
    variants: {
      linkedin: {
        platform: 'linkedin',
        caption: 'Designers & Product Managers: Here are 10 core principles we used to craft our lightweight SaaS dashboard:\n\n1. Progressive disclosure\n2. Reduced cognitive load\n3. Dynamic contrast\n\nWhat is your top UX principle?',
        hashtags: ['#UXDesign', '#ProductDesign', '#SaaS'],
        mediaUrls: ['https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80'],
        status: 'pending'
      },
      twitter: {
        platform: 'twitter',
        caption: '10 UX principles for building software people actually love using 🧵👇',
        hashtags: ['#design', '#ux'],
        mediaUrls: ['https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80'],
        status: 'pending'
      },
      instagram: { platform: 'instagram', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      facebook: { platform: 'facebook', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      tiktok: { platform: 'tiktok', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      youtube: { platform: 'youtube', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      pinterest: { platform: 'pinterest', caption: '', hashtags: [], mediaUrls: [], status: 'pending' }
    },
    status: 'in_review',
    createdAt: '2026-09-21T09:15:00Z',
    updatedAt: '2026-09-21T09:20:00Z',
    createdBy: {
      id: 'u-2',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    approvalHistory: [
      {
        status: 'in_review',
        updatedBy: 'Alex Rivera',
        updatedAt: '2026-09-21T09:20:00Z',
        comment: 'Submitted for editorial review. Check LinkedIn slide formatting.'
      }
    ]
  },
  {
    id: 'post-104',
    globalCaption: 'Draft: Autumn Product Drop Sneak Peek',
    globalMediaUrls: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'],
    platforms: ['instagram', 'pinterest'],
    variants: {
      instagram: {
        platform: 'instagram',
        caption: 'Autumn colors coming soon 🍂',
        hashtags: ['#autumn', '#style'],
        mediaUrls: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'],
        status: 'pending'
      },
      pinterest: {
        platform: 'pinterest',
        caption: 'Fall moodboard aesthetic pins.',
        hashtags: [],
        mediaUrls: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'],
        status: 'pending'
      },
      facebook: { platform: 'facebook', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      linkedin: { platform: 'linkedin', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      twitter: { platform: 'twitter', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      tiktok: { platform: 'tiktok', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      youtube: { platform: 'youtube', caption: '', hashtags: [], mediaUrls: [], status: 'pending' }
    },
    status: 'draft',
    createdAt: '2026-09-19T11:00:00Z',
    updatedAt: '2026-09-19T11:05:00Z',
    createdBy: {
      id: 'u-1',
      name: 'Likitha Sri',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'post-105',
    globalCaption: 'Weekly Tech Insights: Why Async Workflows scale faster.',
    globalMediaUrls: ['https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'],
    platforms: ['linkedin', 'facebook'],
    variants: {
      linkedin: {
        platform: 'linkedin',
        caption: 'Failed publish test on LinkedIn token.',
        hashtags: [],
        mediaUrls: ['https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'],
        status: 'failed',
        errorMessage: 'LinkedIn access token expired. Re-authorization required.'
      },
      facebook: {
        platform: 'facebook',
        caption: 'Weekly Tech Insights: Why Async Workflows scale faster.',
        hashtags: [],
        mediaUrls: ['https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'],
        status: 'published'
      },
      instagram: { platform: 'instagram', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      twitter: { platform: 'twitter', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      tiktok: { platform: 'tiktok', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      youtube: { platform: 'youtube', caption: '', hashtags: [], mediaUrls: [], status: 'pending' },
      pinterest: { platform: 'pinterest', caption: '', hashtags: [], mediaUrls: [], status: 'pending' }
    },
    status: 'partially_published',
    createdAt: '2026-09-18T16:00:00Z',
    updatedAt: '2026-09-18T16:02:00Z',
    publishedAt: '2026-09-18T16:02:00Z',
    createdBy: {
      id: 'u-3',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  }
];

export const initialMediaAssets: MediaAsset[] = [
  {
    id: 'media-1',
    name: 'product_launch_hero.png',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    dimensions: '1920 x 1080',
    sizeBytes: 2450000,
    folder: 'Campaign Assets',
    tags: ['hero', 'product', 'saas'],
    createdAt: '2026-09-20'
  },
  {
    id: 'media-2',
    name: 'analytics_dashboard_preview.png',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    dimensions: '1440 x 900',
    sizeBytes: 1820000,
    folder: 'Screenshots',
    tags: ['analytics', 'ui', 'dashboard'],
    createdAt: '2026-09-19'
  },
  {
    id: 'media-3',
    name: 'team_creative_session.jpg',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    dimensions: '2048 x 1365',
    sizeBytes: 3100000,
    folder: 'Team Shoots',
    tags: ['office', 'team', 'creative'],
    createdAt: '2026-09-15'
  },
  {
    id: 'media-4',
    name: 'ux_guide_cover.jpg',
    url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    dimensions: '1080 x 1080',
    sizeBytes: 1200000,
    folder: 'Guides & Ebooks',
    tags: ['ux', 'guide', 'square'],
    createdAt: '2026-09-12'
  },
  {
    id: 'media-5',
    name: 'autumn_collection.jpg',
    url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    dimensions: '1080 x 1350',
    sizeBytes: 2150000,
    folder: 'Campaign Assets',
    tags: ['autumn', 'fashion', 'portrait'],
    createdAt: '2026-09-10'
  },
  {
    id: 'media-6',
    name: 'async_workflow_diagram.jpg',
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    dimensions: '1200 x 630',
    sizeBytes: 1400000,
    folder: 'Diagrams',
    tags: ['tech', 'diagram', 'landscape'],
    createdAt: '2026-09-08'
  }
];

export const initialInboxMessages: InboxMessage[] = [
  {
    id: 'inbox-1',
    platform: 'instagram',
    sender: {
      name: 'Elena Rostova',
      username: '@elena_design',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    content: 'Love the new Socially dashboard features! Does it support automated Reel scheduling?',
    timestamp: '12 mins ago',
    unread: true,
    thread: [
      { id: 'm-1', sender: 'customer', text: 'Hey there! Loving the new Socially post workflow.', time: '10:14 AM' },
      { id: 'm-2', sender: 'user', text: 'Hi Elena! Thanks so much. Yes, Instagram Reels & TikTok native scheduling are fully supported!', time: '10:18 AM' },
      { id: 'm-3', sender: 'customer', text: 'Awesome! Does it support custom thumbnail covers as well?', time: '10:22 AM' }
    ]
  },
  {
    id: 'inbox-2',
    platform: 'linkedin',
    sender: {
      name: 'David Vance',
      username: 'david-vance-marketing',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    content: 'Can we schedule a demo call for our 20-person agency team next Tuesday?',
    timestamp: '1 hour ago',
    unread: true,
    thread: [
      { id: 'm-4', sender: 'customer', text: 'Hi team, looking for enterprise pricing for our marketing agency.', time: '9:30 AM' }
    ]
  },
  {
    id: 'inbox-3',
    platform: 'facebook',
    sender: {
      name: 'TechDigest Magazine',
      username: 'techdigestpage',
      avatar: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=150&q=80'
    },
    content: 'We featured Socially in our top 10 SaaS marketing tools for 2026 article!',
    timestamp: '3 hours ago',
    unread: false,
    thread: [
      { id: 'm-5', sender: 'customer', text: 'Congrats on the launch! Check out our feature article.', time: '7:15 AM' },
      { id: 'm-6', sender: 'user', text: 'Thank you so much TechDigest team! Sharing with our network now.', time: '7:45 AM' }
    ]
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'u-1',
    name: 'Likitha Sri',
    email: 'likitha@acmebrand.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    role: 'owner',
    status: 'active',
    lastActive: 'Now'
  },
  {
    id: 'u-2',
    name: 'Alex Rivera',
    email: 'alex@acmebrand.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'editor',
    status: 'active',
    lastActive: '20 mins ago'
  },
  {
    id: 'u-3',
    name: 'Sarah Chen',
    email: 'sarah@acmebrand.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'approver',
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: 'u-4',
    name: 'Marcus Vance',
    email: 'marcus@acmebrand.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    role: 'viewer',
    status: 'invited',
    lastActive: 'Pending invite'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'success',
    title: 'Multi-Channel Post Published',
    message: 'Post "🚀 Exciting news!" was successfully published to IG, FB, LinkedIn & X.',
    timestamp: '10 mins ago',
    read: false
  },
  {
    id: 'notif-2',
    type: 'warning',
    title: 'LinkedIn Authorization Expiring',
    message: 'Acme Inc. LinkedIn access token expires in 3 days. Reconnect to avoid publishing interruption.',
    timestamp: '1 hour ago',
    read: false,
    actionUrl: 'social-accounts'
  },
  {
    id: 'notif-3',
    type: 'info',
    title: 'New Post Submitted for Review',
    message: 'Alex Rivera submitted "10 Essential UX Principles" for approval.',
    timestamp: '2 hours ago',
    read: true,
    actionUrl: 'team-approvals'
  },
  {
    id: 'notif-4',
    type: 'error',
    title: 'Publishing Failed on LinkedIn',
    message: 'Weekly Tech Insights post failed to publish on LinkedIn. Click to retry.',
    timestamp: 'Yesterday',
    read: true,
    actionUrl: 'published'
  }
];
