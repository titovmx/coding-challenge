import { useQuery, gql } from '@apollo/client'
import Layout from 'components/Layout'
import InlineSelect, { Option } from 'components/InlineSelect'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Feed from '@/components/feed/Feed'
import { FELLOWSHIP_VALUES } from 'types/shared'
import { FeedItem } from 'types/feed'
import styled from 'styled-components'

const MIN_FEED_ITEM_HEIGHT = 65

const FEED_QUERY = gql`
  query feed(
      $fellowship: String!
      $cursor: String!
      $pageSize: Int!
    ) {
    feed(fellowship: $fellowship, cursor: $cursor, pageSize: $pageSize) {
      items {
        entity_id,
        title,
        body,
        icon_url,
        type,
      },
      cursor,
      hasMore
    }
  }
`

type QueryData = {
  feed: {
    items: FeedItem[];
    cursor: string;
    hasMore: boolean;
  }
};

type QueryVars = {
  fellowship: string;
  pageSize: number;
  cursor: string;
};

export default function Home() {
  const [selectedFellowship, setSelectedFellowship] = useState('')
  const [pageSize, setPageSize] = useState(20)
  const loader = useRef(null)

  const { data, error, loading, fetchMore } = useQuery<QueryData, QueryVars>(FEED_QUERY, {
    skip: !selectedFellowship,
    variables: { fellowship: selectedFellowship, pageSize, cursor: '' },
  })

  useEffect(() => {
    function handleResize() {
      const pageSize = Math.ceil(window.innerHeight / MIN_FEED_ITEM_HEIGHT)
      setPageSize(pageSize)
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleObserver = useCallback(async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting && data && data.feed.hasMore) {
      await fetchMore({variables: { fellowship: selectedFellowship, pageSize, cursor: data.feed.cursor }})
    }
  }, [data])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    }

    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current)
      }
    }
  }, [handleObserver])

  return (
    <Layout>
      <InlineSelect
        label="Choose a fellowship"
        onSelectedChange={(option) => {
          setSelectedFellowship(option)
        }}
      >
        {FELLOWSHIP_VALUES.map((fellowship) => (
          <Option key={fellowship} value={fellowship} isSelected={selectedFellowship === fellowship}></Option>
        ))}
      </InlineSelect>

      <ScrollableContainer>
        {error ? <h3>Something went wrong</h3> : !loading && data && data.feed.items && <Feed items={data.feed.items} />}

        <div ref={loader} />

        {loading && <h3>Loading...</h3>}
      </ScrollableContainer>
    </Layout>
  )
}

const ScrollableContainer = styled.div`
  margin: 16px 0;
  overflow-y: scroll;
`