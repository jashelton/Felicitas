export default {
  // User: {
  //   boards: ({ id }, args, { models }) =>
  //     models.Board.findAll({
  //       where: {
  //         owner: id
  //       }
  //     }),
  //   suggestions: ({ id }, args, { models }) =>
  //     models.Suggestion.findAll({
  //       where: {
  //         creatorId: id
  //       }
  //     })
  // },
  // Board: {
  //   suggestions: ({ id }, args, { models }) =>
  //     models.Suggestion.findAll({
  //       where: {
  //         boardId: id
  //       }
  //     })
  // },
  // Suggestion: {
  //   creator: ({ creatorId }, args, { models }) =>
  //     models.User.findOne({
  //       where: {
  //         id: creatorId
  //       }
  //     })
  // },

  User: {
    events: ({ id }, args, { models }) =>
      models.Event.findAll({
        where: {
          user_id: id
        }
      })
  },
  Event: {
    user: ({ user_id }, args, { models }) =>
      models.User.findOne({
        where: {
          id: user_id
        }
      }),
    comments: ({ id }, args, { models }) =>
      models.Comment.findAll({
        where: {
          event_id: id
        }
      })
  },
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({
        where: {
          id
        }
      }),
    userEvents: (parent, { user_id }, { models }) =>
      models.Event.findAll({
        where: {
          user_id
        }
      }),
    allEvents: (parent, args, { models }) => models.Event.findAll(),
    getEvent: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),

    eventComments: (parent, { event_id }, { models }) =>
      models.Comment.findAll({ where: { event_id } })
    // userBoards: (parent, { owner }, { models }) =>
    //   models.Board.findAll({
    //     where: {
    //       owner,
    //     },
    //   }),
    // userSuggestions: (parent, { creatorId }, { models }) =>
    //   models.Suggestion.findAll({
    //     where: {
    //       creatorId,
    //     },
    //   }),
  },

  Mutation: {
    createUser: (parent, args, { models }) => models.User.create(args),
    updateUser: (parent, { username, newUsername }, { models }) =>
      models.User.update({ username: newUsername }, { where: { username } }),
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args }),
    createBoard: (parent, args, { models }) => models.Board.create(args),
    createSuggestion: (parent, args, { models }) =>
      models.Suggestion.create(args)
  }
};
