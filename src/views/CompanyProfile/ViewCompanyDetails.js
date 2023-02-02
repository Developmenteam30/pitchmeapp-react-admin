import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import CompanyDetails from "./CompanyDetails";
import CompanyPosts from "./CompanyPosts";
import CompanyEvents from "./CompanyEvents";
import CompanyNews from "./CompanyNews";
import ChargingStationDetails from "./ChargingStationDetails";

const ViewCompanyDetails = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Post
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Events
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            News
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            Charging Infrastructure
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <CompanyDetails />
        </TabPane>
        <TabPane tabId="2">
          <CompanyPosts />
        </TabPane>
        <TabPane tabId="3">
          <CompanyEvents />
        </TabPane>
        <TabPane tabId="4">
          <CompanyNews />
        </TabPane>
        <TabPane tabId="5">
          <ChargingStationDetails />
        </TabPane>
        {/* <TabPane tabId="6">
          <UserAddCar />
        </TabPane> */}
      </TabContent>
    </div>
  );
};

export default ViewCompanyDetails;
