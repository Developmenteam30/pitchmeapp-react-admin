import React, { Fragment, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Spinner,
} from 'reactstrap';
import { Tooltip } from 'react-tippy';
import { Link, useParams } from 'react-router-dom';
import { AppSwitch } from '@coreui/react';
import ReadMore from 'react-read-more-read-less';
import { connect } from 'react-redux';
import { getUserDetailsById } from '../../actions/userActions';

const UserDetails = (props) => {
  const { _id } = useParams();
  const { getUserDetailsById } = props;
  const [userDetails, setUserDetails] = useState('');
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    getUserDetailsById(_id).then((res) => {
      let response = res.data.result;
      setUserDetails(response);
      setUserLoading(true);
    });
  }, [_id]);

  return (
    <Row>
      <Col xs='12'>
        <Card>
          {userLoading && userDetails ? (
            <CardBody>
              <Table responsive striped className='custome-table-th-td'>
                <tbody>
                  <Fragment>
                    <tr>
                      <th>Name</th>
                      <td>
                        {userDetails.first_name} {userDetails.last_name}
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{userDetails.email} </td>
                    </tr>
                    <tr>
                      <th>Logo</th>
                      <th>
                        <div className='image-border'>
                          <img src={userDetails.logo} alt='' />
                        </div>
                      </th>
                    </tr>

                    <tr>
                      <th>Banner</th>
                      <td>
                        {userDetails.banner ? (
                          <div className='image-banner'>
                            <img src={userDetails.banner} alt='' />
                          </div>
                        ) : (
                          'Not available'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Address </th>
                      <td>
                        <ReadMore
                          charLimit={150}
                          readMoreText={'Read more'}
                          readLessText={'Read less'}
                        >
                          {userDetails.address}
                        </ReadMore>
                      </td>
                    </tr>
                    <tr>
                      <th>About</th>
                      <td>
                        <ReadMore
                          charLimit={150}
                          readMoreText={'Read more'}
                          readLessText={'Read less'}
                        >
                          {userDetails.about_us}
                        </ReadMore>
                        <br />
                        <br />
                        <i className='fab fa-instagram-square'></i>:{' '}
                        {userDetails.instagram}{' '}
                        <i className='fab fa-facebook-square'></i> :
                        {userDetails.facebook}{' '}
                        <i className='fab fa-twitter-square'></i> :
                        {userDetails.twitter}{' '}
                        <i className='fab fa-linkedin-square'></i>:{' '}
                        {userDetails.linkdin} <i className='fab fa-youtube'></i>{' '}
                        : {userDetails.youtube}
                      </td>
                    </tr>
                  </Fragment>
                </tbody>
              </Table>
            </CardBody>
          ) : (
            ''
          )}
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  getUserDetailsById,
})(UserDetails);
