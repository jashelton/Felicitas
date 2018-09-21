export default `
  type Report {
    id: Int!
    event_id: Int!
    user_id: Int!
    reason: Reason!
    created_at: Date!
    updated_at: Date!
  }

  enum Reason {
    spam
    inappropriate
  }

  type Mutation {
    reportEvent(event_id: ID!, reason: String!): Event!
  }
`;
