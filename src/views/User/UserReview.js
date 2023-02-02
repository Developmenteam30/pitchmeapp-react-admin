import classnames from "classnames";
import React, { useEffect, useState } from "react";
import Select from "react-select";
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
  Table,
} from "reactstrap";
import swal from "sweetalert";
import {
  addNewCarReview,
  deleteUserCarReview,
  getUserCarReview,
  getUserCarReviewById,
  updateUserCarReview,
  getCompanyDropDown,
  getModalDropDown,
} from "../../actions/userActions";
import { checkEmptyValidation } from "../../Helpers/Validation";

const UserReview = (props) => {
  const {
    getUserCarReview,
    user_details,
    deleteUserCarReview,
    addNewCarReview,
    updateUserCarReview,
    getUserCarReviewById,
    getCompanyDropDown,
    getModalDropDown,
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
  const [getCarBrand, setCarBrand] = useState({ car_brand_options: [] });
  const [getCarModal, setCarModal] = useState({ car_modal_options: [] });

  const [state, setstate] = useState({
    title: "",
    description: "",
    car_brand: "",
    car_modal: "",
    visual_appeal: "",
    reliability: "",
    comfort: "",
    performance: "",
    features: "",
    maintenance: "",
  });

  const [errors, seterrors] = useState({
    error_title: "",
    error_description: "",
  });

  useEffect(() => {
    getCompanyDropDown().then((res) => {
      var response = res.data.result.map((s) => {
        return {
          value: s._id,
          label: s.title,
        };
      });
      setCarBrand({
        car_brand_options: response,
      });
    });
  }, []);

  useEffect(() => {
    getUserCarReview(_id, pageLength, pageLimit, "");
  }, [_id, pageLength, pageLimit]);

  useEffect(() => {
    getModalDropDown(state.car_brand).then((res) => {
      var response = res.data.result.map((s) => {
        return {
          value: s._id,
          label: s.title,
        };
      });
      setCarModal({
        car_modal_options: response,
      });
    });
  }, [state.car_brand]);

  const onSelectOptions = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectCarBrand = (value) => {
    setstate({
      ...state,
      car_brand: value ? value.value : "",
    });
  };

  const onSelectCarModal = (value) => {
    setstate({
      ...state,
      car_modal: value ? value.value : "",
    });
  };

  const setDefaultValue = () => {
    setShowModal(!showModal);
  };

  const onaddNewCarReview = () => {
    setUpdateData(false);
    setDefaultValue();
    setstate({
      title: "",
      description: "",
      car_brand: "",
      visual_appeal: "",
      car_modal: "",
      reliability: "",
      comfort: "",
      performance: "",
      features: "",
      maintenance: "",
    });
    seterrors({
      error_title: "",
      error_description: "",
    });
  };

  const toggleModal = () => {
    setDefaultValue();
    setSaveLoading(false);
  };

  const onEditCarReview = (user) => {
    setUpdateData(true);
    setEditId(user._id);
    setDefaultValue();
    getUserCarReviewById(user._id).then((res) => {
      let response = res.data.result;
      setstate({
        ...state,
        title: response.title,
        description: response.description,
        car_brand: response.car_brand,
        visual_appeal: response.visual_appeal,
        car_modal: response.car_modal,
        reliability: response.reliability,
        comfort: response.comfort,
        performance: response.performance,
        features: response.features,
        maintenance: response.maintenance,
      });
      setShowModal(!showModal);
    });
  };

  const onFieldKeyPress = (e) => {
    if (e.target.name === "search") {
      if (e.key === "Enter") {
        getUserCarReview(_id, pageLength, pageLimit, e.target.value);
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
    const { title, description } = state;
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
      });
    }
    if (validationFlag === true) {
      setSaveLoading(true);
      const addReview = {
        brand: state.car_brand,
        model: state.car_modal,
        title: state.title,
        description: state.description,
        visual_appeal: state.visual_appeal,
        reliability: state.reliability,
        comfort: state.comfort,
        performance: state.performance,
        features: state.features,
        maintenance: state.maintenance,
      };
      
      if (_id) {
        addReview.user = _id;
      }

      if (UpdateData === true) {
        updateUserCarReview(editId, addReview)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            getUserCarReview(_id, pageLength, pageLimit, "");
            setDefaultValue();
            setTimeout(() => {
              history.push(`/user/view/${_id}`);
            }, 1300);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      } else {
        addNewCarReview(addReview)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            getUserCarReview(_id, pageLength, pageLimit, "");
            setDefaultValue();
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

  const ondeleteUserCarReview = (user) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete user's Review ${user.title} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUserCarReview(user._id)
          .then((result) => {
            toast.success(result.data.message);
            getUserCarReview(_id, pageLength, pageLimit, "");
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
    getUserCarReview(_id, page, pageLimit, "");
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

  const { userCarReview, userCarReviewLoading } = user_details;
  let { page } = userCarReview;
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
                        title="Add Review"
                        position="bottom"
                        arrow={true}
                        distance={15}
                        trigger="mouseenter"
                      >
                        <Button
                          size="md"
                          className="btnColor btn-brand my-4"
                          onClick={() => onaddNewCarReview()}
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
                    <th>Brand Name</th>
                    <th>Model Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userCarReview &&
                  userCarReview.docs.length > 0 &&
                  !userCarReviewLoading ? (
                    userCarReview.docs.map((user, i) => (
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
                        <td>{user.brandData.title}</td>
                        <td>{user.modelData.title}</td>
                        <td>
                          <Tooltip
                            title="Edit Review"
                            position="bottom"
                            arrow={true}
                            distance={15}
                            trigger="mouseenter"
                          >
                            <Button
                              size="md"
                              className="btn-spotify btn-brand ml-2"
                              onClick={() => onEditCarReview(user)}
                              type="button"
                            >
                              <i className="fa fa-pencil"></i>
                            </Button>
                          </Tooltip>
                          <Tooltip
                            title="Delete Review"
                            position="bottom"
                            arrow={true}
                            distance={15}
                            trigger="mouseenter"
                          >
                            <Button
                              size="md"
                              className="btn-youtube btn-brand ml-2"
                              onClick={() => ondeleteUserCarReview(user)}
                              type="button"
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : userCarReviewLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        <Spinner type="grow" />
                      </td>
                    </tr>
                  ) : userCarReview.docs.length === 0 &&
                    !userCarReviewLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        No Review found
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
                    <th>Brand Name</th>
                    <th>Model Name</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </Table>
              <div className="row float-right">
                <div className="col-md-12 ">
                  {paginationSection(userCarReview)}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Modal size="lg" isOpen={showModal}>
          <ModalHeader toggle={toggleModal}>
            {UpdateData ? "Edit Review" : "Add Review"}
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
              {!UpdateData ? (
                <>
                  <Col xs="6">
                    <FormGroup>
                      <label>Brand</label>
                      <Select
                        name="getCarBrand"
                        placeholder="Select Brand"
                        value={getCarBrand.car_brand_options.find(
                          (s) => s.value === state.car_brand
                        )}
                        isClearable={true}
                        options={getCarBrand.car_brand_options}
                        onChange={(e) => onSelectCarBrand(e)}
                      ></Select>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <label>Modal</label>
                      <Select
                        name="getCarModal"
                        placeholder="Select Modal"
                        value={getCarModal.car_modal_options.find(
                          (s) => s.value === state.car_modal
                        )}
                        isClearable={true}
                        options={getCarModal.car_modal_options}
                        onChange={(e) => onSelectCarModal(e)}
                      ></Select>
                    </FormGroup>
                  </Col>
                </>
              ) : (
                ""
              )}

              <Col xs="4">
                <FormGroup>
                  <label>Visual Appeal</label>
                  <select
                    type="text"
                    name="visual_appeal"
                    value={state.visual_appeal}
                    onChange={(e) => onSelectOptions(e)}
                    className="form-control"
                  >
                    <option value={""}>Select Visual Appeal </option>
                    <option value={0}>0 </option>
                    <option value={1}>1 </option>
                    <option value={2}>2 </option>
                    <option value={3}>3 </option>
                    <option value={4}>4 </option>
                    <option value={5}>5 </option>
                  </select>
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <label>Reliability</label>
                  <select
                    type="text"
                    name="reliability"
                    value={state.reliability}
                    onChange={(e) => onSelectOptions(e)}
                    className="form-control"
                  >
                    <option value={""}>Select Reliability </option>
                    <option value={0}>0 </option>
                    <option value={1}>1 </option>
                    <option value={2}>2 </option>
                    <option value={3}>3 </option>
                    <option value={4}>4 </option>
                    <option value={5}>5 </option>
                  </select>
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <label>Comfort</label>
                  <select
                    type="text"
                    name="comfort"
                    value={state.comfort}
                    onChange={(e) => onSelectOptions(e)}
                    className="form-control"
                  >
                    <option value={""}>Select Comfort </option>
                    <option value={0}>0 </option>
                    <option value={1}>1 </option>
                    <option value={2}>2 </option>
                    <option value={3}>3 </option>
                    <option value={4}>4 </option>
                    <option value={5}>5 </option>
                  </select>
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <label>Performance</label>
                  <select
                    type="text"
                    name="performance"
                    value={state.performance}
                    onChange={(e) => onSelectOptions(e)}
                    className="form-control"
                  >
                    <option value={""}>Select Performance </option>
                    <option value={0}>0 </option>
                    <option value={1}>1 </option>
                    <option value={2}>2 </option>
                    <option value={3}>3 </option>
                    <option value={4}>4 </option>
                    <option value={5}>5 </option>
                  </select>
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <label>Features</label>
                  <select
                    type="text"
                    name="features"
                    value={state.features}
                    onChange={(e) => onSelectOptions(e)}
                    className="form-control"
                  >
                    <option value={""}>Select Features </option>
                    <option value={0}>0 </option>
                    <option value={1}>1 </option>
                    <option value={2}>2 </option>
                    <option value={3}>3 </option>
                    <option value={4}>4 </option>
                    <option value={5}>5 </option>
                  </select>
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <label>Maintenance</label>
                  <select
                    type="text"
                    name="maintenance"
                    value={state.maintenance}
                    onChange={(e) => onSelectOptions(e)}
                    className="form-control"
                  >
                    <option value={""}>Select Maintenance </option>
                    <option value={0}>0 </option>
                    <option value={1}>1 </option>
                    <option value={2}>2 </option>
                    <option value={3}>3 </option>
                    <option value={4}>4 </option>
                    <option value={5}>5 </option>
                  </select>
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
  user_details: state.user_details,
});
export default connect(mapStateToProps, {
  getUserCarReview,
  deleteUserCarReview,
  addNewCarReview,
  updateUserCarReview,
  getUserCarReviewById,
  getCompanyDropDown,
  getModalDropDown,
})(UserReview);
