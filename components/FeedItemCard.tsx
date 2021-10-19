import styled from 'styled-components'
import Link from 'next/link'
import { CalendarIcon } from '@primer/octicons-react'
import { FeedItem } from 'types/feed'
import { Icon } from './shared/Icon'

type Props = {
  feedItem: FeedItem;
};

export default function FeedItemCard({ feedItem }: Props) {
  const { entity_id: entityId, icon_url: iconUrl, body, title, type } = feedItem

  return (
    <FeedItemContainer>
      {iconUrl ? <Icon src={iconUrl} size={48}/> : <CalendarIcon size={48} />}

      <FeedItemContent>
        <FeedItemTitle>{title}</FeedItemTitle>
        <div>
          <div>{body}</div>
          {
            (type === 'user' || type === 'project') &&
            <div>
              <Link href={`/${type}s/${entityId}`}>Go to page</Link>
            </div>
          }
        </div>
      </FeedItemContent>
    </FeedItemContainer>
  )
}

const FeedItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #eaeaea;
  &:first-child {
    border-top: 1px solid #eaeaea;
  }
`

const FeedItemContent = styled.div`
  display: flex;
  flex-direction: column;
`

const FeedItemTitle = styled.span`
  font-weight: bold;
`
