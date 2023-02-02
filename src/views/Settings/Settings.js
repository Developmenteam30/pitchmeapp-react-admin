import classnames from "classnames";
import "ladda/dist/ladda-themeless.min.css";
import "quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { getSetting, addSetting } from "../../actions/settingAction";
import { checkRequiredValidationWithMinMaxNumber } from "../../Helpers/Validation";

const Settings = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [imagePreview, setPreview] = useState("");
  const [imagePreviewUrl, setUrl] = useState("");
  const [color_code, setColor_code] = useState([]);
  const [color_codeError, setcolor_codeError] = useState("");
  const [specificationError, setSpecificationError] = useState("");
  const [specification, setSpecification] = useState([]);

  const settingsData = props.settings;

  const [state, setstate] = useState({
    no_of_investor: "",
    how_much_investor: "",
    businesses: "",
    how_much_businesses: "",
    raised_funds: "",
    how_much_raised: "",
    verified_funds: "",
    how_much_verified: "",
    cities: "",
    how_much_cities: "",
    countries: "",
    how_much_countries: "",
    no_of_continents: "",
  });

  const [errors, seterrors] = useState({
    error_investor: "",
    error_how_much_investor: "",
    error_businesses: "",
    error_how_much_businesses: "",
    error_raised_funds: "",
    error_how_much_raised_funds: "",
    error_verified_funds: "",
    error_how_much_verified_funds: "",
    error_cities: "",
    error_how_much_cities: "",
    error_countries: "",
    error_how_much_countries: "",
    error_no_of_continents: "",
  });

  useEffect(() => {
    props.getSetting().then((res) => {
      setstate({
        ...state,
        no_of_investor: res.investors.number,
        how_much_investor: res.investors.daily_increase,
        businesses: res.business.number,
        how_much_businesses: res.business.daily_increase,
        raised_funds: res.raised_funds.number,
        how_much_raised: res.raised_funds.daily_increase,
        verified_funds: res.verified_funds.number,
        how_much_verified: res.verified_funds.daily_increase,
        cities: res.cities.number,
        how_much_cities: res.cities.daily_increase,
        countries: res.countries.number,
        how_much_countries: res.countries.daily_increase,
        no_of_continents: res.continents.number,
      });
    });
  }, [getSetting]);

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

  const containerStyle = {
    zIndex: 1999,
  };

  const onSubmitForm = (e) => {
    let validationFlag = true;

    const {
      no_of_investor,
      how_much_investor,
      businesses,
      how_much_businesses,
      raised_funds,
      how_much_raised,
      verified_funds,
      how_much_verified,
      cities,
      how_much_cities,
      countries,
      how_much_countries,
      no_of_continents,
    } = state;

    e.preventDefault();

    let errInvestors = "";
    let errHowMuchInvestors = "";
    let errBusinesses = "";
    let errHowMuchBusinesses = "";
    let errRaisedFunds = "";
    let errHowMuchRaisedFunds = "";
    let errVerifiedFunds = "";
    let errHowMuchVerifiedFunds = "";
    let errCities = "";
    let errHowMuchCities = "";
    let errCountires = "";
    let errHowMuchCountries = "";
    let errContinents = "";

    errInvestors = checkRequiredValidationWithMinMaxNumber(
      no_of_investor,
      "No of Investors",
      1,
      99999999
    );

    errHowMuchInvestors = checkRequiredValidationWithMinMaxNumber(
      how_much_investor,
      "How much to increase daily",
      1,
      99999999
    );

    errBusinesses = checkRequiredValidationWithMinMaxNumber(
      businesses,
      "No of buseinesses",
      1,
      99999999
    );

    errHowMuchBusinesses = checkRequiredValidationWithMinMaxNumber(
      how_much_businesses,
      "How much to increase daily",
      1,
      99999999
    );

    errRaisedFunds = checkRequiredValidationWithMinMaxNumber(
      raised_funds,
      "No of raised funds",
      1,
      99999999
    );

    errHowMuchRaisedFunds = checkRequiredValidationWithMinMaxNumber(
      how_much_raised,
      "How much to increase daily",
      1,
      99999999
    );

    errVerifiedFunds = checkRequiredValidationWithMinMaxNumber(
      verified_funds,
      "No of verified funds",
      1,
      99999999
    );

    errHowMuchVerifiedFunds = checkRequiredValidationWithMinMaxNumber(
      how_much_verified,
      "How much to increase daily",
      1,
      99999999
    );

    errCities = checkRequiredValidationWithMinMaxNumber(
      cities,
      "No of cities",
      1,
      99999999
    );

    errHowMuchCities = checkRequiredValidationWithMinMaxNumber(
      how_much_cities,
      "How much to increase daily",
      1,
      99999999
    );

    errCountires = checkRequiredValidationWithMinMaxNumber(
      countries,
      "No of countries",
      1,
      99999999
    );

    errHowMuchCountries = checkRequiredValidationWithMinMaxNumber(
      how_much_countries,
      "How much to increase daily",
      1,
      99999999
    );

    errContinents = checkRequiredValidationWithMinMaxNumber(
      no_of_continents,
      "No of continents",
      1,
      99999999
    );

    if (
      errInvestors ||
      errHowMuchInvestors ||
      errBusinesses ||
      errHowMuchBusinesses ||
      errRaisedFunds ||
      errHowMuchRaisedFunds ||
      errVerifiedFunds ||
      errHowMuchVerifiedFunds ||
      errCities ||
      errHowMuchCities ||
      errCountires ||
      errHowMuchCountries ||
      errContinents
    ) {
      validationFlag = false;

      seterrors({
        error_investor: errInvestors,
        error_how_much_investor: errHowMuchInvestors,
        error_businesses: errBusinesses,
        error_how_much_businesses: errHowMuchBusinesses,
        error_raised_funds: errRaisedFunds,
        error_how_much_raised_funds: errHowMuchRaisedFunds,
        error_verified_funds: errVerifiedFunds,
        error_how_much_verified_funds: errHowMuchVerifiedFunds,
        error_cities: errCities,
        error_how_much_cities: errHowMuchCities,
        error_countries: errCountires,
        error_how_much_countries: errHowMuchCountries,
        error_no_of_continents: errContinents,
      });
    } else {
      seterrors({
        error_investor: "",
        error_how_much_investor: "",
        error_businesses: "",
        error_how_much_businesses: "",
        error_raised_funds: "",
        error_how_much_raised_funds: "",
        error_verified_funds: "",
        error_how_much_verified_funds: "",
        error_cities: "",
        error_how_much_cities: "",
        error_countries: "",
        error_how_much_countries: "",
        error_no_of_continents: "",
      });
    }

    if (validationFlag) {
      const submitData = {
        no_of_investors: parseFloat(no_of_investor),
        investors_daily_increase: parseFloat(how_much_investor),
        no_of_business: parseFloat(businesses),
        business_daily_increase: parseFloat(how_much_businesses),
        no_of_raised: parseFloat(raised_funds),
        raised_daily_increase: parseFloat(how_much_raised),
        no_of_verified: parseFloat(verified_funds),
        verified_daily_increase: parseFloat(how_much_verified),
        no_of_cities: parseFloat(cities),
        cities_daily_increase: parseFloat(how_much_cities),
        no_of_countries: parseFloat(countries),
        countries_daily_increase: parseFloat(how_much_countries),
        no_of_continents: parseFloat(no_of_continents),
      };

      props.addSetting(submitData).then((res) => {
        toast.success(res.message);
      });
    }
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
              <i className="icon-settings"></i>
              <strong>Settings</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12">
                  <strong>Investors</strong>
                  <hr className="mt-0" />
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>No of Investors</label>
                        <span className="required">*</span>
                        <input
                          type="number"
                          min="1"
                          name="no_of_investor"
                          placeholder="No of Investors"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.no_of_investor}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_investor.length > 0,
                            },
                            {
                              valid: errors.error_investor.length === 0,
                            }
                          )}
                        />
                        {errors.error_investor && (
                          <span className="invalid-text ">
                            {errors.error_investor}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>How much to increase daily?</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="how_much_investor"
                          placeholder="How much to increase daily?
                            "
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.how_much_investor}
                          className={classnames(
                            "form-control input",
                            {
                              invalid:
                                errors.error_how_much_investor.length > 0,
                            },
                            {
                              valid:
                                errors.error_how_much_investor.length === 0,
                            }
                          )}
                        />
                        {errors.error_how_much_investor && (
                          <span className="invalid-text ">
                            {errors.error_how_much_investor}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <strong>Businesses</strong>
                  <hr className="mt-0" />
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>No of buseinesses</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="businesses"
                          placeholder="No of buseinesses
                            "
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.businesses}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_businesses.length > 0,
                            },
                            {
                              valid: errors.error_businesses.length === 0,
                            }
                          )}
                        />
                        {errors.error_businesses && (
                          <span className="invalid-text ">
                            {errors.error_businesses}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>How much to increase daily?</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="how_much_businesses"
                          placeholder="How much to increase daily?
                            "
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.how_much_businesses}
                          className={classnames(
                            "form-control input",
                            {
                              invalid:
                                errors.error_how_much_businesses.length > 0,
                            },
                            {
                              valid:
                                errors.error_how_much_businesses.length === 0,
                            }
                          )}
                        />
                        {errors.error_how_much_businesses && (
                          <span className="invalid-text ">
                            {errors.error_how_much_businesses}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <strong>Raised Funds</strong>
                  <hr className="mt-0" />
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>No of raised funds</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="raised_funds"
                          placeholder="No of raised funds 
                            "
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.raised_funds}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_raised_funds.length > 0,
                            },
                            {
                              valid: errors.error_raised_funds.length === 0,
                            }
                          )}
                        />
                        {errors.error_raised_funds && (
                          <span className="invalid-text ">
                            {errors.error_raised_funds}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>How much to increase daily?</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="how_much_raised"
                          placeholder="How much to increase daily?"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.how_much_raised}
                          className={classnames(
                            "form-control input",
                            {
                              invalid:
                                errors.error_how_much_raised_funds.length > 0,
                            },
                            {
                              valid:
                                errors.error_how_much_raised_funds.length === 0,
                            }
                          )}
                        />
                        {errors.error_how_much_raised_funds && (
                          <span className="invalid-text ">
                            {errors.error_how_much_raised_funds}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <strong>Verified Funds</strong>
                  <hr className="mt-0" />
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>No of verified funds</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="verified_funds"
                          placeholder="No of verified funds
                            "
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.verified_funds}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_verified_funds.length > 0,
                            },
                            {
                              valid: errors.error_verified_funds.length === 0,
                            }
                          )}
                        />
                        {errors.error_verified_funds && (
                          <span className="invalid-text ">
                            {errors.error_verified_funds}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>How much to increase daily?</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="how_much_verified"
                          placeholder="How much to increase daily?
                            "
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.how_much_verified}
                          className={classnames(
                            "form-control input",
                            {
                              invalid:
                                errors.error_how_much_verified_funds.length > 0,
                            },
                            {
                              valid:
                                errors.error_how_much_verified_funds.length ===
                                0,
                            }
                          )}
                        />
                        {errors.error_how_much_verified_funds && (
                          <span className="invalid-text ">
                            {errors.error_how_much_verified_funds}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <strong>Cities</strong>
                  <hr className="mt-0" />
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>No of cities</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="cities"
                          placeholder="No of cityies 
                            "
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.cities}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_cities.length > 0,
                            },
                            {
                              valid: errors.error_cities.length === 0,
                            }
                          )}
                        />
                        {errors.error_cities && (
                          <span className="invalid-text ">
                            {errors.error_cities}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>How much to increase daily?</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="how_much_cities"
                          placeholder="How much to increase daily?"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.how_much_cities}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_how_much_cities.length > 0,
                            },
                            {
                              valid: errors.error_how_much_cities.length === 0,
                            }
                          )}
                        />
                        {errors.error_how_much_cities && (
                          <span className="invalid-text ">
                            {errors.error_how_much_cities}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <strong>Countries</strong>
                  <hr className="mt-0" />
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>No of countries</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="countries"
                          placeholder="No of countries"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.countries}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_countries.length > 0,
                            },
                            {
                              valid: errors.error_countries.length === 0,
                            }
                          )}
                        />
                        {errors.error_countries && (
                          <span className="invalid-text ">
                            {errors.error_countries}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>How much to increase daily?</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="how_much_countries"
                          placeholder="How much to increase daily?"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.how_much_countries}
                          className={classnames(
                            "form-control input",
                            {
                              invalid:
                                errors.error_how_much_countries.length > 0,
                            },
                            {
                              valid:
                                errors.error_how_much_countries.length === 0,
                            }
                          )}
                        />
                        {errors.error_how_much_countries && (
                          <span className="invalid-text ">
                            {errors.error_how_much_countries}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <strong>Continents</strong>
                  <hr className="mt-0" />
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>No of continents</label>
                        <span className="required">*</span>

                        <input
                          type="number"
                          min="1"
                          name="no_of_continents"
                          placeholder="No of continents"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.no_of_continents}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_no_of_continents.length > 0,
                            },
                            {
                              valid: errors.error_no_of_continents.length === 0,
                            }
                          )}
                        />
                        {errors.error_no_of_continents && (
                          <span className="invalid-text ">
                            {errors.error_no_of_continents}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <div className="w-100 float-left mt-3 ml-3">
                      {/* <Link to="/settings">
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
                        onClick={(e) => onSubmitForm(e)}
                      >
                        Update
                      </LaddaButton>
                    </div>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings?.getSettings,
});

export default connect(mapStateToProps, { getSetting, addSetting })(Settings);
