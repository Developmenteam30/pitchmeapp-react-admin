import classnames from "classnames";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda/dist/LaddaButton";
import ReadMore from "react-read-more-read-less";
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
  Table
} from "reactstrap";
import swal from "sweetalert";
import {
  addNewEVJourney, deleteUserEVJourney,
  getUserEVJourney, getUserEVJourneyById, updateUserEVJourney
} from "../../actions/userActions";
import { checkEmptyValidation } from "../../Helpers/Validation";

const UserEvDetail = (props) => {
  const {
    getUserEVJourney,
    user_details,
    deleteUserEVJourney,
    addNewEVJourney,
    updateUserEVJourney,
    getUserEVJourneyById,
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
  const [photoError, setPhotoError] = useState("");
  const [imagePreview, setPreview] = useState([]);
  const [imagePreviewUrl, setUrl] = useState([]);
  const [durationDate, setDurationDate] = useState("");

  const [state, setstate] = useState({
    title: "",
    description: "",
    short_description: "",
    km_driven: "",
    tags: "",
  });

  const [errors, seterrors] = useState({
    error_title: "",
    error_description: "",
    error_short_description: "",
    error_duration: "",
    error_km_driven: "",
    error_tags: "",
  });

  const setDefaultValue = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getUserEVJourney(_id, pageLength, pageLimit, "");
  }, [_id, pageLength, pageLimit]);

  const onAddNewEVJourney = () => {
    setUpdateData(false);
    setDefaultValue();
    setstate({
      title: "",
      description: "",
      short_description: "",
      km_driven: "",
      tags: "",
    });
    seterrors({
      error_title: "",
      error_description: "",
      error_short_description: "",
      error_km_driven: "",
      error_tags: "",
    });
    setUrl([]);
    setPreview([]);
    setDurationDate("");
  };

  const toggleModal = () => {
    setDefaultValue();
    setSaveLoading(false);
  };

  const onEditEvJourney = (user) => {
    setUpdateData(true);
    setEditId(user._id);
    setDefaultValue();
    getUserEVJourneyById(user._id).then((res) => {
      let response = res.data.result;
      setstate({
        ...state,
        title: response.title,
        description: response.description,
        short_description: response.short_description,
        km_driven: response.km_driven,
        tags: response.tags,
      });
      setUrl(response.image);
      setPreview(response.image);
      setShowModal(!showModal);
      setDurationDate(response.duration);
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    let images = [];
    let imageUrl = [];
    for (let i = 0; i < e.target.files.length; i++) {
      imageUrl.push(e.target.files[i]);
      images.push(URL.createObjectURL(e.target.files[i]));
      setUrl(imageUrl);
      setPreview(images);
    }
  };

  const onFieldKeyPress = (e) => {
    if (e.target.name === "search") {
      if (e.key === "Enter") {
        getUserEVJourney(_id, pageLength, pageLimit, e.target.value);
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
    const { title, description, short_description, km_driven, tags } = state;
    let validationFlag = true;
    let errTitle = "";
    let errDescription = "";
    let errShortDescription = "";
    let errDuration = "";
    let errtags = "";
    let errKmDriven = "";
    let errImage = "";
    errTitle = checkEmptyValidation(title, "Title");
    errDescription = checkEmptyValidation(description, "Description");
    errShortDescription = checkEmptyValidation(
      short_description,
      "Short Description"
    );
    errDuration = checkEmptyValidation(durationDate, "Duration Date");
    errtags = checkEmptyValidation(tags, "Tags");
    errKmDriven = checkEmptyValidation(km_driven, "Km Driven");
    errImage = checkEmptyValidation(imagePreviewUrl, "Image");
    if (
      errTitle ||
      errDescription ||
      errImage ||
      errShortDescription ||
      errDuration ||
      errtags ||
      errKmDriven
    ) {
      validationFlag = false;
      seterrors({
        error_title: errTitle,
        error_description: errDescription,
        error_duration: errDuration,
        error_km_driven: errKmDriven,
        error_short_description: errShortDescription,
        error_tags: errtags,
      });
      setPhotoError(errImage);
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
      setPhotoError("");
    }
    if (validationFlag === true) {
      setSaveLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("short_description", short_description);
      formData.append("duration", format(durationDate, "yyyy-MM-dd"));
      formData.append("km_driven", km_driven);
      formData.append("tags", tags);
      for (let i = 0; i < imagePreviewUrl.length; i++) {
        formData.append("image", imagePreviewUrl[i]);
      }
      if (UpdateData === false) {
        formData.append("user", _id);
      }
      if (UpdateData === true) {
        updateUserEVJourney(editId, formData)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setDefaultValue();
            getUserEVJourney(_id, pageLength, pageLimit, "");
            setTimeout(() => {
              history.push(`/user/view/${_id}`);
            }, 1300);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      } else {
        addNewEVJourney(formData)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setDefaultValue();
            getUserEVJourney(_id, pageLength, pageLimit, "");
            setTimeout(() => {
              history.push(`/user/view/${_id}`);
            }, 1300);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    }
  };

  const ondeleteUserEVJourney = (user) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete user's Ev Journey ${user.title} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUserEVJourney(user._id)
          .then((result) => {
            toast.success(result.data.message);
            getUserEVJourney(_id, pageLength, pageLimit, "");
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
    getUserEVJourney(_id, page, pageLimit, "");
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

  const { userEvJourney, userEvJourneyLoading } = user_details;
  let { page } = userEvJourney;
  page = page - 1;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card body className="px-0 py-0">
            <CardBody className="px-3 py-3">
              <Col md="12">
                <Row>
                  <Col md="12">
                    <div className="text-right">
                      <Tooltip
                        title="Add Ev Journey"
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
                    <th>User Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userEvJourney &&
                  userEvJourney.docs.length > 0 &&
                  !userEvJourneyLoading ? (
                    userEvJourney.docs.map((user, i) => (
                      <tr key={i}>
                        <td>{page * pageLength + (i + 1)}</td>
                        <td>
                          {user.userData.first_name} {user.userData.last_name}
                        </td>
                        <td>{user.title}</td>
                        <td className="readmore-box">
                          <ReadMore
                            charLimit={25}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                          >
                            {user.description}
                          </ReadMore>
                        </td>
                        <td>
                          <Tooltip
                            title="Edit Ev Journey"
                            position="bottom"
                            arrow={true}
                            distance={15}
                            trigger="mouseenter"
                          >
                            <Button
                              size="md"
                              className="btn-spotify btn-brand ml-2"
                              onClick={() => onEditEvJourney(user)}
                              type="button"
                            >
                              <i className="fa fa-pencil"></i>
                            </Button>
                          </Tooltip>
                          <Tooltip
                            title="Delete Ev Journey"
                            position="bottom"
                            arrow={true}
                            distance={15}
                            trigger="mouseenter"
                          >
                            <Button
                              size="md"
                              className="btn-youtube btn-brand ml-2"
                              onClick={() => ondeleteUserEVJourney(user)}
                              type="button"
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : userEvJourneyLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        <Spinner type="grow" />
                      </td>
                    </tr>
                  ) : userEvJourney.docs.length === 0 &&
                    !userEvJourneyLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        No Ev Journey found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>User Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </Table>
              <div className="row float-right">
                <div className="col-md-12 ">
                  {paginationSection(userEvJourney)}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Modal size="lg" isOpen={showModal}>
          <ModalHeader toggle={toggleModal}>
            {UpdateData ? "Edit Ev Journey" : "Add Ev Journey"}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
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

              <Col xs="6">
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
                  <Label>Short Description</Label>
                  <span className="required">*</span>
                  <Input
                    type="textarea"
                    name="short_description"
                    placeholder="Enter Short Description"
                    onChange={(e) => handleInputChange(e)}
                    style={{ height: "auto" }}
                    value={state.short_description || ""}
                    className={classnames("form-control input", {
                      invalid: errors.error_short_description.length > 0,
                    })}
                  />
                  {errors.error_short_description && (
                    <span className="invalid-text ">
                      {errors.error_short_description}
                    </span>
                  )}
                </FormGroup>
              </Col>

              <Col xs="6">
                <FormGroup>
                  <Label>Duration</Label>
                  <span className="required">*</span>
                  <DatePicker
                    className="form-control input"
                    selected={durationDate}
                    onChange={(date) => setDurationDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Date"
                  />

                  {errors.error_duration && (
                    <span className="invalid-text ">
                      {errors.error_duration}
                    </span>
                  )}
                </FormGroup>
              </Col>

              <Col xs="6">
                <FormGroup>
                  <Label>Distance Travelled (Km)</Label>
                  <span className="required">*</span>
                  <input
                    type="number"
                    name="km_driven"
                    placeholder="Enter Km Driven"
                    onChange={(e) => handleInputChange(e)}
                    style={{ height: "auto" }}
                    value={state.km_driven || ""}
                    className={classnames(
                      "form-control input",
                      {
                        invalid: errors.error_km_driven.length > 0,
                      },
                      {
                        valid: errors.error_km_driven.length === 0,
                      }
                    )}
                  />
                  {errors.error_km_driven && (
                    <span className="invalid-text ">
                      {errors.error_km_driven}
                    </span>
                  )}
                </FormGroup>
              </Col>

              <Col xs="6">
                <FormGroup>
                  <Label>Tags</Label>
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Enter Tags"
                    onChange={(e) => handleInputChange(e)}
                    style={{ height: "auto" }}
                    value={state.tags || ""}
                    className={classnames(
                      "form-control input",
                      {
                        invalid: errors.error_tags.length > 0,
                      },
                      {
                        valid: errors.error_tags.length === 0,
                      }
                    )}
                  />
                  {errors.error_tags && (
                    <span className="invalid-text ">{errors.error_tags}</span>
                  )}
                </FormGroup>
              </Col>

              <Col md="6">
                <Label>Image</Label>
                <input
                  id="image"
                  type="file"
                  multiple
                  accept="image/*"
                  capture="camera"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  style={{ height: "auto" }}
                  className={classnames(
                    "form-control py-1 my-0 image-picker-input",
                    {
                      invalid: photoError.length > 0,
                    },
                    {
                      valid: photoError.length === 0,
                    }
                  )}
                />
                {photoError.length > 0 && (
                  <div className="w-100">
                    <span className="invalid-text ">{photoError}</span>
                  </div>
                )}
                {imagePreview.length > 0 &&
                  imagePreview.map((image, i) => (
                    <span key={i}>
                      <img
                        src={image}
                        className="border-rounded"
                        alt=""
                        style={{
                          margin: "10px",
                          width: "75px",
                          objectFit: "cover",
                        }}
                      />
                    </span>
                  ))}
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
  user_details: state.user_details,
});
export default connect(mapStateToProps, {
  getUserEVJourney,
  deleteUserEVJourney,
  addNewEVJourney,
  updateUserEVJourney,
  getUserEVJourneyById,
})(UserEvDetail);
