import axios from "axios";
import { COMMUNITY_FORUM } from "./types";
const PROXY = process.env.REACT_APP_URL + "api/";

//user detail api
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const getCommunityForum = (page, limit, search) => async (dispatch) => {
  const res = await axios.get(
    PROXY +
      "community/forum?page=" +
      page +
      "&limit=" +
      limit +
      "&search=" +
      search
  );
  dispatch({
    type: COMMUNITY_FORUM,
    payload: res.data.result,
  });
};

export const addCommunityForum = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "community/forum", formData);
  return res;
};

export const updateCommunityForum = (id, details) => async (dispatch) => {
  const body = JSON.stringify(details);
  const res = await axios.put(PROXY + "community/forum/" + id, body, config);
  return res;
};

export const deleteCommunityForum = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "community/forum/" + id);
  return res;
};

export const getUserDropDown = () => async (dispatch) => {
  const res = await axios.get(PROXY + "general/user");
  return res;
};
