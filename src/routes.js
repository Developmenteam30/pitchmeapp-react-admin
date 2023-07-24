import React from "react";
import AddNewCompany from "./views/CompanyProfile/AddNewCompany";
import VehicleDetails from "./views/Vehicle/VehicleDetails";
import UpdateCompany from "./views/CompanyProfile/UpdateCompany";
import ViewCompanyDetails from "./views/CompanyProfile/ViewCompanyDetails";
// Setting Component
import Settings from "./views/Settings/Settings";
import AddNewVehicle from "./views/Vehicle/AddNewVehical";
// Industry Component
import Industry from "./views/Industry/IndustryPost";
import Services from "./views/Services/ServicesPost"
import Salespitch from "./views/Salespitch/Salespitch";
import EditSalespitch from "./views/Salespitch/EditSalespitch";
import Biography from "./views/Biography/Biography";
import Support from "./views/Support/Support";
import EditBiography from "./views/Biography/EditBiography";
const IndustryPost = React.lazy(() => import("./views/Industry/IndustryPost"));
const IndustryAddPost = React.lazy(() => import("./views/Industry/IndustryAddPost"));
const IndustryEditPost = React.lazy(() => import("./views/Industry/IndustryEditPost"));
// Services Component

const ServicesPost = React.lazy(() => import("./views/Services/ServicesPost"));
const ServicesAddPost = React.lazy(() => import("./views/Services/ServicesAddPost"));
const ServicesEditPost = React.lazy(() => import("./views/Services/ServicesEditPost"));

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const CommunityForum = React.lazy(() => import("./views/CommunityForum/Index"));
const User = React.lazy(() => import("./views/User/User"));
const UserView = React.lazy(() => import("./views/User/View"));
const AddPosts = React.lazy(() => import("./views/Posts/AddPosts"));
const VehicleView = React.lazy(() => import("./views/Vehicle/View"));

const Posts = React.lazy(() => import("./views/Posts/Posts"));
const EditPosts = React.lazy(() => import("./views/Posts/EditPosts"));
const UpdateProfile = React.lazy(() => import("./views/Profile/UpdateProfile"));
const ChangePassword = React.lazy(() =>
  import("./views/Profile/ChangePassword")
);
const routes = [
  {
    path: "/change-password",
    exact: true,
    name: "Change Password",
    component: ChangePassword,
  },
  {
    path: "/support",
    exact:true,
    name: "Support",
    component: Support,
  },
  {
    path: "/update-profile",
    exact: true,
    name: "Update Profile",
    component: UpdateProfile,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/posts",
    exact: true,
    name: "Posts",
    component: Posts,
  },
   {
    path: "/company/add",
    exact: true,
    name: "Add New Compnay",
    component: AddNewCompany,
  },
  {
    path: "/IndustryPost",
    exact: true,
    name: "Industry",
    component: Industry,
  },
    {
    path: "/ServicesPost",
    exact: true,
    name: "Services",
    component: Services,
  },
  {
    path: "/company/update/:id",
    exact: true,
    name: "Update Compnay Details",
    component: UpdateCompany,
  },
  {
    path: "/company/:id",
    exact: true,
    name: "Compnay Details",
    component: ViewCompanyDetails,
  },
  // vehicle section
  {
    path: "/vehicles",
    exact: true,
    name: "Vehicles",
    component: VehicleDetails,
  },
  {
    path: "/vehicles/add",
    exact: true,
    name: "Add New Vehicle",
    component: AddNewVehicle,
  },
  {
    path: "/vehicles/details/:_id",
    exact: true,
    name: "Vehicle Details",
    component: VehicleView,
  },
  {
    path: "/vehicles/update/:id",
    exact: true,
    name: "Update Vehicle Details",
    component: AddNewVehicle,
  },
  {
    path: "/settings",
    exact: true,
    name: "Settings",
    component: Settings,
  },
  {
    path: "/community-forum",
    exact: true,
    name: "Community Forum",
    component: CommunityForum,
  },
  // {
  //   path: '/settings/faq',
  //   exact: true,
  //   name: 'FAQ',
  //   component: FAQ,
  // },
  // {
  //   path: '/settings/content-management',
  //   exact: true,
  //   name: 'Content Management',
  //   component: CMS,
  // },
  // {
  //   path: '/settings/media-management',
  //   exact: true,
  //   name: 'Media Management',
  //   component: MediaManagement,
  // },
  {
    path: "/notification",
    exact: true,
    name: "Notifications",
    component: Notification,
  },
  {
    path: "/posts",
    exact: true,
    name: "Posts",
    component: User,
  },
  {
    path: "/industryadd",
    exact: true,
    name: "Industry",
    component: IndustryAddPost,
  },
  {
    path: "/servicesadd",
    exact: true,
    name: "Services",
    component: ServicesAddPost,
  },
  {
    path: "/user/view/:_id",
    exact: true,
    name: "User detail",
    component: UserView,
  },
  // {
  //   path: "/user/edit/:_id",
  //   exact: true,
  //   name: "Edit user",
  //   component: AddUser,
  // },
  {
    path: "/posts/add",
    exact: true,
    name: "Add posts",
    component: AddPosts,
  },

  {
    path: "/posts/edit/:_id",
    exact: true,
    name: "Edit posts",
    component: EditPosts,
  },
  //industry
  {
    path: "/industryaddpost",
    exact: true,
    name: "Add Industry",
    component: IndustryAddPost,
  },

  {
    path: "/industryeditpost/:_id",
    exact: true,
    name: "Edit Industry",
    component: IndustryEditPost,
  },
  //services
  {
    path: "/posts/add",
    exact: true,
    name: "Add Services",
    component: ServicesAddPost,
  },

  {
    path: "/services/edit/:_id",
    exact: true,
    name: "Edit posts",
    component: ServicesEditPost,
  },
  {
    path: "/salespitch/edit/:_id",
    exact: true,
    name: "Edit sales pitch",
    component: EditSalespitch,
  },
  {
    path: "/salespitch",
    exact: true,
    name: "Salespitch",
    component: Salespitch,
  },
  {
    path: "/biography/edit/:_id",
    exact: true,
    name: "Edit biography pitch",
    component: EditBiography,
  },
  {
    path: "/biography",
    exact: true,
    name: "Biography",
    component: Biography,
  },
];

export default routes;
