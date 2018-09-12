export default `

  scalar Date

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
    created_at: Date!
    user: User!
    comments: [Comment!]!
  }

  enum Privacy {
    public
    private
  }

  enum EventType {
    moment
    vibe
  }

  type Comment {
    id: Int!
    event_id: Int!
    user_id: Int!
    text: String!
    created_at: Date!
    updated_at: Date!
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
    created_at: Date!
    events: [Event!]!
    following_count: Int
    followers_count: Int
  }

  type Follow {
    id: Int!
    followed_id: Int!
    follower_id: Int!
    created_at: Date!
    updated_at: Date!
  }

  type Query {
    allUsers: [User!]!
    getUser(id: ID!): User!
    userEvents(user_id: ID!): [Event!]!

    allEvents: [Event!]!
    getEvent(id: ID!): Event
    eventComments(event_id: ID!): [Comment!]!

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
      facebook_id: Int
    ): User
    updateUser(username: String!, newUsername: String!): [Int!]!
    deleteUser(id: Int!): Int!

    createComment(
      event_id: Int!
      user_id: Int!
      text: String!
    ): Comment

    createBoard(owner: Int!, name: String): Board!
    createSuggestion(creatorId: Int!, text: String, boardId: Int!): Suggestion!
  }
`;
