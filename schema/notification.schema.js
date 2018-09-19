export default `
  type Notification {
    id: Int
    event_id: Int
    action_type: ActionType
    action_by_user_id: Int
    action_for_user_id: Int
    state: State
    created_at: Date
    updated_at: Date
    event: Event!
  }

  enum ActionType {
    like
    comment
  }

  enum State {
    viewed
    new
  }

  type Query {
    userNotifications(offset: Int): [Notification!]!
  }
`;
