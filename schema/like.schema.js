export default `
  type Like {
    id: Int!
    event_id: Int!
    liked_by_id: Int!
    created_at: Date!
    updated_at: Date!
  }

  type Query {
    eventLikes(event_id: ID!): [User!]!
  }

  type Mutation {
    createLike(event_id: ID!): Boolean!
    deleteLike(event_id: ID!): Boolean!
  }
`;
