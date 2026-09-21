import React from 'react';
import { PlatformId } from '../../types';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Video, 
  Pin 
} from 'lucide-react';

interface BrandLogoProps {
  collapsed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false, size = 'md', className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Pink-purple abstract social node icon */}
      <div className={`${iconSizes[size]} rounded-xl gradient-btn flex items-center justify-center shadow-pink-md relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </div>
      
      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span className={`${textSizes[size]} font-extrabold tracking-tight text-zinc-900 flex items-center gap-1`}>
            Socially
            <span className="w-2 h-2 rounded-full bg-[#E85AAD] inline-block animate-pulse" />
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
            Management Studio
          </span>
        </div>
      )}
    </div>
  );
};

export const platformMeta: Record<PlatformId, { name: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  instagram: {
    name: 'Instagram',
    color: '#E4405F',
    bgColor: '#FCE7F3',
    icon: <Instagram className="w-4 h-4 text-[#E4405F]" />
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    bgColor: '#EFF6FF',
    icon: <Facebook className="w-4 h-4 text-[#1877F2]" />
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0A66C2',
    bgColor: '#E0F2FE',
    icon: <Linkedin className="w-4 h-4 text-[#0A66C2]" />
  },
  twitter: {
    name: 'X (Twitter)',
    color: '#000000',
    bgColor: '#F4F4F5',
    icon: <Twitter className="w-4 h-4 text-zinc-900" />
  },
  tiktok: {
    name: 'TikTok',
    color: '#000000',
    bgColor: '#F4F4F5',
    icon: <Video className="w-4 h-4 text-zinc-900" />
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0000',
    bgColor: '#FEE2E2',
    icon: <Youtube className="w-4 h-4 text-[#FF0000]" />
  },
  pinterest: {
    name: 'Pinterest',
    color: '#E60023',
    bgColor: '#FFE4E6',
    icon: <Pin className="w-4 h-4 text-[#E60023]" />
  }
};

export const PlatformBadge: React.FC<{ platform: PlatformId; showName?: boolean; size?: 'sm' | 'md' }> = ({ 
  platform, 
  showName = true,
  size = 'md' 
}) => {
  const meta = platformMeta[platform];
  if (!meta) return null;

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border border-pinkborder transition-transform hover:scale-105 ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
      style={{ backgroundColor: meta.bgColor }}
    >
      {meta.icon}
      {showName && <span className="text-zinc-800 font-semibold">{meta.name}</span>}
    </span>
  );
};
