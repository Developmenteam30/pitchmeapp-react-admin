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
import { addNewPost, getIndustryList, deleteIndustry } from "../../actions/userActions";
import img from "../../assets/img/8.jpg";
import vid from "../../assets/img/XRecorder_31032022_110516.mp4";
import Switch from "react-switch";
const IndustryPost = (props) => {
  const { getIndustryList, posts, deleteIndustry } = props;
  const [search, setSearch] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageLength, setPageLength] = useState(1);
  const [type, setType] = useState("");
 const [checked, setChecked] = useState(false);
  useEffect(() => {
    getIndustryList(pageLength, pageLimit, "", type);
  }, [pageLength, pageLimit, getIndustryList, type]);

  const onDeleteIndustry = (post) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete post ${post.name} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteIndustry(post._id)
          .then((result) => {
            toast.success(result.data.message);
            getIndustryList(pageLength, pageLimit, "", type);
          })
          .catch((err) => {
            if (err.response !== undefined) {
              toast.error(err.response.data.message);
            }
          });
      }
    });
  };

  const handleChange = ()=>{
    setChecked(!checked);
  }
  // const handleChange = async () => {
    // var online = checked ? false : true;
    //  setChecked(!checked)
    // var dat = new FormData();
    // dat.append('online', online);
    // var data = await api.putdata(dat, "/api/frontend/user/customer", true);
    //console.log(data);
  // };
  const onFieldKeyPress = (e) => {
    if (e.target.name === "search") {
      if (e.key === "Enter") {
        getIndustryList(pageLength, pageLimit, e.target.value, type);
      }
    }
  };

  const onPageClick = (page) => {
    getIndustryList(page, pageLimit, "", type);
  };

  const handleClearSearch = () => {
    setSearch("");
    getIndustryList(pageLength, pageLimit, "", type);
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

  const { industry, userDetailLoading } = posts;
  let { page } = industry;
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
              <strong>Industry</strong>
            </CardHeader>
            <CardBody>
              <Col md="12">
                <Row>
                  <Col md="12">
                    <div className="text-right">
                      <Tooltip
                        title="Add Industry"
                        position="bottom"
                        arrow={true}
                        distance={15}
                        trigger="mouseenter"
                      >
                        <Link to="/industryadd" replace={true}>
                          <Button size="md" className="btnColor btn-brand my-4" >
                            <i className="fa fa-plus"></i>
                            <span>Add Industry</span>
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
                    <th>Industry name</th>
                    <th>Added By</th>
                    <th style={{ float: "right" }} className="pr-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {industry.docs.length
                    ? industry.docs.map((obj, indx) => (
                        <tr key={indx}>
                          <td>{page * 10 + indx + 1}</td>
                          <td>{obj.name}</td>
                          <td><span className={"badge badge-"+(obj.uploadedby && obj.uploadedby != '' ? 'danger' : 'info')}>{obj.uploadedby && obj.uploadedby != '' ? 'User' : 'Admin'}</span></td>
                          <td  align="right"  style={{paddingRight:30}}>
                            <Link
                              to={{
                                // pathname:'industryeditpost',
                                pathname: `/industryeditpost/${obj._id}`,
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
                                onClick={() => onDeleteIndustry(obj)}
                                type="button"
                              >
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                              </Button>
                            </Tooltip>
                            {/* <span style={{position:"absolute"}}>
                            <Tooltip
                              title="Enable/Disable"
                              position="bottom"
                              arrow={true}
                              distance={15}
                              trigger="mouseenter"
                            >
                            <Switch
                                className="pl-2"
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled', }}
                              />
                              </Tooltip>
                              </span> */}
                          </td>
                        </tr>
                      ))
                    : // <div className="my-5">
                      //   <tfoot style={{ fontSize: 30 }}>No record found</tfoot>
                      // </div>
                      ""}
                </tbody>

              </Table>
              {!industry.docs.length && (
                <center style={{ fontSize: 20 }}>No record found</center>
              )}

              <div className="row float-right">
                <div className="col-md-12 ">{paginationSection(industry)}</div>
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
  getIndustryList,
  deleteIndustry,
})(IndustryPost);
