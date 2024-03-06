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
import { addNewPost, getPostList, deletePost } from "../../actions/userActions";
import img from "../../assets/img/8.jpg";
import vid from "../../assets/img/XRecorder_31032022_110516.mp4";

const User = (props) => {
  const { getPostList, posts, deletePost } = props;
  const [search, setSearch] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageLength, setPageLength] = useState(1);
  const [type, setType] = useState("");

  useEffect(() => {
    getPostList(pageLength, pageLimit, "", type);
  }, [pageLength, pageLimit, getPostList, type]);

  const onDeletePost = (post) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete post ${post.title} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePost(post._id)
          .then((result) => {
            toast.success(result.data.message);
            getPostList(pageLength, pageLimit, "", type);
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
        getPostList(pageLength, pageLimit, e.target.value, type);
      }
    }
  };

  const onPageClick = (page) => {
    getPostList(page, pageLimit, "", type);
  };

  const handleClearSearch = () => {
    setSearch("");
    getPostList(pageLength, pageLimit, "", type);
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

  const { post, userDetailLoading } = posts;
  let { page } = post;
  page = page - 1;

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
              <strong>Posts</strong>
            </CardHeader>
            <CardBody>
              <Col md="12">
                <Row>
                  <Col md="12">
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
                      <span className="">Filter By : </span>
                      <select
                        type="text"
                        name="pageLength"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="form-control w-50 input  d-inline  mx-2"
                      >
                        <option>All</option>
                        <option value={1}>Articles</option>
                        <option value={2}>Images</option>
                        <option value={3}>Videos</option>
                      </select>
                    </div>
                  </Col>
                  {/* <Col md="4" className="pr-0">
                    <div className="text-right">
                      <span className="">Search : </span>
                      <input
                        type="text"
                        name="search"
                        placeholder="Search by title"
                        className="form-control w-75 input  d-inline"
                        onKeyPress={(e) => onFieldKeyPress(e)}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <button
                        type="button"
                        class="btn bg-transparent mb-1"
                        style={{ marginLeft: -40, zIndex: 100 }}
                        onClick={handleClearSearch}
                      >
                        <i class="fa fa-times"></i>
                      </button>
                    </div>
                  </Col> */}
                </Row>
              </Col>
              <Table responsive striped className="mt-2 customDataTable">
                <thead>
                  <tr className="postsRow">
                    <th>Sr. No.</th>
                    {/* <th>Title</th> */}
                    <th>Type</th>
                    <th>Tags</th>
                    <th>Category</th>
                    <th style={{ float: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {post.docs.length
                    ? post.docs.map((obj, indx) => (
                        <tr key={indx}>
                          <td>{page * 10 + indx + 1}</td>
                          {/* <td>{obj.title}</td> */}
                          <td>
                            {obj.type == 1
                              ? "Article"
                              : obj.type == 2
                              ? "Image"
                              : "Video"}
                          </td>
                          <td style={{width: '100px'}}>
                            {obj.tags}
                          </td>
                          <td>
                            {obj.category}
                          </td>
                          <td align="right">
                            <Link
                              to={{
                                pathname: `/posts/edit/${obj._id}`,
                                state: { obj },
                              }}
                            >
                              <Tooltip
                                title="Edit Post"
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
                                onClick={() => onDeletePost(obj)}
                                type="button"
                              >
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
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
                {/* <tr>
                    <td>Today's Posts</td>
                    <td>Article</td>
                    <td>
                      <Link to={`/posts/edit`}>
                        <Tooltip
                          title="Edit Post"
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
                          className="btn-youtube btn cncllBtn ml-2"
                          onClick={() => onDeleteUser()}
                          type="button"
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td>Today's Image</td>
                    <td>Image</td>
                    <td>
                      <Link to={`/posts/edit`}>
                        <Tooltip
                          title="Edit Post"
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
                          className="btn-youtube btn cncllBtn ml-2"
                          onClick={() => onDeleteUser()}
                          type="button"
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td>Today's Video</td>
                    <td>Video</td>
                    <td>
                      <Link to={`/posts/edit`}>
                        <Tooltip
                          title="Edit Post"
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
                          className="btn-youtubebtn btn cncllBtn ml-2"
                          onClick={() => onDeleteUser()}
                          type="button"
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
                      </Tooltip>
                    </td>
                  </tr> */}

                {/* <tfoot>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </tfoot> */}
              </Table>
              {!post.docs.length && (
                <center style={{ fontSize: 20 }}>No record found</center>
              )}

              <div className="row float-right">
                <div className="col-md-12 ">{paginationSection(post)}</div>
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
  getPostList,
  deletePost,
})(User);
