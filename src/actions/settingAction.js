import axios from "axios";
import { GET_SETTINGS, SETTINGS_FAIL } from "./types";
import { setAlert } from "./alertAction";

const PROXY = process.env.REACT_APP_URL + "api/";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
// Get Setting
export const getSetting = () => async (dispatch) => {
  try {
    const res = await axios.get(`${PROXY}settings/get`);
    dispatch({
      type: GET_SETTINGS,
      payload: res.data.result,
    });
    return res.data.result;
  } catch (err) {
    dispatch({
      type: SETTINGS_FAIL,
    });
  }
};

// edit Setting
export const addSetting = (data) => async (dispatch) => {
  const body = JSON.stringify(data);
  try {
    const res = await axios.put(`${PROXY}settings/update`, body, config);
    dispatch(setAlert(res.data.message, "success"));
    return res.data;
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: SETTINGS_FAIL,
    });
  }
};
