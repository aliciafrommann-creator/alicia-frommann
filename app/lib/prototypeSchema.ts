export type PrototypeTable =
  | 'profiles'
  | 'missions'
  | 'mission_completions'
  | 'teams'
  | 'communities'
  | 'community_events'
  | 'feed_posts'
  | 'saved_activities'
  | 'rewards'
  | 'redemptions'

export type PrototypeRecord = {
  id: string
  created_at: string
}

export type MissionRecord = PrototypeRecord & {
  title: string
  description: string
  category: string
  duration: string
  visibility: 'private' | 'friends' | 'team' | 'community' | 'public'
}

export type CommunityEventRecord = PrototypeRecord & {
  title: string
  community_id: string
  district: string
  starts_at: string
  privacy_note: string
}

export type RewardRecord = PrototypeRecord & {
  title: string
  partner_name: string
  state: 'locked' | 'unlocked' | 'qr_ready' | 'redeemed'
  valid_until: string
}

// Supabase-ready future tables only. The current website prototype uses local React state/localStorage.
