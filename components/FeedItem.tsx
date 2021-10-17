import React from 'react';
import styled from 'styled-components';
import { ProjectIcon } from '@primer/octicons-react';

export default function FeedItem() {
  return (
    <FeedItemContainer>
      <ProjectIcon size={64} />

      <FeedItemContent>
        <FeedItemTitle>Title</FeedItemTitle>
        <div>Long Content lorem apsum tututu gdeto v strannom meste chtoto proiozshlo hey hey how long how long halooong</div>
      </FeedItemContent>
    </FeedItemContainer>
  );
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
`;

const FeedItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeedItemTitle = styled.span`
  font-weight: bold;
`
