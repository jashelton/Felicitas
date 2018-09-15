export default {
  Comment: {
    comment_user: ({ user_id }, args, { models }) =>
      models.User.findById(user_id)
  },
  Mutation: {
    createComment: (parent, args, { models }) => models.Comment.create(args)
  }
};
