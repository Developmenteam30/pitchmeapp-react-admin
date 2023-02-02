import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { ToastContainer } from 'react-toastify';
const VehicleBlog = React.lazy(() => import('./VehicleBlog'));
const VehicleVideo = React.lazy(() => import('./VehicleVideo'));

const View = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <ToastContainer position='top-right' autoClose={3000} />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Vehicle Blog
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Videos
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <VehicleBlog />
        </TabPane>
        <TabPane tabId='2'>
          <VehicleVideo />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default View;
