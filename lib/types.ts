export interface MediaItem {
  id: string;
  category: 'travel' | 'music' | 'movie' | 'book' | 'food';
  title: string;
  subtitle?: string;
  imageUrl: string;
  description?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  coverImageUrl?: string;
  handwrittenNoteHeader?: string;
  handwrittenNoteFooter?: string;
  quoteBlock?: string;
  statusPill: string;
  location?: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
    twitter?: string;
    spotify?: string;
    website?: string;
  };
  hobbies: string[];
  personalityTraits: string[];
  lifestyleBadges: string[];
  favoriteQuotes: string[];
  likes: string[];
  dislikes: string[];
  travel: MediaItem[];
  music: MediaItem[];
  movies: MediaItem[];
  books?: MediaItem[];
  food?: MediaItem[];
}

export interface AboutSectionData {
  name: string;
  username: string;
  tagline?: string;
  bio?: string;
  location?: string;
  birthday?: string;
  pronouns?: string;
  profileImage?: string;
  coverImageUrl?: string;
  statusPill?: string;
  handwrittenHeader?: string;
  handwrittenFooter?: string;
  quoteBlock?: string;
}

export interface PersonalityProfileData {
  description?: string;
  personalityType?: string;
  traits: string[];
  values: string[];
}

export interface LifestyleProfileData {
  chronotype?: 'Morning Lark' | 'Night Owl' | 'Flexible' | string;
  socialEnergy?: 'Introvert' | 'Extrovert' | 'Ambivert' | string;
  freeTimeActivity?: string;
  weekendActivities?: string;
}

export interface HobbyItemData {
  id: string;
  name: string;
  icon?: string;
  category?: string;
  orderIndex: number;
}

export type FavoriteCategory = 'food' | 'music' | 'movie' | 'tvshow' | 'book' | 'game' | 'sport' | 'travel';

export interface FavoriteMediaItemData {
  id: string;
  category: FavoriteCategory;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  description?: string;
  orderIndex: number;
}

export type PreferenceType = 'like' | 'dislike' | 'enjoy' | 'avoid';

export interface PreferenceItemData {
  id: string;
  type: PreferenceType;
  label: string;
  orderIndex: number;
}

export interface QuoteItemData {
  id: string;
  content: string;
  author?: string;
  isFeatured: boolean;
  orderIndex: number;
}

export type SocialPlatform = 'instagram' | 'youtube' | 'twitter' | 'github' | 'website' | 'spotify' | 'linkedin' | 'other';

export interface SocialLinkItemData {
  id: string;
  platform: SocialPlatform;
  url: string;
  label?: string;
}

export type SectionKey = 'about' | 'personality' | 'hobbies' | 'favorites' | 'preferences' | 'lifestyle' | 'social' | 'quotes' | 'photos' | 'privacy';

export interface SectionSettingData {
  sectionKey: SectionKey;
  isVisible: boolean;
  orderIndex: number;
}

export interface FullUserProfileData {
  id: string;
  username: string;
  about: AboutSectionData;
  personality?: PersonalityProfileData;
  lifestyle?: LifestyleProfileData;
  hobbies: HobbyItemData[];
  favorites: FavoriteMediaItemData[];
  preferences: PreferenceItemData[];
  quotes: QuoteItemData[];
  socials: SocialLinkItemData[];
  sectionSettings: SectionSettingData[];
}
