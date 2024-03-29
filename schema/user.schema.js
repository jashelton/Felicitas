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
    name: String!
  }

  type Query {
    allUsers(name: String): [User!]!
    getUser(id: ID!): User!
    facebookUser(facebook_id: ID!): User
    userEvents(user_id: ID!): [Event!]!
    userFollowers(id: ID!): [User!]!
    userFollowing(id: ID!): [User!]!
    userMutual(id: ID!): [User!]!
  }

  type Mutation {
    createUser(first_name: String, last_name: String, facebook_id: ID!): User!
    updateUser(first_name: String, last_name: String, profile_image: String): User!
    setPushToken(push_token: String!): User!
    deleteUser(id: Int!): Int!
  }
`;
