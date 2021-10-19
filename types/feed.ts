import { FeedItemType } from './shared'

export type FeedItem = {
  entity_id: number;
  icon_url: string;
  title: string;
  body: string;
  created_ts: string;
  type: FeedItemType;
}