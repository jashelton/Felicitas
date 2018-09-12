export default `
  scalar Date

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
    following: [User!]!
    followers_count: Int
    followers: [User!]!
    mutual_count: Int
  }

  type Follow {
    id: Int!
    followed_id: Int!
    follower_id: Int!
    created_at: Date!
    updated_at: Date!
  }

  type Like {
    id: Int!
    event_id: Int!
    liked_by_id: Int!
    created_at: Date!
    updated_at: Date!
  }

  type Rating {
    id: Int!
    user_id: Int!
    event_id: Int!
    value: Int
    created_at: Date!
    updated_at: Date!
  }

  type Query {
    allUsers: [User!]!
    getUser(id: ID!): User!
    userEvents(user_id: ID!): [Event!]!

    userFollowers(id: ID!): [User!]!
    userFollowing(id: ID!): [User!]!

    allEvents: [Event!]!
    getEvent(id: ID!): Event
    eventComments(event_id: ID!): [Comment!]!
    eventLikes(event_id: ID!): [User!]!
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
  }
`;
