import db, { FeedItemRow, FeedResult } from 'graphql/db'
import { paginate } from 'graphql/utils'
import { Fellowship } from 'types/shared'

type Args = {
  fellowship: Fellowship;
  cursor: string;
  pageSize: number;
};

export default async function feed(parent: unknown, { fellowship, cursor, pageSize = 20 }: Args): Promise<FeedResult> {
  const criteriaList = getCriteriaList(fellowship)
  const combinedQuery = criteriaList.join('\nUNION\n')
  const feedItems: FeedItemRow[] = await db.getAll(
    `
      SELECT * FROM (
        ${combinedQuery}
      )
      ORDER BY datetime(created_ts) DESC
    `,
    [fellowship],
  )

  const paginatedResults = paginate(cursor, pageSize, feedItems, getCursor)
  const currentCursor = getCursor(paginatedResults[paginatedResults.length - 1])
  const lastCursor = getCursor(feedItems[feedItems.length - 1])

  return {
    items: paginatedResults,
    cursor: getCursor(paginatedResults[paginatedResults.length - 1]),
    hasMore: paginatedResults.length > 0 ? currentCursor !== lastCursor : false
  }
}

function getCriteriaList(fellowship: Fellowship | null): string[] {
  switch (fellowship) {
    case 'angels':
    case 'founders':
      return [announcementCriteria, foundersCriteria, angelsCriteria, projectsCriteria]
    case 'writers':
      return [announcementCriteria, writersCriteria]
    default:
      return [announcementCriteria]
  }
}

function getCursor(item: FeedItemRow): string {
  return `${item.type}_${item.entity_id}`
}

const announcementCriteria = 
`
  SELECT id as entity_id, '' as icon_url, title, body, created_ts, 'announcement' as type
  FROM announcements 
  WHERE fellowship = ? OR fellowship = "all"
`

const projectsCriteria = 
`
  SELECT id as entity_id, icon_url, "New project " || name || " started!🚀" as title, description as body, created_ts,
    'project' as type
  FROM projects
`

const angelsCriteria =
`
  SELECT id as entity_id, avatar_url as icon_url, "New angel " || name || " joined!😇" as title, bio as body, created_ts,
    'user' as type
  FROM users
  WHERE fellowship = "angels"
`

const foundersCriteria =
`
  SELECT id as entity_id, avatar_url as icon_url, "New founder " || name || " joined!😎" as title, bio as body, created_ts,
    'user' as type
  FROM users
  WHERE fellowship = "founders"
`

const writersCriteria = 
`
  SELECT id as entity_id, avatar_url as icon_url, "New writer " || name || " joined!✍️" as title, bio as body, created_ts,
    'user' as type
  FROM users
  WHERE fellowship = "writers"
`