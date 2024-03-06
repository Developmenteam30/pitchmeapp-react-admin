import React, { useState, useEffect } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  UncontrolledDropdown,
  NavItem,
  Dropdown,
  Badge,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";
import { Link } from "react-router-dom";
import {
  // AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";

import logo from "../../assets/logo-b.png";
// import logo from "../../assets/img/brand/logo.svg";
import minLogo from "../../assets/img/Artboard – 1.jpg";
import userLogo from "../../assets/img/user1.png";
import { useHistory } from "react-router-dom";
import { getNotifications } from "../../actions/notificationAction";
import moment from "moment";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const DefaultHeader = (props) => {
  // eslint-disable-next-line
  const history = useHistory();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onLogout = () => {
    props.logout();
    history.push("/login");
  };

  useEffect(() => {
    // props.getNotifications();
  }, []);

  const { children, ...attributes } = props;
  const { admin } = props.auth;

  const { notification, notificationLoading } = props.notifications;

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: minLogo, width: 150, height: 37, alt: "Logo" }}
        minimized={{
          src: minLogo,
          width: 43,
          height: 25,
          alt: "CoreUI Logo",
        }}
      />
      <AppSidebarToggler
        className="d-md-down-none"
        display="lg"
        style={{ backgroundColor: "white" }}
      />

      <Nav className="ml-auto mr-2" navbar>
        <Dropdown nav className=" " isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav>
            <i
              className="icon-bell"
              style={{ color: "white", fontSize: "20px" }}
            ></i>
            {/* <Badge pill color="danger">
              6
            </Badge> */}
          </DropdownToggle>

          {/* <DropdownMenu right style={{ width: "350px" }}>
            <>
              <DropdownItem header tag="div" className="text-center">
                <div className="text-uppercase mb-1">
                  <strong>Notifications</strong>
                </div>
                <strong>You have {notification.totalDocs} notifications</strong>
              </DropdownItem>
              {notification &&
                notification?.docs?.map((obj, indx) => (
                  <DropdownItem className="abc" key={indx}>
                    <i className="icon-user-follow text-success"></i>
                    <span style={{ whiteSpace: "pre-wrap" }}> {obj.title}</span>
                    <div className="text-right">
                      {" "}
                      <span>
                        <i
                          class="fa fa-clock"
                          style={{ marginRight: "0px" }}
                        ></i>
                      </span>{" "}
                      <small>{moment(obj.createdAt).format("MMM Do YY")}</small>
                    </div>
                  </DropdownItem>
                ))}
            </>
          </DropdownMenu> */}

          <DropdownMenu right style={{ width: "350px" }}>
            <DropdownItem header tag="div" className="text-center">
              <div className="text-uppercase mb-1">
                <strong>Notifications</strong>
              </div>
              <strong>You have 6 notifications</strong>
            </DropdownItem>

            <DropdownItem className="abc">
              <i className="icon-user-follow text-success"></i>
              <span style={{ whiteSpace: "pre-wrap" }}>
                {" "}
                New user registered is going to be added
              </span>
              <div className="text-right">
                {" "}
                <span>
                  <i class="fa fa-clock" style={{ marginRight: "0px" }}></i>
                </span>{" "}
                <small>2 months ago</small>
              </div>
            </DropdownItem>
            <DropdownItem className="abc">
              <i className="icon-user-unfollow text-danger"></i> User deleted
              <div className="text-right">
                <span>
                  <i class="fa fa-clock" style={{ marginRight: "0px" }}></i>
                </span>{" "}
                <small>2 months ago</small>
              </div>
            </DropdownItem>
            <DropdownItem className="abc">
              <i className="icon-chart text-info"></i> Sales report is ready
              <div className="text-right">
                <span>
                  <i class="fa fa-clock" style={{ marginRight: "0px" }}></i>
                </span>{" "}
                <small>2 months ago</small>
              </div>
            </DropdownItem>
            <DropdownItem className="abc">
              <i className="icon-basket-loaded text-primary"></i> New client
              <div className="text-right">
                <span>
                  <i class="fa fa-clock" style={{ marginRight: "0px" }}></i>
                </span>{" "}
                <small>2 months ago</small>
              </div>
            </DropdownItem>
            <DropdownItem className="abc">
              <i className="icon-speedometer text-warning"></i> Server
              overloaded
              <div className="text-right">
                <span>
                  <i class="fa fa-clock" style={{ marginRight: "0px" }}></i>
                </span>{" "}
                <small>2 months ago</small>
              </div>
            </DropdownItem>
            <DropdownItem header tag="div" className="text-center">
              <Button>
                <strong>View All Notifications</strong>
              </Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <UncontrolledDropdown nav direction="down" className="pl-4">
          <DropdownToggle nav>
            <>
              <img
                src={admin.profile_pic}
                className="img-avatar"
                alt=""
                height="40px"
                width="40px"
              />

              <span className="text-white">{admin?.name}</span>
              <span
                className="drop-down-arrow pl-2 pr-3"
                style={{ color: "white" }}
              >
                <i className="fa fa-caret-down "></i>
              </span>
            </>
          </DropdownToggle>
          <DropdownMenu right style={{ height: "auto", right: 0 }}>
            <Link to="/update-profile" className="dropDownItem">
              <DropdownItem>
                <i className="fa fa-user"></i> Update Profile
              </DropdownItem>
            </Link>

            <Link to="/change-password" className="dropDownItem">
              <DropdownItem>
                <i className="fa fa-key"></i> Change Password
              </DropdownItem>
            </Link>
            <a className="dropDownItem" onClick={onLogout}>
              <DropdownItem>
                <i className="fa fa-lock"></i> Logout
              </DropdownItem>
            </a>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
      {/* <AppAsideToggler className="d-md-down-none" /> */}
    </React.Fragment>
  );
};

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { logout, getNotifications })(
  DefaultHeader
);
