import classnames from "classnames";
import "ladda/dist/ladda-themeless.min.css";
import "quill/dist/quill.snow.css";
import React, { useState } from "react";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

const UpdateVehicalDetails = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [imagePreview, setPreview] = useState("");
  const [imagePreviewUrl, setUrl] = useState("");
  const [color_code, setColor_code] = useState([]);
  const [color_codeError, setcolor_codeError] = useState("");
  const [specificationError, setSpecificationError] = useState("");
  const [specification, setSpecification] = useState([]);

  const [state, setstate] = useState({
    company: "",
    title: "",
    state: "",
    city: "",
    pin_code: "",
    ex_showroom_price: "",
    registration_price: "",
    insurance_price: "",
    other_charges: "",
    subsidy_price: "",
    waiting_period: "",
    launch_date: "",
    vehicle_type: "",
  });

  const [errors, seterrors] = useState({
    error_company: "",
    error_title: "",
    error_state: "",
    error_city: "",
    error_pin_code: "",
    error_ex_showroom_price: "",
    error_registration_price: "",
    error_insurance_price: "",
    error_other_charges: "",
    error_subsidy_price: "",
    error_waiting_period: "",
    error_launch_date: "",
    error_vehicle_type: "",
  });

  const handleInputChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files.length) {
      let file = e.target.files[0];
      setUrl(file);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSelectVehicalType = (e) => {
    // const CAT_ID = e.target.value;
    // setstate({
    //   ...state,
    //   category_id: CAT_ID,
    // });
    // const SUB_ID = { category_id: CAT_ID };
    // props.getSubCategoryById(SUB_ID);
  };

  const containerStyle = {
    zIndex: 1999,
  };

  return (
    <div className="animated fadeIn">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={containerStyle}
      />
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fas fa-car"></i>
              <strong>Update Vehical Details</strong>
            </CardHeader>
            <CardBody>
              <form>
                <Row>
                  <Col xs="12">
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Vehical Name</label>
                          <input
                            type="text"
                            name="title"
                            placeholder="Enter Vehical Name"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.title}
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
                            <span className="invalid-text ">
                              {errors.error_title}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Company Name</label>
                          <input
                            type="text"
                            name="company"
                            placeholder="Enter Company Name"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.company}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_company.length > 0,
                              },
                              {
                                valid: errors.error_company.length === 0,
                              }
                            )}
                          />
                          {errors.error_company && (
                            <span className="invalid-text ">
                              {errors.error_company}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <strong>Company Address</strong>
                    <hr className="mt-0" />
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            placeholder="Enter State"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.state}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_state.length > 0,
                              },
                              {
                                valid: errors.error_state.length === 0,
                              }
                            )}
                          />
                          {errors.error_state && (
                            <span className="invalid-text ">
                              {errors.error_state}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            placeholder="Enter City"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.city}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_city.length > 0,
                              },
                              {
                                valid: errors.error_city.length === 0,
                              }
                            )}
                          />
                          {errors.error_city && (
                            <span className="invalid-text ">
                              {errors.error_city}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Pincode</label>
                          <input
                            type="number"
                            name="pin_code"
                            placeholder="Enter Pincode"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.pin_code}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_pin_code.length > 0,
                              },
                              {
                                valid: errors.error_pin_code.length === 0,
                              }
                            )}
                          />
                          {errors.error_pin_code && (
                            <span className="invalid-text ">
                              {errors.error_pin_code}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <strong>Price of the Vehical</strong>
                    <hr className="mt-0" />
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Ex Showroom Price</label>
                          <input
                            type="number"
                            name="ex_showroom_price"
                            placeholder="Enter Ex Showroom Price"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.ex_showroom_price}
                            className={classnames(
                              "form-control input",
                              {
                                invalid:
                                  errors.error_ex_showroom_price.length > 0,
                              },
                              {
                                valid:
                                  errors.error_ex_showroom_price.length === 0,
                              }
                            )}
                          />
                          {errors.error_ex_showroom_price && (
                            <span className="invalid-text ">
                              {errors.error_ex_showroom_price}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Registration Price</label>
                          <input
                            type="number"
                            name="registration_price"
                            placeholder="Enter Registration Price"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.registration_price}
                            className={classnames(
                              "form-control input",
                              {
                                invalid:
                                  errors.error_registration_price.length > 0,
                              },
                              {
                                valid:
                                  errors.error_registration_price.length === 0,
                              }
                            )}
                          />
                          {errors.error_registration_price && (
                            <span className="invalid-text ">
                              {errors.error_registration_price}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Insurance Price</label>
                          <input
                            type="number"
                            name="insurance_price"
                            placeholder="Enter Insurance Price"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.insurance_price}
                            className={classnames(
                              "form-control input",
                              {
                                invalid:
                                  errors.error_insurance_price.length > 0,
                              },
                              {
                                valid:
                                  errors.error_insurance_price.length === 0,
                              }
                            )}
                          />
                          {errors.error_insurance_price && (
                            <span className="invalid-text ">
                              {errors.error_insurance_price}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Other Charges</label>
                          <input
                            type="number"
                            name="other_charges"
                            placeholder="Enter Other Charges"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.other_charges}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_other_charges.length > 0,
                              },
                              {
                                valid: errors.error_other_charges.length === 0,
                              }
                            )}
                          />
                          {errors.error_other_charges && (
                            <span className="invalid-text ">
                              {errors.error_other_charges}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Subsidy Price</label>
                          <input
                            type="number"
                            name="subsidy_price"
                            placeholder="Enter Subsidy Price"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.subsidy_price}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_subsidy_price.length > 0,
                              },
                              {
                                valid: errors.error_subsidy_price.length === 0,
                              }
                            )}
                          />
                          {errors.error_subsidy_price && (
                            <span className="invalid-text ">
                              {errors.error_subsidy_price}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <strong>Other Specification</strong>
                    <hr className="mt-0" />
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Color Code</label>
                          <input
                            type="number"
                            name="color_code"
                            placeholder="Enter Color Code"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={color_code}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: color_codeError.length > 0,
                              },
                              {
                                valid: color_codeError.length === 0,
                              }
                            )}
                          />
                          {color_codeError && (
                            <span className="invalid-text ">
                              {color_codeError}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Waiting Period</label>
                          <input
                            type="number"
                            name="waiting_period"
                            placeholder="Enter Waiting Period"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.waiting_period}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_waiting_period.length > 0,
                              },
                              {
                                valid: errors.error_waiting_period.length === 0,
                              }
                            )}
                          />
                          {errors.error_waiting_period && (
                            <span className="invalid-text ">
                              {errors.error_waiting_period}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Launch Date</label>
                          <input
                            type="number"
                            name="launch_date"
                            placeholder="Enter Launch Date"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.launch_date}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_launch_date.length > 0,
                              },
                              {
                                valid: errors.error_launch_date.length === 0,
                              }
                            )}
                          />
                          {errors.error_launch_date && (
                            <span className="invalid-text ">
                              {errors.error_launch_date}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Specification</label>
                          <input
                            type="number"
                            name="specification"
                            placeholder="Enter Specification"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={specification}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: specificationError.length > 0,
                              },
                              {
                                valid: specificationError.length === 0,
                              }
                            )}
                          />
                          {specificationError && (
                            <span className="invalid-text ">
                              {specificationError}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Vehical Image</label>
                          <input
                            id="image"
                            type="file"
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
                              <span className="invalid-text ">
                                {photoError}
                              </span>
                            </div>
                          )}
                          {imagePreview !== "" && (
                            <img
                              src={imagePreview}
                              className="border-rounded"
                              alt=""
                              style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Vehical Type</label>
                          <select
                            style={{ height: "auto" }}
                            id="category_id"
                            placeholder="Select Category"
                            onChange={(e) => onSelectVehicalType(e)}
                            className={classnames(
                              "form-control input"
                              // {
                              //   invalid: errors.error_category_id.length > 0,
                              // },
                              // {
                              //   valid: errors.error_category_id.length === 0,
                              // }
                            )}
                          >
                            <option value="">Select Vehical Type</option>
                            <option value="1">Two Wheeler</option>
                            <option value="2">Four Wheeler</option>
                          </select>
                          {errors.error_vehicle_type && (
                            <span className="invalid-text ">
                              {errors.error_vehicle_type}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <div className="w-100 float-left mt-3 ml-3">
                        {/* <Link to="/company">
                          <LaddaButton
                            className="btn cncllBtn px-3 btn-ladda mr-2"
                            data-color="blue"
                            data-style={ZOOM_OUT}
                            // onClick={(e) => onCancelButn(e)}
                          >
                            Cancel
                          </LaddaButton>
                        </Link> */}
                        <LaddaButton
                          className="btn btnColor px-4 btn-ladda"
                          loading={saveLoading}
                          data-color="blue"
                          data-style={ZOOM_OUT}
                          // onClick={(e) => onSubmitForm(e)}
                        >
                          Save
                        </LaddaButton>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(UpdateVehicalDetails);
