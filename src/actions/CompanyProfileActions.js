import axios from "axios";
import { COMPANY_DETAILS, COMPANY_PROFILE, COMPANY_POSTS, STATE_NAME, CITY_NAME,COMPANY_CHARGING } from "./types";
const PROXY = process.env.REACT_APP_URL + "api/";

export const getCompanyDetails = (page, limit, name) => async (dispatch) => {
  const res = await axios.get(
    PROXY + "company?page=" + page + "&limit=" + limit + "&search=" + name
  );
  dispatch({
    type: COMPANY_PROFILE,
    payload: res.data.result,
  });
  return res;
};

export const getCompanyCharging = (id) => async (dispatch) => {
  const res = await axios.get(
    PROXY + "CompanyInfrastructure/"+ id
  );
  dispatch({
    type:COMPANY_CHARGING,
    payload: res.data.result,
  });
  return res;
}

export const addChargingStation =(formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "CompanyInfrastructure" , formData);
  return res;
}
export const updateChargingStation = (_id,details) => async (dispatch) =>{

  const res = await axios.put(PROXY + "CompanyInfrastructure/" + _id,details);
  return res;
}

export const addCompanyDetails = (companyData) => async (dispatch) => {
  const res = await axios.post(PROXY + "company", companyData);
  return res;
};

export const updateCompanyDetails = (id, details) => async (dispatch) => {
  const res = await axios.put(PROXY + "company/" + id, details);
  return res;
};

export const deleteCompnay = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "company/" + id);
  return res;
};

export const getCompanyDetailsById = (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + "company/" + id);
  dispatch({
    type: COMPANY_DETAILS,
    payload: res.data.result,
  });
  return res;
};

export const getCompanyPost = (companyPostsObj) => async (dispatch) => {
  const res = await axios.get(PROXY + "user/post", { params: companyPostsObj });
  dispatch({
    type: COMPANY_POSTS,
    payload: res.data.result,
  });
};

export const deleteCompnayPost = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + "user/post/" + id);
  return res;
};

export const addCompanyPosts = (companyData) => async (dispatch) => {
  const res = await axios.post(PROXY + "user/post", companyData);
  return res;
};
export const updateCompanyPosts = (_id, companyData) => async (dispatch) => {
  const res = await axios.put(PROXY + "user/post/" + _id, companyData);
  return res;
};


export const addStateName = (generalData) => async (dispatch) => {
  const res = await axios.post(PROXY + "general/state", generalData);
  return res;
};

export const getStateName = () => async (dispatch) => {
  const res = await axios.get(PROXY + "general/state");
  dispatch({
    type: STATE_NAME,
    payload: res.data.result,
  });
  return res;
};

export const getCityName = (stateId) => async (dispatch) => {
  const res = await axios.get(PROXY + "general/city?state="+ stateId);
  dispatch({
    type: CITY_NAME,
    payload: res.data.result,
  });
  return res;
};