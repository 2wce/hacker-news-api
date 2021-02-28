import { gql } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = gql`
  type User {
    email: String!
    id: ID!
    name: String
    posts: [Post!]!
  }

  type Post {
    by: String
    title: String
    text: String
    score: String
  }

  type Query {
    me: User
    feed: [Post!]!
    post(storyId: String!): Post
  }
`

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
