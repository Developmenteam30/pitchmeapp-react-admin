import { GET_NOTIFICATION_LIST } from "../actions/types";
const initialState = {
  notification: {
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
  notificationLoading: false,
};

const notifications = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATION_LIST:
      return { ...state, notificationLoading: false, notification: payload };
    default:
      return state;
  }
};

export default notifications;
