export type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: ProjectParticipant[];
}

export type ProjectParticipant = Pick<User, 'id' | 'name' | 'avatar_url'>

export type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: Fellowship;
  avatar_url: string;
  projects: UserProject[];
}

export type UserProject = Pick<Project, 'id' | 'name' | 'icon_url'>

export const FELLOWSHIP_VALUES = ['founders', 'angels', 'writers'] as const

export type Fellowship = (typeof FELLOWSHIP_VALUES)[number]

export const FEED_ITEM_TYPE_VALUES = ['announcement', 'user', 'project'] as const

export type FeedItemType = (typeof FEED_ITEM_TYPE_VALUES)[number]