import {
  ADD_NOTIFICATION_FAIL,
  ADD_NOTIFICATION_REQUEST,
  ADD_NOTIFICATION_SUCCESS,
  ALL_NOTIFICATIONS_FAIL,
  ALL_NOTIFICATIONS_REQUEST,
  ALL_NOTIFICATIONS_SUCCESS,
  CLEAR_ERRORS,
} from "../../constants/notificationConstants";
import axios from "../../axios";

// Add Notification --Admin
export const sendNotification = (notification) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NOTIFICATION_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/admin/send-notification`,
      notification,
      config
    );

    dispatch({ type: ADD_NOTIFICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_NOTIFICATION_FAIL,
      payload: error.response.data,
    });
  }
};

// GET latest 5 Notifications --Admin
export const getAllNotifications = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_NOTIFICATIONS_REQUEST });

    const { data } = await axios.get(`/admin/notifications`);

    dispatch({ type: ALL_NOTIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_NOTIFICATIONS_FAIL,
      payload: error.response.data,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
