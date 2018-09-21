export default {
  Mutation: {
    reportEvent: async (parent, { event_id, reason }, { models, user }) => {
      const exists = await models.Report.findOne({
        where: { event_id, user_id: user.id }
      });

      if (exists) return;

      await models.Report.create({ event_id, reason, user_id: user.id });

      return models.Event.findById(event_id);
    }
  }
};
