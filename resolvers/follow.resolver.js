import { AuthenticationError } from "apollo-server";

export default {
  Mutation: {
    toggleFollowing: async (parent, { forUserId }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      const exists = await models.Follow.findOne({
        where: { followed_id: forUserId, follower_id: user.id }
      });

      if (exists) {
        await models.Follow.destroy({
          where: { followed_id: forUserId, follower_id: user.id }
        });
      } else {
        await models.Follow.create({
          followed_id: forUserId,
          follower_id: user.id
        });
      }

      return models.User.findById(forUserId);
    }
  }
};
