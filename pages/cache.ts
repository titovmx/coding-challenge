import { InMemoryCache } from '@apollo/client'
import { FeedItemRow, FeedResult } from 'graphql/db'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: ['fellowship'],
          merge(existing: FeedResult, incoming: FeedResult) {
            let items: FeedItemRow[] = []
            if (existing) {
              items = [...existing.items]
            }
            if (incoming) {
              items = [...items, ...incoming.items]
            }
            console.log('Merge')
            console.log({...existing, items, cursor: incoming.cursor})
            return {...incoming, items}
          },
        }
      }
    }
  }
})