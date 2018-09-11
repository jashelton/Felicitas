export default `

  type Suggestion {
    id: Int!
    text: String!
    creator: User!
  }

  type Board {
    id: Int!
    name: String!
    suggestions: [Suggestion!]!
    owner: Int!
  }

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
    created_at: String!
    user: User!
  }

  enum Privacy {
    public
    private
  }

  enum EventType {
    moment
    vibe
  }

  type User {
    id: Int!
    first_name: String
    last_name: String
    email: String
    username: String
    push_token: String
    profile_image: String
    facebook_id: Int
    created_at: String
    events: [Event!]!
  }

  type Query {
    allUsers: [User!]!
    getUser(id: ID!): User
    userEvents(user_id: ID!): [Event!]!
    allEvents: [Event!]!
    getEvent(id: ID!): Event

    userBoards(owner: String!): [Board!]!
    userSuggestions(creatorId: String!): [Suggestion!]!
  }

  type Mutation {
    createUser(
      first_name: String,
      last_name: String,
      email: String,
      username: String,
      push_token: String,
      profile_image: String,
      facebook_id: Int,
      created_at: String,
    ): User
    updateUser(username: String!, newUsername: String!): [Int!]!
    deleteUser(id: Int!): Int!
    createBoard(owner: Int!, name: String): Board!
    createSuggestion(creatorId: Int!, text: String, boardId: Int!): Suggestion!
  }
`;
