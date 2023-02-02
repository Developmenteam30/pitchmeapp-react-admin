import { VEHICLE_LIST,VEHICLE_VIDEOS } from '../actions/types'

const initialState = {
  vehicleData: {
    docs: [],
    totalDocs: 0,
    limit: 0,
    page: 0,
    totalPages: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  },
  vehicleVideos:{
    docs:[],
    totalDocs: 0,
    limit: 0,
    page: 0,
    totalPages: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  },
  vehicleVideosLoading:true,
  vehicleLoading: true,
}

const vehicleReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case VEHICLE_LIST:
      return { ...state, vehicleLoading: false, vehicleData: payload };
    case VEHICLE_VIDEOS:
      return { ...state,vehicleVideos:payload,vehicleVideosLoading:false}

    default:
      return state
  }
}

export default vehicleReducer
