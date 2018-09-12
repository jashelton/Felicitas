export default {
  User: {
    events: ({ id }, args, { models }) =>
      models.Event.findAll({
        where: { user_id: id }
      }),
    following_count: ({ id }, args, { models }) =>
      models.Follow.count({
        where: { follower_id: id }
      }),
    following: async ({ id }, args, { models }) => {
      const followingQuery = await models.sequelize.query(
        `
          select * from follows F
          join users U on U.id = F.followed_id
          where F.follower_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );

      return followingQuery;
    },
    followers_count: ({ id }, args, { models }) =>
      models.Follow.count({
        where: { followed_id: id }
      }),
    followers: async ({ id }, args, { models }) => {
      const followersQuery = await models.sequelize.query(
        `
          select * from follows F
          join users U on U.id = F.follower_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );

      return followersQuery;
    },
    mutual_count: async ({ id }, args, { models }) => {
      const mutualQuery = await models.sequelize.query(
        `
          select count(F.id) as mutual from follows F
          join follows F2 on F.follower_id = F2.followed_id and F.followed_id = F2.follower_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );

      return mutualQuery[0].mutual;
    }
  },
  Event: {
    user: ({ user_id }, args, { models }) =>
      models.User.findOne({
        where: { id: user_id }
      }),
    comments: ({ id }, args, { models }) =>
      models.Comment.findAll({
        where: { event_id: id }
      }),
    comments_count: ({ id }, args, { models }) =>
      models.Comment.count({
        where: { event_id: id }
      })
  },
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({
        where: { id }
      }),
    userEvents: (parent, { user_id }, { models }) =>
      models.Event.findAll({
        where: { user_id }
      }),
    userFollowers: async (parent, { id }, { models }) => {
      const followersQuery = await models.sequelize.query(
        `
          select * from follows F
          join users U on U.id = F.follower_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );

      return followersQuery;
    },
    userFollowing: async (parent, { id }, { models }) => {
      const followingQuery = await models.sequelize.query(
        `
          select * from follows F
          join users U on U.id = F.followed_id
          where F.follower_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );

      return followingQuery;
    },
    allEvents: (parent, args, { models }) => models.Event.findAll(),
    getEvent: (parent, { id }, { models }) =>
      models.Event.findOne({ where: { id } }),

    eventComments: (parent, { event_id }, { models }) =>
      models.Comment.findAll({ where: { event_id } })
  },
  Mutation: {
    createUser: (parent, args, { models }) => models.User.create(args),
    updateUser: (parent, { username, newUsername }, { models }) =>
      models.User.update({ username: newUsername }, { where: { username } }),
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args }),

    createComment: (parent, args, { models }) => models.Comment.create(args)
  }
};
