import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import { ToastContainer } from 'react-toastify'

const UserDetails = React.lazy(() => import('./UserDetails'))
const UserEvDetail = React.lazy(() => import('./UserEvDetail'))
const UserReview = React.lazy(() => import('./UserReview'))
const UserBlog = React.lazy(() => import('./UserBlog'))
const UserPost = React.lazy(() => import('./UserPost'))
const UserAddCar = React.lazy(() => import('./UserAddCar'))
const View = (props) => {
  const [activeTab, setActiveTab] = useState('1')

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div>
      <ToastContainer position='top-right' autoClose={3000} />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1')
            }}>
            Detail
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4')
            }}>
            Post
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => {
              toggle('5')
            }}>
            Blog
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2')
            }}>
            Ev Journey
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3')
            }}>
            Review
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => {
              toggle('6')
            }}>
            Owned Vehicles
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <UserDetails />
        </TabPane>
        <TabPane tabId='2'>
          <UserEvDetail />
        </TabPane>
        <TabPane tabId='3'>
          <UserReview />
        </TabPane>
        <TabPane tabId='4'>
          <UserPost />
        </TabPane>
        <TabPane tabId='5'>
          <UserBlog />
        </TabPane>{' '}
        <TabPane tabId='6'>
          <UserAddCar />
        </TabPane>
      </TabContent>
    </div>
  )
}

export default View
