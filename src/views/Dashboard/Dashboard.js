import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import Widget from "./Widget";
import { connect } from "react-redux";
import {
  addNewPost,
  getUserList,
  getAllUsers,
} from "../../actions/userActions";

const Dashboard = (props) => {
  const { getUserList, posts, getAllUsers } = props;

  const { post, allUser } = posts;

  useEffect(() => {
    getUserList(1, 10, "", "All");
  }, [getUserList]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row className="mt-5">
                {/* <Col xs="12" sm="6" lg="3">
                  <Widget
                    icon="icon-people"
                    color="info"
                    header="87.500"
                    value="25"
                    invert
                  >
                    Visitors
                  </Widget>
                </Col> */}
                <Col xs="12" sm="6" lg="3">
                  <Widget
                    icon="fas fa-users"
                    color="success"
                    header={allUser.totalDocs}
                    value="25"
                    invert
                  >
                    Total Users
                  </Widget>
                </Col>
                {/* <Col xs="12" sm="6" lg="3">
                  <Widget
                    icon="icon-basket-loaded"
                    color="warning"
                    header="1238"
                    value="25"
                    invert
                  >
                    Products sold
                  </Widget>
                </Col> */}
                <Col xs="12" sm="6" lg="3">
                  <Widget
                    icon="fas fa-images"
                    color="primary"
                    header={post.totalDocs}
                    value="25"
                    invert
                  >
                    Total Posts
                  </Widget>
                </Col>
              </Row>
              {/* ) : (
                <ContentLoader
                  height={40}
                  width="100%"
                  speed={1.2}
                  backgroundColor="#d0d5d8"
                  foregroundColor="#fafafa"
                >
                  <rect x="0" y="17" rx="4" ry="4" width="1300" height="13" />
                </ContentLoader>
              )} */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, {
  getUserList,
  getAllUsers,
})(Dashboard);
