import React from 'react';
import styled from 'styled-components';
import FeedItem from './FeedItem';

export default function Feed() {
  return (
    <FeedContainer>
      <FeedItem/>
      <FeedItem/>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  margin: 16px 0;
`;
