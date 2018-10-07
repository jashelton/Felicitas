import jwt from "jsonwebtoken";
require("dotenv").config();

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
      return await models.sequelize.query(
        `
          select * from Follows F
          join Users U on U.id = F.followed_id
          where F.follower_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    },
    followers_count: ({ id }, args, { models }) =>
      models.Follow.count({
        where: { followed_id: id }
      }),
    followers: async ({ id }, args, { models }) => {
      return await models.sequelize.query(
        `
          select * from Follows F
          join Users U on U.id = F.follower_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    },
    mutual_count: async ({ id }, args, { models }) => {
      const mutualQuery = await models.sequelize.query(
        `
          select count(F.id) as mutual from Follows F
          join Follows F2 on F.follower_id = F2.followed_id and F.followed_id = F2.follower_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );

      return mutualQuery[0].mutual;
    },
    mutual: async ({ id }, args, { models }) => {
      return models.sequelize.query(
        `
          select U.* from Follows F
          join Follows F2 on F.follower_id = F2.followed_id and F.followed_id = F2.follower_id
          join Users U on U.id = F2.followed_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    },
    isFollowing: ({ id }, args, { models, user }) => {
      return models.Follow.findOne({
        where: { follower_id: user.id, followed_id: id }
      });
    }
  },
  Query: {
    allUsers: (parent, { name }, { models }) => {
      return models.sequelize.query(
        `
          select *
          from Users
          where concat(first_name, ' ', last_name) rlike '${name}';
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    },
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    facebookUser: async (parent, { facebook_id }, { models }) => {
      const user = await models.User.findOne({
        where: { facebook_id }
      });

      if (user) {
        const token = jwt.sign(
          {
            id: user.dataValues.id,
            fb_id: user.dataValues.facebook_id
          },
          process.env.JWT_SECRET
        );

        user.dataValues.jwt = token;
        return user.dataValues;
      }
      return null;
    },
    userEvents: (parent, { user_id }, { models }) =>
      models.Event.findAll({
        where: { user_id },
        raw: true
      }),
    userFollowers: (parent, { id }, { models }) => {
      return models.sequelize.query(
        `
          select * from Follows F
          join Users U on U.id = F.follower_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    },
    userFollowing: (parent, { id }, { models }) => {
      return models.sequelize.query(
        `
          select * from Follows F
          join Users U on U.id = F.followed_id
          where F.follower_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    },
    userMutual: (parent, { id }, { models, user }) => {
      return models.sequelize.query(
        `
          select U.* from Follows F
          join Follows F2 on F.follower_id = F2.followed_id and F.followed_id = F2.follower_id
          join Users U on U.id = F2.followed_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    }
  },
  Mutation: {
    createUser: async (parent, args, { models }) =>
      models.User.create({ ...args }),
    updateUser: async (parent, args, { models, user }) => {
      await models.User.update({ ...args }, { where: { id: user.id } });
      return models.User.findById(user.id);
    },
    setPushToken: async (parent, { push_token }, { models, user }) => {
      await models.User.update({ push_token }, { where: { id: user.id } });
      return models.User.findById(user.id);
    },
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args })
  }
};
