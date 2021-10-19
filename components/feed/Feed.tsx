import styled from 'styled-components'
import { FeedItem } from 'types/feed'
import FeedItemCard from './FeedItemCard'

type Props = {
  items: FeedItem[];
};

export default function Feed({ items }: Props) {
  return (
    <FeedContainer>
      {items.map((item) => (
        <FeedItemCard key={`${item.entity_id}_${item.type}`} feedItem={item}/>
      ))}
    </FeedContainer>
  )
}

const FeedContainer = styled.div``
