import {
  ADD_NOTIFICATION_FAIL,
  ADD_NOTIFICATION_REQUEST,
  ADD_NOTIFICATION_RESET,
  ADD_NOTIFICATION_SUCCESS,
  ALL_NOTIFICATIONS_FAIL,
  ALL_NOTIFICATIONS_REQUEST,
  ALL_NOTIFICATIONS_SUCCESS,
  CLEAR_ERRORS,
} from "../../constants/notificationConstants";

// Push new notifcation
export const sendNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case ADD_NOTIFICATION_RESET:
      return {
        ...state,
        success: false,
        message: false,
      };

    case ADD_NOTIFICATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Get Latest 5 Notiification
export const allNotificationsReducer = (
  state = { notifications: [] },
  action
) => {
  switch (action.type) {
    case ALL_NOTIFICATIONS_REQUEST:
      return {
        loading: true,
      };

    case ALL_NOTIFICATIONS_SUCCESS:
      return {
        loading: false,
        notifications: action.payload.notifications,
        success: action.payload.success,
      };

    case ALL_NOTIFICATIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
