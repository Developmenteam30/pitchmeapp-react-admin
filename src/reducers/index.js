import { combineReducers } from "redux";
import authReducers from "./authReducers.js";
import alertReducers from "./alertReducer";
// import studentReducer from "./studentReducer";
// import coatchReducer from "./coatchReducer";
// import courseReducer from "./courseReducer";
import faqReducer from "./faqReducer.js";
import contentManagement from "./cmsReducer.js";
import mediaManagement from "./mediaReducers.js";
import CompanyDetailsReducers from "./CompanyProfileReducers.js";
import userDetailReducers from "./userReducers.js";
import communityForumReducers from "./CommunityForumReducers.js";
import settingReducer from "./settingReducer";
// import CourseCoachReducer from "./courseCoachReducer";
// import CourseClassReducer from "./courseCoachClassReducer";
// import CoursePackagesReducer from "./coursePackagesReducer";
// import leaveReducer from "./leaveReducer";
import notificationReducer from "./notificationsReducer";
import vehicleReducer from "./vehicleReducer";
import generalReducer from "./generalReducer";

export default combineReducers({
  auth: authReducers,
  alert: alertReducers,
  faq: faqReducer,
  cmsDetails: contentManagement,
  mediaDetails: mediaManagement,
  company: CompanyDetailsReducers,
  vehicle: vehicleReducer,
  posts: userDetailReducers,
  community_Forum: communityForumReducers,
  general: generalReducer,
  settings: settingReducer,
  notifications: notificationReducer,
});
