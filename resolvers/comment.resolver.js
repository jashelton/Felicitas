export default {
  Comment: {
    comment_user: ({ user_id }, args, { models }) => {
      return models.User.findById(user_id);
    },
    owner: async ({ event_id }, args, { models }) => {
      const { user_id } = await models.Event.findById(event_id);
      return models.User.findById(user_id);
    }
  },
  Mutation: {
    createComment: (parent, { event_id, text }, { models, user }) => {
      return models.Comment.create({ event_id, text, user_id: user.id });
    }
  }
};
