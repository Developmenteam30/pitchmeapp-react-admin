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
import { addNewPost, getUserBiography, deleteUserBiography } from "../../actions/userActions";
import img from "../../assets/img/8.jpg";
import vid from "../../assets/img/XRecorder_31032022_110516.mp4";

const Biography = (props) => {
  const { getUserBiography, posts, deleteUserBiography } = props;
  const [search, setSearch] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageLength, setPageLength] = useState(1);
  const [type, setType] = useState("");

  useEffect(() => {
    getUserBiography(pageLength, pageLimit, "", type);

  }, [pageLength, pageLimit, getUserBiography, type]);

  const ondeleteUserBiography = (post) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete post ${post.title} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUserBiography(post._id)
          .then((result) => {
            toast.success(result.data.message);
            getUserBiography(pageLength, pageLimit, "", type);
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
        getUserBiography(pageLength, pageLimit, e.target.value, type);
      }
    }
  };

  const onPageClick = (page) => {
    getUserBiography(page, pageLimit, "", type);
  };

  const handleClearSearch = () => {
    setSearch("");
    getUserBiography(pageLength, pageLimit, "", type);
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

  const { biography, userDetailLoading } = posts;
  console.log(posts);
  if(Biography){
    var { page } = biography;
  }else{
    var page = 1;
  }

  page = page - 1;
  console.log(biography);
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
              <strong>Biography</strong>
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
                  <Col md="2" className="pl-0">
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
                  <Col md="5" className="pr-0">
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
                  <Col md="5" className="pr-0">
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
                  <tr className="postsRow">
                    <th>Sr. No.</th>
                    <th>Username</th>
                    <th>Profile Picture Status</th>
                    <th>ID Status</th>
                    <th>Skill Certificate Status</th>
                    <th>Proof Funds Status</th>
                    <th>Details Status</th>
                    <th style={{ float: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {biography && biography.docs.length
                    ? search && search != "" ? biography.docs.map((obj, indx) => obj.user && obj.user.username.indexOf(search) > -1 && (
                        <tr key={indx} style={{display: type && type != '' && obj.status != type ? 'none' : ''}}>
                          <td>{page * 10 + indx + 1}</td>
                          <td>{obj.user ? obj.user.username : ''}</td>
                          <td>{obj.status == '1' ? 'Pending' : obj.status == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td>{obj.Identitystatus == '1' ? 'Pending' : obj.Identitystatus == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td>{obj.SkillCertificatestatus == '1' ? 'Pending' : obj.SkillCertificatestatus == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td>{obj.ProofFundsstatus == '1' ? 'Pending' : obj.ProofFundsstatus == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td>{obj.textstatus == '1' ? 'Pending' : obj.textstatus == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td align="right">
                            <Link
                              to={{
                                pathname: `/Biography/edit/${obj._id}`,
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
                                onClick={() => ondeleteUserBiography(obj)}
                                type="button"
                              >
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                              </Button>
                            </Tooltip>
                          </td>
                        </tr>
                      )) :
                      biography.docs.map((obj, indx) => obj.user && (
                        <tr key={indx} style={{display: type && type != '' && obj.status != type ? 'none' : ''}}>
                          <td>{page * 10 + indx + 1}</td>
                          <td>{obj.user ? obj.user.username : ''}</td>
                          <td>{obj.status == '1' ? 'Pending' : obj.status == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td>{obj.Identitystatus == '1' ? 'Pending' : obj.Identitystatus == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td>{obj.SkillCertificatestatus == '1' ? 'Pending' : obj.SkillCertificatestatus == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td>{obj.ProofFundsstatus == '1' ? 'Pending' : obj.ProofFundsstatus == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td>{obj.textstatus == '1' ? 'Pending' : obj.textstatus == '2' ? 'Verified' : 'Not Verified'}</td>
                          <td align="right">
                            <Link
                              to={{
                                pathname: `/Biography/edit/${obj._id}`,
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
                                onClick={() => ondeleteUserBiography(obj)}
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
              {!biography || !biography.docs.length && (
                <center style={{ fontSize: 20 }}>No record found</center>
              )}

              <div className="row float-right">
                <div className="col-md-12 ">{biography ? paginationSection(biography) : null}</div>
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
  getUserBiography,
  deleteUserBiography,
})(Biography);
