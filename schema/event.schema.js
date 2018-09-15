export default `
  type Event {
    id: Int!
    user_id: Int!
    event_type: EventType
    description: String
    active: Boolean
    privacy: Privacy
    latitude: Float
    longitude: Float
    title: String
    image: String
    city: String
    country_code: String
    region: String
    created_at: Date!
    user: User!
    comments_count: Int
    comments: [Comment!]!
    likes_count: Int!
    avg_rating: Float
    current_user_rating: Int
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
    allEvents(offset: Int!): [Event!]!
    getEvent(id: ID!): Event
  }
`;
