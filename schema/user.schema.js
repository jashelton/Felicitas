export default `
  type User {
    id: Int!
    first_name: String
    last_name: String
    email: String
    username: String
    push_token: String
    profile_image: String
    facebook_id: String!
    created_at: Date!
    updated_at: Date!
    events: [Event!]!
    following_count: Int
    following: [User]
    followers_count: Int
    followers: [User]
    mutual_count: Int
    mutual: [User]
    isFollowing: Boolean
    jwt: String!
  }

  type Query {
    allUsers(name: String): [User!]!
    getUser(id: ID!): User!
    facebookUser(id: ID!): User!
    userEvents(user_id: ID!): [Event!]!
    userFollowers(id: ID!): [User!]!
    userFollowing(id: ID!): [User!]!
    userMutual(id: ID!): [User!]!
  }

  type Mutation {
    createUser(
      first_name: String,
      last_name: String,
      email: String,
      username: String,
      push_token: String,
      profile_image: String,
      facebook_id: String!
    ): User
    updateUser(username: String!, newUsername: String!): [Int!]!
    deleteUser(id: Int!): Int!
  }
`;
