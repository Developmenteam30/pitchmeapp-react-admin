import {
  COMPANY_DETAILS,
  COMPANY_POSTS,
  COMPANY_PROFILE,
  COMPANY_CHARGING,
} from "../actions/types";
const initialState = {
  companyData: {
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
  companyLoading: false,
  companyDetails: null,
  companyDetailsLoading: true,
  companyPosts: {
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
  companyPostsLoading: true,
  companyCharging: {
    result: [],
    page:0,
  },
  companyChargingLoading:true,
};

const CompanyDetailsReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMPANY_PROFILE:
      return { ...state, companyLoading: false, companyData: payload };
    case COMPANY_DETAILS:
      return {
        ...state,
        companyDetailsLoading: false,
        companyDetails: payload,
      };
    case COMPANY_POSTS:
      return {
        ...state,
        companyPostsLoading: false,
        companyPosts: payload,
      };
    case COMPANY_CHARGING:
      return {
        ...state,
        companyCharging:payload,
        companyChargingLoading:false,
      }

    default:
      return state;
  }
};

export default CompanyDetailsReducers;
