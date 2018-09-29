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
    toggleLike(event_id: ID!, action_for_user_id: ID!): Event!
  }
`;
