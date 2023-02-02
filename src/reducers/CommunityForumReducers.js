import { COMMUNITY_FORUM } from "../actions/types";
const initialState = {
  communityDetails: {
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
  communityForumLoading: true,
};

const communityForumReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMUNITY_FORUM:
      return {
        ...state,
        communityForumLoading: false,
        communityDetails: payload,
      };
    default:
      return state;
  }
};

export default communityForumReducers;
