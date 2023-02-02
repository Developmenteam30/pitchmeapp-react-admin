import axios from 'axios';
import { CITIES_LIST, STATE_LIST } from "./types";
const PROXY = process.env.REACT_APP_URL + "api/";

export const getCities = (state) => async (dispatch) => {
   const res = await axios.get(
       PROXY + "general/city?state=" + state
   );
   dispatch({
       type: CITIES_LIST,
       payload: res.data.result,
   });
   return res;
}

export const getState = () => async (dispatch) => {
    const res = await axios.get(
        PROXY + "general/state"
    );
    dispatch({
        type:STATE_LIST,
        payload:res.data.result,
    });
    return res;
}