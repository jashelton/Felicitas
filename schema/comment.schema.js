export default `
  type Comment {
    id: Int!
    event_id: Int!
    user_id: Int!
    text: String
    created_at: Date
    updated_at: Date
    comment_user: User
  }

  type Query {
    eventComments(event_id: ID!): [Comment!]!
  }

  type Mutation {
    createComment(
      event_id: Int!
      user_id: Int!
      text: String!
    ): Comment
  }
`;
