import classnames from "classnames";
import React, { useEffect, useState } from "react";
import LaddaButton, { ZOOM_OUT } from "react-ladda/dist/LaddaButton";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Tooltip } from "react-tippy";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
  Table,
  CardHeader,
} from "reactstrap";
import swal from "sweetalert";
import {
  addCommunityForum,
  deleteCommunityForum,
  getCommunityForum,
  updateCommunityForum,
  getUserDropDown,
} from "../../actions/CommunityForumActions";
import { checkEmptyValidation } from "../../Helpers/Validation";
import Select from "react-select";

const Index = (props) => {
  const {
    getCommunityForum,
    community_Forum,
    deleteCommunityForum,
    addCommunityForum,
    updateCommunityForum,
    getUserDropDown,
  } = props;
  let history = useHistory();
  const { _id } = useParams();
  const [UpdateData, setUpdateData] = useState(null);
  const [editId, setEditId] = useState("");
  const [search, setSearch] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageLength, setPageLength] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSaveLoading] = useState(false);
  const [getUserList, setUserList] = useState({ userlist_options: [] });

  const [state, setstate] = useState({
    title: "",
    description: "",
    users: "",
    UpVote: "",
    tags: "",
    downVote: "",
  });

  const [errors, seterrors] = useState({
    error_title: "",
    error_description: "",
    error_short_description: "",
    error_downVote: "",
    error_km_driven: "",
    error_tags: "",
  });

  useEffect(() => {
    getCommunityForum(pageLength, pageLimit, "");
  }, [pageLength, pageLimit]);

  useEffect(() => {
    getUserDropDown().then((res) => {
      console.log("res", res);
      var response = res.data.result.map((s) => {
        return {
          value: s._id,
          label: s.first_name + " " + s.last_name,
        };
      });
      console.log("response", response);
      setUserList({
        userlist_options: response,
      });
    });
  }, []);

  const setDefaultValue = () => {
    setShowModal(!showModal);
  };

  const onSelectUser = (value) => {
    setstate({
      ...state,
      users: value ? value.value : "",
    });
  };

  const onAddNewEVJourney = () => {
    setUpdateData(false);
    setDefaultValue();
    setstate({
      title: "",
      description: "",
      users: "",
      UpVote: "",
      tags: "",
      downVote: "",
    });
    seterrors({
      error_title: "",
      error_description: "",
      error_short_description: "",
      error_km_driven: "",
      error_tags: "",
    });
  };

  const toggleModal = () => {
    setDefaultValue();
    setSaveLoading(false);
  };

  const onEditCommunityForum = (response) => {
    console.log("response", response);
    setUpdateData(true);
    setDefaultValue();
    setEditId(response._id);
    setstate({
      ...state,
      title: response.title,
      description: response.description,
      users: response.user,
      UpVote: response.upVote,
      downVote: response.downVote,
      tags: response.category,
    });
    setShowModal(!showModal);
  };

  const onFieldKeyPress = (e) => {
    if (e.target.name === "search") {
      if (e.key === "Enter") {
        getCommunityForum(pageLength, pageLimit, e.target.value);
      }
    }
  };
  const handleInputChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { title, description, users, UpVote, tags, downVote } = state;
    let validationFlag = true;
    let errTitle = "";
    let errDescription = "";
    errTitle = checkEmptyValidation(title, "Title");
    errDescription = checkEmptyValidation(description, "Description");
    if (errTitle || errDescription) {
      validationFlag = false;
      seterrors({
        error_title: errTitle,
        error_description: errDescription,
      });
    } else {
      validationFlag = true;
      seterrors({
        error_title: "",
        error_description: "",
        error_duration: "",
        error_km_driven: "",
        error_short_description: "",
        error_tags: "",
      });
    }
    if (validationFlag === true) {
      setSaveLoading(true);
      const addCommunityDetails = {
        title: title,
        description: description,
        upVote: UpVote,
        downVote: downVote,
        category: tags.toString(),
        user: users,
      };

      if (UpdateData === true) {
        updateCommunityForum(editId, addCommunityDetails)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setDefaultValue();
            getCommunityForum(pageLength, pageLimit, "");
            setTimeout(() => {
              history.push(`/community-forum`);
            }, 1300);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      } else {
        addCommunityForum(addCommunityDetails)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setDefaultValue();
            getCommunityForum(pageLength, pageLimit, "");
            setTimeout(() => {
              history.push(`/community-forum`);
            }, 1300);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    }
  };

  const onDeleteCommunityForum = (user) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete user's Community Forum ${user.title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCommunityForum(user._id)
          .then((result) => {
            toast.success(result.data.message);
            getCommunityForum(pageLength, pageLimit, "");
          })
          .catch((err) => {
            if (err.response !== undefined) {
              toast.error(err.response.data.message);
            }
          });
      }
    });
  };

  const onPageClick = (page) => {
    getCommunityForum(page, pageLimit, "");
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
      <nav>
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

  const { communityDetails, communityForumLoading } = community_Forum;
  let { page } = communityDetails;
  page = page - 1;

  return (
    <div className="animated fadeIn">
      <ToastContainer position="top-right" autoClose={3000} />
      <Row>
        <Col xs="12">
          <Card body className="px-0 py-0">
            <CardHeader>
              <i className="fas fa-users"></i>
              <strong>Community forum</strong>
            </CardHeader>
            <CardBody className="px-3 py-3">
              <Col md="12">
                <Row>
                  <Col md="12">
                    <div className="text-right">
                      <Tooltip
                        title="Add Community Forum"
                        position="bottom"
                        arrow={true}
                        distance={15}
                        trigger="mouseenter"
                      >
                        <Button
                          size="md"
                          className="btnColor btn-brand my-4"
                          onClick={() => onAddNewEVJourney()}
                        >
                          <i className="fa fa-plus"></i>
                          <span>Add</span>
                        </Button>
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
                    <th>Topic name</th>
                    <th>User</th>
                    <th>Up Vote</th>
                    <th>Down Vote</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {communityDetails &&
                  communityDetails.docs.length > 0 &&
                  !communityForumLoading ? (
                    communityDetails.docs.map((user, i) => (
                      <tr key={i}>
                        <td>{page * pageLength + (i + 1)}</td>
                        <td>{user.title}</td>
                        <td>
                          {user.userData.first_name} {user.userData.last_name}
                        </td>
                        <td>{user.upVote}</td>
                        <td>{user.downVote}</td>
                        <td>
                          <Tooltip
                            title="Edit Community Forum"
                            position="bottom"
                            arrow={true}
                            distance={15}
                            trigger="mouseenter"
                          >
                            <Button
                              size="md"
                              className="btn-spotify btn-brand ml-2"
                              onClick={() => onEditCommunityForum(user)}
                              type="button"
                            >
                              <i className="fa fa-pencil"></i>
                            </Button>
                          </Tooltip>
                          <Tooltip
                            title="Delete Community Forum"
                            position="bottom"
                            arrow={true}
                            distance={15}
                            trigger="mouseenter"
                          >
                            <Button
                              size="md"
                              className="btn-youtube btn-brand ml-2"
                              onClick={() => onDeleteCommunityForum(user)}
                              type="button"
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : communityForumLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        <Spinner type="grow" />
                      </td>
                    </tr>
                  ) : communityDetails.docs.length === 0 &&
                    !communityForumLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        No Community Forum found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Topic name</th>
                    <th>User</th>
                    <th>Up Vote</th>
                    <th>Down Vote</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </Table>
              <div className="row float-right">
                <div className="col-md-12 ">
                  {paginationSection(communityDetails)}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Modal size="lg" isOpen={showModal}>
          <ModalHeader toggle={toggleModal}>
            {UpdateData ? "Edit Community Forum" : "Add Community Forum"}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label>Title</Label>
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    onChange={(e) => handleInputChange(e)}
                    style={{ height: "auto" }}
                    value={state.title || ""}
                    className={classnames(
                      "form-control input",
                      {
                        invalid: errors.error_title.length > 0,
                      },
                      {
                        valid: errors.error_title.length === 0,
                      }
                    )}
                  />
                  {errors.error_title && (
                    <span className="invalid-text ">{errors.error_title}</span>
                  )}
                </FormGroup>
              </Col>

              <Col xs="12">
                <FormGroup row>
                  <Col xs="12">
                    <label>Description</label>
                    <span className="required">*</span>
                  </Col>

                  <Col xs="12">
                    <Input
                      type="textarea"
                      placeholder="Enter description"
                      name="description"
                      onChange={(e) => handleInputChange(e)}
                      style={{ height: "auto" }}
                      value={state.description || ""}
                      className={classnames(
                        "form-control input",
                        {
                          invalid: errors.error_description.length > 0,
                        },
                        {
                          valid: errors.error_description.length === 0,
                        }
                      )}
                    />
                    {errors.error_description && (
                      <span className="invalid-text ">
                        {errors.error_description}
                      </span>
                    )}
                  </Col>
                </FormGroup>
              </Col>

              <Col xs="6">
                <FormGroup>
                  <Label>Users</Label>
                  <Select
                    name="getUserList"
                    placeholder="Select User"
                    value={getUserList.userlist_options.find(
                      (s) => s.value === state.users
                    )}
                    isClearable={true}
                    options={getUserList.userlist_options}
                    onChange={(e) => onSelectUser(e)}
                  ></Select>
                </FormGroup>
              </Col>

              <Col xs="6">
                <FormGroup>
                  <Label>Tags</Label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Enter Tags"
                    onChange={(e) => handleInputChange(e)}
                    style={{ height: "auto" }}
                    value={state.tags || ""}
                    className={classnames("form-control input")}
                  />
                </FormGroup>
              </Col>

              <Col xs="6">
                <FormGroup>
                  <Label>Up Vote</Label>
                  <input
                    type="number"
                    name="UpVote"
                    placeholder="Enter Up Vote"
                    onChange={(e) => handleInputChange(e)}
                    style={{ height: "auto" }}
                    value={state.UpVote || ""}
                    className={classnames("form-control input")}
                  />
                </FormGroup>
              </Col>

              <Col xs="6">
                <FormGroup>
                  <Label>Down Vote</Label>
                  <input
                    type="number"
                    name="downVote"
                    placeholder="Enter Down Vote"
                    onChange={(e) => handleInputChange(e)}
                    style={{ height: "auto" }}
                    value={state.downVote || ""}
                    className={classnames("form-control input")}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="px-4">
            <LaddaButton
              className="btn btnColor px-4 btn-ladda"
              loading={submitLoading}
              data-color="blue"
              data-style={ZOOM_OUT}
              onClick={(e) => onSubmitForm(e)}
            >
              {UpdateData ? "Submit" : "Update"}
            </LaddaButton>

            <button className="btn btn-outline cancel" onClick={toggleModal}>
              <span>Cancel</span>
            </button>
          </ModalFooter>
        </Modal>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  community_Forum: state.community_Forum,
});
export default connect(mapStateToProps, {
  getCommunityForum,
  deleteCommunityForum,
  addCommunityForum,
  updateCommunityForum,
  getUserDropDown,
})(Index);
