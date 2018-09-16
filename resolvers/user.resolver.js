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
          select * from follows F
          join users U on U.id = F.followed_id
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
          select * from follows F
          join users U on U.id = F.follower_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
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
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    facebookUser: async (parent, { id }, { models }) => {
      const { dataValues } = await models.User.findOne({
        where: { facebook_id: id }
      });

      if (dataValues) {
        const token = jwt.sign(
          {
            id: dataValues.id,
            fb_id: dataValues.facebook_id
          },
          process.env.JWT_SECRET
        );

        dataValues.jwt = token;
        return dataValues;
      }
      return { message: "There is no user." };
    },
    userEvents: (parent, { user_id }, { models }) =>
      models.Event.findAll({
        where: { user_id },
        raw: true
      }),
    userFollowers: async (parent, { id }, { models }) => {
      return await models.sequelize.query(
        `
          select * from follows F
          join users U on U.id = F.follower_id
          where F.followed_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    },
    userFollowing: async (parent, { id }, { models }) => {
      return await models.sequelize.query(
        `
          select * from follows F
          join users U on U.id = F.followed_id
          where F.follower_id = ${id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    }
  },
  Mutation: {
    createUser: (parent, args, { models }) => models.User.create(args),
    updateUser: (parent, { username, newUsername }, { models }) =>
      models.User.update({ username: newUsername }, { where: { username } }),
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args })
  }
};
