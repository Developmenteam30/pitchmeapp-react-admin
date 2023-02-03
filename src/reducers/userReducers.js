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
} from "../actions/types";
const initialState = {
  post: {
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
  industry: {
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
  services: {
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
  // userPost: {
  //   docs: [],
  //   totalDocs: 0,
  //   limit: 0,
  //   page: 0,
  //   totalPages: 0,
  //   pagingCounter: 0,
  //   hasPrevPage: false,
  //   hasNextPage: false,
  //   prevPage: null,
  //   nextPage: null,
  // },
  // userBlog: {
  //   docs: [],
  //   totalDocs: 0,
  //   limit: 0,
  //   page: 0,
  //   totalPages: 0,
  //   pagingCounter: 0,
  //   hasPrevPage: false,
  //   hasNextPage: false,
  //   prevPage: null,
  //   nextPage: null,
  // },

  // userEvJourney: {
  //   docs: [],
  //   totalDocs: 0,
  //   limit: 0,
  //   page: 0,
  //   totalPages: 0,
  //   pagingCounter: 0,
  //   hasPrevPage: false,
  //   hasNextPage: false,
  //   prevPage: null,
  //   nextPage: null,
  // },
  // userCarReview: {
  //   docs: [],
  //   totalDocs: 0,
  //   limit: 0,
  //   page: 0,
  //   totalPages: 0,
  //   pagingCounter: 0,
  //   hasPrevPage: false,
  //   hasNextPage: false,
  //   prevPage: null,
  //   nextPage: null,
  // },
  // userOwnedVehicals: {
  //   docs: [],
  //   totalDocs: 0,
  //   limit: 0,
  //   page: 0,
  //   totalPages: 0,
  //   pagingCounter: 0,
  //   hasPrevPage: false,
  //   hasNextPage: false,
  //   prevPage: null,
  //   nextPage: null,
  // },
  allUser: {
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
  userOwnedVehicalsLoading: true,
  userCarReviewLoading: true,
  userEvJourneyLoading: true,
  userBlogLoading: true,
  userPostLoading: true,
  userIndustryLoading: true,
  userDetailLoading: true,
  userlist: [],
  userListLoading: true,
  allUserLoading: true,
};

const userDetailReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS:
      return { ...state, userDetailLoading: false, post: payload };
    case USER_LIST:
      return { ...state, userListLoading: false, userlist: payload };
    case USER_POST:
      return { ...state, userPostLoading: false, userPost: payload };
    case USER_INDUSTRY:
      return { ...state, userIndustryLoading: false, industry: payload };
    case USER_SERVICES:
      return { ...state, userIndustryLoading: false, services: payload };
    case USER_BLOG:
      return { ...state, userBlogLoading: false, userBlog: payload };

    case USER_EV_JOURNEY:
      return { ...state, userEvJourneyLoading: false, userEvJourney: payload };
    case USER_CAR_REVIEW:
      return { ...state, userCarReviewLoading: false, userCarReview: payload };
    case USER_OWNED_VEHICALS:
      return {
        ...state,
        userOwnedVehicalsLoading: false,
        userOwnedVehicals: payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUserLoading: false,
        allUser: payload,
      };
    default:
      return state;
  }
};

export default userDetailReducers;
