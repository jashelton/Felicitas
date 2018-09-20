export default `
  type Rating {
    id: Int!
    user_id: Int!
    event_id: Int!
    value: Int
    created_at: Date!
    updated_at: Date!
  }

  type Mutation {
    rateEvent(event_id: ID!, value: Int!): Event!
  }
`;
