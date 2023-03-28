import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";
import { toast, ToastContainer } from "react-toastify";
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
import { addNewPost, getUserSalespitch, deleteUserSalespitch } from "../../actions/userActions";
import img from "../../assets/img/8.jpg";
import vid from "../../assets/img/XRecorder_31032022_110516.mp4";

const User = (props) => {
  const { getUserSalespitch, posts, deleteUserSalespitch } = props;
  const [search, setSearch] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageLength, setPageLength] = useState(1);
  const [type, setType] = useState("");

  useEffect(() => {
    getUserSalespitch(pageLength, pageLimit, "", type);
  }, [pageLength, pageLimit, getUserSalespitch, type]);

  const ondeleteUserSalespitch = (post) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete post ${post.title} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUserSalespitch(post._id)
          .then((result) => {
            toast.success(result.data.message);
            getUserSalespitch(pageLength, pageLimit, "", type);
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
        getUserSalespitch(pageLength, pageLimit, e.target.value, type);
      }
    }
  };

  const onPageClick = (page) => {
    getUserSalespitch(page, pageLimit, "", type);
  };

  const handleClearSearch = () => {
    setSearch("");
    getUserSalespitch(pageLength, pageLimit, "", type);
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

  const { salespitch, userDetailLoading } = posts;
  let { page } = salespitch;
  page = page - 1;
console.log(salespitch);
  const containerStyle = {
    zIndex: 1999,
  };

  return (
    <div className="animated fadeIn">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        style={containerStyle}
      />
      <Row>
        <Col xs="12">
          <Card className="card-style shadow">
            <CardHeader>
              <i className="fas fa-images"></i>
              <strong>Sales Pitch</strong>
            </CardHeader>
            <CardBody>
              <Col md="12">
                <Row>
                  {/* <Col md="12">
                    <div className="text-right">
                      <Tooltip
                        title="Add Posts"
                        position="bottom"
                        arrow={true}
                        distance={15}
                        trigger="mouseenter"
                      >
                        <Link to="/posts/add">
                          <Button size="md" className="btnColor btn-brand my-4">
                            <i className="fa fa-plus"></i>
                            <span>Add</span>
                          </Button>
                        </Link>
                      </Tooltip>
                    </div>
                  </Col> */}
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
                      <span className="">Filter By : </span>
                      <select
                        type="text"
                        name="pageLength"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="form-control w-50 input  d-inline  mx-2"
                      >
                        <option value={''}>All</option>
                        <option value={'1'}>Pending</option>
                        <option value={'2'}>Approved</option>
                        <option value={'3'}>Rejected</option>
                      </select>
                    </div>
                  </Col>

                </Row>
              </Col>
              <Table responsive striped className="mt-2 customDataTable">
                <thead>
                  <tr className="postsRow">
                    <th>Sr. No.</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Industry</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th style={{ float: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {salespitch.docs.length
                    ? salespitch.docs.map((obj, indx) => (
                        <tr key={indx} style={{display: type && type != '' && obj.status != type ? 'none' : ''}}>
                          <td>{page * 10 + indx + 1}</td>
                          <td>{obj.title}</td>
                          <td>{obj.type}</td>
                          <td>{obj.industry}</td>
                          <td>{obj.location}</td>
                          <td>{obj.description}</td>
                          <td>{obj.status == '1' ? 'Pending' : obj.status == '2' ? 'Approved' : 'Rejected'}</td>
                          <td align="right">
                            <Link
                              to={{
                                pathname: `/salespitch/edit/${obj._id}`,
                                state: { obj },
                              }}
                            >
                              <Tooltip
                                title="Edit Sales Pitch"
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
                              title="Delete Post"
                              position="bottom"
                              arrow={true}
                              distance={15}
                              trigger="mouseenter"
                            >
                              <Button
                                size="md"
                                className="ml-2 btn-danger"
                                onClick={() => ondeleteUserSalespitch(obj)}
                                type="button"
                              >
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                              </Button>
                            </Tooltip>
                          </td>
                        </tr>
                      ))
                    : // <div className="my-5">
                      //   <tfoot style={{ fontSize: 30 }}>No record found</tfoot>
                      // </div>
                      ""}
                </tbody>

              </Table>
              {!salespitch.docs.length && (
                <center style={{ fontSize: 20 }}>No record found</center>
              )}

              <div className="row float-right">
                <div className="col-md-12 ">{paginationSection(salespitch)}</div>
              </div>
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
  getUserSalespitch,
  deleteUserSalespitch,
})(User);
