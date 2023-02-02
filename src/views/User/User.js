import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import swal from "sweetalert";
import { deleteUser, getUserList } from "../../actions/userActions";

const User = (props) => {
  const { getUserList, user_details, deleteUser } = props;
  const [search, setSearch] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageLength, setPageLength] = useState(1);

  useEffect(() => {
    getUserList(pageLength, pageLimit, "");
  }, [pageLength, pageLimit, getUserList]);

  const onDeleteUser = (user) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete user ${user.first_name} ${user.last_name} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser(user._id)
          .then((result) => {
            toast.success(result.data.message);
            getUserList(pageLength, pageLimit, "");
          })
          .catch((err) => {
            if (err.response !== undefined) {
              toast.error(err.response.data.message);
            }
          });
      }
    });
  };

  const onFieldKeyPress = (e) => {
    if (e.target.name === "search") {
      if (e.key === "Enter") {
        getUserList(pageLength, pageLimit, e.target.value);
      }
    }
  };

  const onPageClick = (page) => {
    getUserList(page, pageLimit, "");
  };

  const paginationSection = (data) => {
    const { page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
      data;

    let Pages = [];
    let skipped = 0;
    for (var i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        (page < 4 && i <= 5) ||
        i === page - 1 ||
        i === page + 1 ||
        i === page ||
        i === totalPages ||
        (page >= totalPages - 3 && i >= totalPages - 4)
      ) {
        const test = i;
        const item = (
          <React.Fragment key={i}>
            {skipped === 1 ? (
              <PaginationItem>
                <PaginationLink disabled tag="button">
                  ...
                </PaginationLink>
              </PaginationItem>
            ) : null}
            <PaginationItem
              active={page === i ? true : false}
              onClick={page === i ? () => null : () => onPageClick(test)}
              key={i}
            >
              <PaginationLink tag="button">{i}</PaginationLink>
            </PaginationItem>
          </React.Fragment>
        );
        skipped = 0;
        Pages.push(item);
      } else {
        skipped = 1;
      }
    }

    return (
      <nav className="float-right">
        <Pagination>
          <PaginationItem
            onClick={hasPrevPage === true ? () => onPageClick(prevPage) : null}
          >
            <PaginationLink
              previous
              disabled={hasPrevPage === true ? false : true}
              tag="button"
            >
              Prev
            </PaginationLink>
          </PaginationItem>
          {Pages}

          <PaginationItem
            onClick={hasNextPage === true ? () => onPageClick(nextPage) : null}
          >
            <PaginationLink
              next
              tag="button"
              disabled={hasNextPage === true ? false : true}
            >
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </nav>
    );
  };

  const { userDetail, userDetailLoading } = user_details;
  let { page } = userDetail;
  page = page - 1;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card className="card-style shadow">
            <CardHeader>
              <i className="fas fa-users"></i>
              <strong>Posts</strong>
            </CardHeader>
            <CardBody>
              <Col md="12">
                <Row>
                  <Col md="12">
                    <div className="text-right">
                      <Tooltip
                        title="Add User"
                        position="bottom"
                        arrow={true}
                        distance={15}
                        trigger="mouseenter"
                      >
                        <Link to="/user/add">
                          <Button size="md" className="btnColor btn-brand my-4">
                            <i className="fa fa-plus"></i>
                            <span>Add</span>
                          </Button>
                        </Link>
                      </Tooltip>
                    </div>
                  </Col>
                  <Col md="6" className="pl-0">
                    <div className="text-left">
                      <span className="">Show</span>
                      <select
                        type="text"
                        name="pageLimit"
                        value={pageLimit}
                        onChange={(e) => setPageLimit(e.target.value)}
                        className="form-control list-style  d-inline  mx-2"
                      >
                        <option value={10}>10 </option>
                        <option value={20}>20 </option>
                        <option value={50}>50 </option>
                        <option value={100}>100 </option>
                      </select>
                    </div>
                  </Col>
                  <Col md="6" className="pr-0">
                    <div className="text-right">
                      <span className="">Search : </span>
                      <input
                        type="text"
                        name="search"
                        className="form-control w-50 input  d-inline"
                        onKeyPress={(e) => onFieldKeyPress(e)}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Table responsive striped className="mt-2 customDataTable">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetail &&
                  userDetail.docs.length > 0 &&
                  !userDetailLoading ? (
                    userDetail.docs.map((user, i) => (
                      <tr key={i}>
                        <td>{page * pageLength + (i + 1)}</td>
                        <td>
                          {user.first_name} {user.last_name}
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <Link to={`/user/view/${user._id}`}>
                            <Tooltip
                              title="View User"
                              position="bottom"
                              arrow={true}
                              distance={15}
                              trigger="mouseenter"
                            >
                              <Button
                                size="md"
                                className="btn-twitter btn-brand ml-2"
                                type="button"
                              >
                                <i className="fa fa-eye"></i>
                              </Button>
                            </Tooltip>
                          </Link>

                          <Link to={`/user/edit/${user._id}`}>
                            <Tooltip
                              title="Edit User"
                              position="bottom"
                              arrow={true}
                              distance={15}
                              trigger="mouseenter"
                            >
                              <Button
                                size="md"
                                className="btn-spotify btn-brand ml-2"
                                type="button"
                              >
                                <i className="fa fa-pencil"></i>
                              </Button>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete User"
                            position="bottom"
                            arrow={true}
                            distance={15}
                            trigger="mouseenter"
                          >
                            <Button
                              size="md"
                              className="btn-youtube btn-brand ml-2"
                              onClick={() => onDeleteUser(user)}
                              type="button"
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : userDetailLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        <Spinner type="grow" />
                      </td>
                    </tr>
                  ) : userDetail.docs.length === 0 && !userDetailLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        No User found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </Table>
              <div className="row float-right">
                <div className="col-md-12 ">
                  {paginationSection(userDetail)}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_details: state.user_details,
});
export default connect(mapStateToProps, {
  getUserList,
  deleteUser,
})(User);
