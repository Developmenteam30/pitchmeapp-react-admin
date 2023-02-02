import axios from 'axios'
import { VEHICLE_LIST, VEHICLE_VIDEOS } from './types'
const PROXY = process.env.REACT_APP_URL + 'api/'

export const getVehicles = (page, limit, name) => async (dispatch) => {
  const res = await axios.get(
    PROXY + 'vehicle?page=' + page + '&limit=' + limit + '&search=' + name
  )
  dispatch({
    type: VEHICLE_LIST,
    payload: res.data.result,
  })
  return res
}

export const addVehicle = (vehicleData) => async (dispatch) => {
  const res = await axios.post(PROXY + 'vehicle', vehicleData)
  return res
}

export const updateVehicle = (id, vehicleData) => async (dispatch) => {
  const res = await axios.put(PROXY + 'vehicle/' + id, vehicleData)
  return res
}

export const deleteVehicle = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + 'vehicle/' + id)
  return res
}
// General Specification
export const generalSpecification = () => async (dispatch) => {
  const res = await axios.get(`${PROXY}general/specification`)
  return res
}

export const getParentVehical = () => async (dispatch) => {
  const res = await axios.get(`${PROXY}general/vehicle/main`)
  return res
}

export const getVehicleDetailsById = (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + 'vehicle/' + id)
  return res
}

export const getCompanyList = () => async (dispatch) => {
  const res = await axios.get(`${PROXY}general/company`)
  return res
}

export const getVehicleVideos = (vehicle,page,limit) => async (dispatch) => {
  const res = await axios.get(
    PROXY + "vehicle/video?vehicle=" + 
    vehicle + "&page=" + page + "&limit=" + limit
   
    
  );
  dispatch({
    type: VEHICLE_VIDEOS,
    payload: res.data.result,
  });
};

export const addVehicleVideo = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + "vehicle/video",formData);
  return res;
}

export const updateVehicleVideo = (_id,details) => async (dispatch) => {
  
  const res = await axios.put(PROXY + "vehicle/video/" + _id, details);
  return res;
}

export const getVehicleVideosById= (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + "vehicle/video/" + id);
 
  return res;
}
