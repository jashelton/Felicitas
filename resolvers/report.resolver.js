import { AuthenticationError } from "apollo-server";

export default {
  Mutation: {
    reportEvent: async (parent, { event_id, reason }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      const exists = await models.Report.findOne({
        where: { event_id, user_id: user.id }
      });

      if (exists) return;

      await models.Report.create({ event_id, reason, user_id: user.id });

      return models.Event.findById(event_id);
    }
  }
};
