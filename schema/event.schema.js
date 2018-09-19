export default `
  type Event {
    id: Int!
    user_id: Int!
    event_type: EventType
    description: String
    privacy: Privacy
    coordinate: Coordinate
    title: String
    image: String
    city: String
    country_code: String
    region: String
    created_at: Date!
    updated_at: Date!
    user: User!
    comments_count: Int
    comments: [Comment!]!
    likes_count: Int!
    avg_rating: Float
    current_user_rating: Int
  }

  type Coordinate {
    latitude: Float
    longitude: Float
  }

  enum Privacy {
    public
    private
  }

  enum EventType {
    moment
    vibe
  }

  type Query {
    allEvents(offset: Int, event_type: String, user_id: Int): [Event!]!
    getEvent(id: ID!): Event
  }

  type Mutation {
    deleteEvent(id: ID!): Boolean!
    createVibe(description: String!): Event!
    createMoment(
      description: String!
      latitude: Float!
      longitude: Float!
      title: String
      image: String!
      city: String!
      country_code: String!
      region: String!): Event!
  }
`;
