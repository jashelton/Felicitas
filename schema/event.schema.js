export default `
  type Event {
    id: Int!
    user_id: Int!
    event_type: EventType
    description: String
    has_randomized_location: Boolean
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
    has_liked: Boolean
    avg_rating: Float
    ratings_count: Int
    current_user_rating: Int
    Images: [Image]
  }

  type Coordinate {
    latitude: Float
    longitude: Float
  }

  type Image {
    id: Int
    user_id: Int
    event_id: Int
    image: String
    longitude: Float
    latitude: Float
  }

  input ImageInput {
    image: String
    longitude: Float
    latitude: Float
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
    allEvents(
      offset: Int
      event_type: String
      user_id: Int
      display_on_map: Boolean
      has_randomized_location: Boolean
      rating_threshold: Float
      following: Boolean
    ): [Event!]!
    getEvent(id: ID!): Event
  }

  type Mutation {
    deleteEvent(id: ID!): Boolean!
    createVibe(description: String!): Event!
    createMoment(
      description: String!
      display_on_map: Boolean
      has_randomized_location: Boolean
      latitude: Float!
      longitude: Float!
      title: String
      image: String
      images: [ImageInput]
      city: String!
      country_code: String!
      region: String!): Event!
  }
`;
