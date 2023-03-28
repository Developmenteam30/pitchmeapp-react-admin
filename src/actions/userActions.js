import axios from "axios";
import {
  USER_DETAILS,
  USER_LIST,
  USER_POST,
  USER_INDUSTRY,
  USER_BLOG,
  USER_EV_JOURNEY,
  USER_CAR_REVIEW,
  USER_OWNED_VEHICALS,
  GET_ALL_USERS,
  USER_SERVICES,
  USER_SALESPITCH
} from "./types";
const PROXY = process.env.REACT_APP_URL + "api/";

//user detail api

export const getUserList = (page, limit, search, type) => async (dispatch) => {
  if (type === "All") {
    const res = await axios.get(
      PROXY + "post?page=" + page + "&limit=" + limit + "&search=" + search
    );
    dispatch({
      type: USER_DETAILS,
      payload: res.data.result,
    });
  } else {
    const res = await axios.get(
      PROXY +
        "post?page=" +
        page +
        "&limit=" +
        limit +
        "&search=" +
        search +
        "&type=" +
        type
    );
    dispatch({
      type: USER_DETAILS,
      payload: res.data.result,
    });
  }
};

export const addNewUser = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "user", formData);
  return res;
};

export const updateUserDetails = (id, details) => async (dispatch) => {
  const res = await axios.put(PROXY + "user/" + id, details);
  return res;
};

export const deleteUser = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "user/" + id);
  return res;
};

export const deletePost = (id) => async (dispatch) => {
  const res = await axios.put(PROXY + "post/change_status/" + id, { flag: 3 });
  return res;
};

export const getUserDetailsById = (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + "user/" + id);
  return res;
};

export const getPostDetail = (id) => async (dispatch) => {
  const res = await axios.get(PROXY + "post/detail/" + id);
  return res;
};


export const getIndustryDetail = (id) => async (dispatch) => {
  const res = await axios.get(PROXY + "industry/detail/" + id);
  return res;
};

export const getServicesDetail = (id) => async (dispatch) => {
  const res = await axios.get(PROXY + "services/detail/" + id);
  return res;
};

export const getUserDropDownList = () => async (dispatch) => {
  const res = await axios.get(PROXY + "user");
  dispatch({
    type: USER_LIST,
    payload: res.data.result,
  });
};

//user post api

export const getUserPost = (page, limit, search) => async (dispatch) => {
  const res = await axios.get(
    PROXY +
      "post?&page=" +
      page +
      "&limit=" +
      limit +
      "&search=" +
      search +
      "&type=1"
  );
  dispatch({
    type: USER_POST,
    payload: res.data.result,
  });
};

export const deleteUserPost = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "user/post/" + id);
  return res;
};

export const addNewPost = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "post", formData);
  return res;
};

export const getUserSalespitch = (page, limit, search) => async (dispatch) => {
  const res = await axios.get(
    PROXY +
      "salespitch?&page=" +
      page +
      "&limit=" +
      limit
  );
  dispatch({
    type: USER_SALESPITCH,
    payload: res.data.result,
  });
};

export const deleteUserSalespitch = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "user/salespitch/" + id);
  return res;
};

export const addNewSalespitch = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "salespitch", formData);
  return res;
};

export const getSalespitchDetail = (id) => async (dispatch) => {
  const res = await axios.get(PROXY + "salespitch/detail/" + id);
  return res;
};

export const updateUserSalespitch = (id, formData) => async (dispatch) => {
  const res = await axios.put(PROXY + "salespitch/update/" + id, formData);
  return res;
};



export const getIndustryList = (page, limit, search) => async (dispatch) => {
  const res = await axios.get(
    PROXY +
      "industry?&page=" +
      page +
      "&limit=" +
      limit +
      "&search=" +
      search
  );
  dispatch({
    type: USER_INDUSTRY,
    payload: res.data.result,
  });
};

export const getServicesList = (page, limit, search) => async (dispatch) => {
  const res = await axios.get(
    PROXY +
      "services?&page=" +
      page +
      "&limit=" +
      limit +
      "&search=" +
      search
  );
  dispatch({
    type: USER_SERVICES,
    payload: res.data.result,
  });
};

export const addNewIndustry = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "industry", formData);
  return res;
};

export const addNewServices = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "services", formData);
  return res;
};

export const deleteIndustry = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "industry/" + id);
  return res;
};

export const deleteServices = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "services/" + id);
  return res;
};

export const updateUserPost = (id, formData) => async (dispatch) => {
  const res = await axios.put(PROXY + "post/update/" + id, formData);
  return res;
};

export const updateUserIndustry = (id, formData) => async (dispatch) => {
  const res = await axios.put(PROXY + "industry/update/" + id, formData);
  return res;
};

export const updateUserServices = (id, formData) => async (dispatch) => {
  const res = await axios.put(PROXY + "services/update/" + id, formData);
  return res;
};

export const getUserPostById = (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + "user/post/" + id);
  return res;
};

//user blog api

export const getUserBlog = (user, page, limit, search) => async (dispatch) => {
  const res = await axios.get(
    PROXY +
      "user/blog?other=" +
      user +
      "&page=" +
      page +
      "&limit=" +
      limit +
      "&search=" +
      search
  );
  dispatch({
    type: USER_BLOG,
    payload: res.data.result,
  });
};

export const deleteUserBlog = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "user/blog/" + id);
  return res;
};

export const addNewBlog = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "user/blog", formData);
  return res;
};

export const updateUserBlog = (id, formData) => async (dispatch) => {
  const res = await axios.put(PROXY + "user/blog/" + id, formData);
  return res;
};

export const getUserBlogById = (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + "user/blog/" + id);
  return res;
};

// ev journey api

export const getUserEVJourney =
  (user, page, limit, search) => async (dispatch) => {
    const res = await axios.get(
      PROXY +
        "user/ev/journey?user=" +
        user +
        "&page=" +
        page +
        "&limit=" +
        limit +
        "&search=" +
        search
    );
    dispatch({
      type: USER_EV_JOURNEY,
      payload: res.data.result,
    });
  };

export const deleteUserEVJourney = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "user/ev/journey/" + id);
  return res;
};

export const addNewEVJourney = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "user/ev/journey", formData);
  return res;
};

export const updateUserEVJourney = (id, formData) => async (dispatch) => {
  const res = await axios.put(PROXY + "user/ev/journey/" + id, formData);
  return res;
};

export const getUserEVJourneyById = (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + "user/ev/journey/" + id);
  return res;
};

// user car review

export const getUserCarReview =
  (user, page, limit, search) => async (dispatch) => {
    const res = await axios.get(
      PROXY +
        "user/car/review?user=" +
        user +
        "&page=" +
        page +
        "&limit=" +
        limit +
        "&search=" +
        search
    );
    dispatch({
      type: USER_CAR_REVIEW,
      payload: res.data.result,
    });
  };

export const deleteUserCarReview = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "user/car/review/" + id);
  return res;
};

export const addNewCarReview = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "user/car/review", formData);
  return res;
};

export const updateUserCarReview = (id, formData) => async (dispatch) => {
  const res = await axios.put(PROXY + "user/car/review/" + id, formData);
  return res;
};

export const getUserCarReviewById = (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + "user/car/review/" + id);
  return res;
};

export const getCompanyDropDown = () => async (dispatch) => {
  const res = await axios.get(PROXY + "general/company/");
  return res;
};

export const getModalDropDown = (company) => async (dispatch) => {
  const res = await axios.get(PROXY + "general/vehicle?company=" + company);
  return res;
};

// owned vehicals

export const getUserOwnedVehicals =
  (user, page, limit, search) => async (dispatch) => {
    const res = await axios.get(
      PROXY +
        "user/owned/vehicle?user=" +
        user +
        "&page=" +
        page +
        "&limit=" +
        limit +
        "&search=" +
        search
    );
    dispatch({
      type: USER_OWNED_VEHICALS,
      payload: res.data.result,
    });
  };

export const deleteUserOwnedVehicals = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "user/owned/vehicle/" + id);
  return res;
};

export const addNewOwnedVehicals = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "user/owned/vehicle", formData);
  return res;
};

export const updateUserOwnedVehicals = (id, formData) => async (dispatch) => {
  const res = await axios.put(PROXY + "user/owned/vehicle/" + id, formData);
  return res;
};

export const getUserOwnedVehicalsById = (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + "user/owned/vehicle/" + id);
  return res;
};

export const getAllUsers = (page, limit, search, type) => async (dispatch) => {
  // const res = await axios.get(
  //   PROXY + "user?all=" + page + "&limit=" + limit + "&search=" + search
  // );
  const res = await axios.get(PROXY + "user/all");
  dispatch({
    type: GET_ALL_USERS,
    payload: res.data.result,
  });
};
