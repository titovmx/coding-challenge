import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type FeedItem {
    entity_id: Int!
    icon_url: String
    title: String!
    body: String!
    created_ts: String!
    type: String!
  }

  type Feed {
    items: [FeedItem]!
    cursor: String!
    hasMore: Boolean!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    feed(
      fellowship: String!
      pageSize: Int!
      cursor: String!
    ): Feed!
  }
`

export const server = new ApolloServer({typeDefs, resolvers})
