export const FELLOWSHIP_VALUES = ['founders', 'angels', 'writers'] as const

export type Fellowship = (typeof FELLOWSHIP_VALUES)[number]

export const FEED_ITEM_TYPE_VALUES = ['announcement', 'user', 'project'] as const

export type FeedItemType = (typeof FEED_ITEM_TYPE_VALUES)[number]