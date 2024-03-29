export default `
  type Comment {
    id: Int!
    event_id: Int!
    user_id: Int!
    text: String
    created_at: Date
    updated_at: Date
    comment_user: User
    owner: User
  }

  type Query {
    eventComments(event_id: ID!): [Comment!]!
  }

  type Mutation {
    createComment(
      event_id: ID!
      text: String!
      action_for_user_id: ID!
    ): Comment
  }
`;
