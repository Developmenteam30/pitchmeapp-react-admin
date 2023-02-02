import { CITIES_LIST,STATE_LIST } from "../actions/types";

const initialState = {
    citiesData: {
     result:[],
    },
    stateData:{
    result:[],
    },
    citiesDataLoading:true,
    stateDataLoading:true,
}

const generalReducer = (state = initialState,action) => {
    const { type, payload} = action
    switch (type) {
        case CITIES_LIST:
            return { ...state, citiesDataLoading:false, citiesData: payload};
        case STATE_LIST:
            return { ...state, stateDataLoading:false, stateData:payload};

        default:
            return state
    }
}

export default generalReducer