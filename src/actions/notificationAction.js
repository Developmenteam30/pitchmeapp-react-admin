import axios from "axios";
import { GET_NOTIFICATION_LIST } from "./types";
const PROXY = process.env.REACT_APP_URL + "api/";

export const getNotifications = () => async (dispatch) => {
  const res = await axios.get(PROXY + "notification/get");
  dispatch({
    type: GET_NOTIFICATION_LIST,
    payload: res.data.result,
  });
};

export const readNotifications = (id) => async (dispatch) => {
  const res = await axios.put(PROXY + "notification/read" + id);
  return res;
};

export const deleteNotification = (id) => async (dispatch) => {
  return await axios.delete(PROXY + "notification/delete" + id);
};
