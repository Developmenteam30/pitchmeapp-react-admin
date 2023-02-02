import classnames from "classnames";
import "ladda/dist/ladda-themeless.min.css";
import "quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardHeader, Col, Row, FormGroup,  Label } from "reactstrap";
import { bindActionCreators } from "redux";
import Select from 'react-select';
import * as companyActions from "../../actions/CompanyProfileActions";
import {
  checkEmptyValidation,
  checkRequiredValidationWithMinMax,
  validURL,
} from "../../Helpers/Validation";
import { useHistory } from "react-router-dom";

const UpdateCompany = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getCompanyDetailsById, updateCompanyDetails, getStateName, getCityName } = bindActionCreators(
    companyActions,
    dispatch
  );
  const { id } = useParams();
  const [saveLoading, setSaveLoading] = useState(false);
  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [logoError, setLogoError] = useState("");
  const [banner, setBanner] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const [bannerError, setBannerError] = useState("");
  const [fetchDataLoading, setFetchDataLoading] = useState(false);
  const [stateOption, setStateOption] = useState([])
  const [cityOption, setCityOption] = useState([])
  const [state, setState] = useState({
    title: "",
    address: "",
    field: "",
    website_url: "",
    stateName: "",
    cityName: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkdin: "",
    youtube: "",
  });

  useEffect(() => {
    if (!fetchDataLoading) {
      getCompanyDetailsById(id).then((res) => {
        if (res) {
          setFetchDataLoading(true);
          const data = res.data.result;
          setState({
            title: data.title,
            address: data.address,
            field: data.field,
            website_url: data.website_url,
            stateName: "",
            cityName: "",
          });
          setLogo(data.logo);
          setLogoPreview(data.logo);
          setBanner(data.banner);
          setBannerPreview(data.banner);
        }
      });
    }
  }, [getCompanyDetailsById, fetchDataLoading, id]);

  const [errors, setErrors] = useState({
    error_title: "",
    error_address: "",
    error_field: "",
    error_website_url: "",
    error_stateName:"",
    error_cityName:"",
    error_facebook: "",
    error_twitter: "",
    error_instagram: "",
    error_linkdin: "",
    error_youtube: "",
  });

  useEffect(() => {

    getStateName().then((res) => {
      let data = res.data.result
      let newData = data.map((s) => {
        return {
          value: s._id,
          label: s.name,
        }
      })
    
      setStateOption(newData)
    })
    getCityName().then((res) => {
      let data =  res.data.result
      let newData = data.map((s) => {
        return {
          value: s._id,
          label: s.name,
        }
      })
  
      setCityOption(newData)
    })
 
  }
  , [])
  

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e, type) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageSize = e.target.files[0].size / 1024 / 1024;

      if (!file) {
        setLogoError("Please select image.");
      } else if (
        !file.name.match(/\.(jpg|jpeg|png|gif||PNG||JPG||JPEG||GIF)$/)
      ) {
        setLogoError("Please select Valid Image.");
      } else if (imageSize > 2) {
        setLogoError("Please select image less than 2 MB.");
      } else {
        let imageDataUrl = await readFile(file);
        if (type === "logo") {
          setLogo(file);
          setLogoPreview(imageDataUrl);
          setLogoError("");
        }

        if (type === "banner") {
          setBanner(file);
          setBannerPreview(imageDataUrl);
          setBannerError("");
        }
      }
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { title, stateName, cityName, address, field, website_url, facebook,
      twitter,
      instagram,
      linkdin,
      youtube } = state;
    let validationFlag = true;
    let errTitle = "";
    let errAddress = "";
    let errState = "";
    let errCity = "" ;
    let errField = "";
    let errWebsiteUrl = "";
    let errLogo = "";
    let errBanner = "";
    let errFaceBook = "";
    let errTwitter = "";
    let errLinkdin = "";
    let errYoutube = "";
    let errInstagram = "";

    errTitle = checkRequiredValidationWithMinMax(title, "Company name", 2, 50);
    errAddress = checkRequiredValidationWithMinMax(
      address,
      "Company address",
      2,
      255
    );
    errField = checkRequiredValidationWithMinMax(field, "Company field", 2, 50);
    errState = checkRequiredValidationWithMinMax(stateName, "State", 2, 99);
    errCity = checkRequiredValidationWithMinMax(cityName, "City", 2, 99);
    errWebsiteUrl = validURL(website_url, "Company website URL");
    errLogo = checkEmptyValidation(logo, "Company logo ");
    errBanner = checkEmptyValidation(banner, "Company banner ");
    // errFaceBook = validURL(facebook, "Facebook");
    // errTwitter = validURL(twitter, "Twitter");
    // errLinkdin = validURL(linkdin, "Linkdin");
    // errInstagram = validURL(instagram, "Instagram");
    // errYoutube = validURL(youtube, "Youtube");

    if (
      errTitle ||
      errAddress ||
      errState ||
      errCity ||
      errField ||
      errWebsiteUrl ||
      errLogo ||
      errBanner ||
      errFaceBook ||
      errTwitter ||
      errLinkdin ||
      errInstagram ||
      errYoutube 
    ) {
      validationFlag = false;
      setErrors({
        
        error_title: errTitle,
        error_address: errAddress,
        error_stateName: errState,
        error_cityName: errCity,
        error_field: errField,
        error_website_url: errWebsiteUrl,
        error_facebook: errFaceBook,
        error_twitter: errTwitter,
        error_instagram: errInstagram,
        error_linkdin: errLinkdin,
        error_youtube: errYoutube,
      });
      setLogoError(errLogo);
      setBannerError(errBanner);
    } else {
      validationFlag = false;
      setErrors({
        error_title: "",
        error_address: "",
        error_stateName: "",
        error_cityName: "",
        error_field: "",
        error_website_url: "",
        error_facebook: "",
        error_twitter: "",
        error_instagram: "",
        error_linkdin: "",
        error_youtube: "",
      });
      setLogoError("");
      setBannerError("");
      const companyData = new FormData();
      companyData.append("title", title);
      companyData.append("address", address);
      companyData.append("states", stateName);
      companyData.append("city", cityName);
      companyData.append("field", field);
      companyData.append("website_url", website_url);
      companyData.append("logo", logo);
      companyData.append("banner", banner);
      companyData.append("facebook", facebook);
      companyData.append("twitter", twitter);
      companyData.append("instagram", instagram);
      companyData.append("linkdin", linkdin);
      companyData.append("youtube", youtube);
      setSaveLoading(true);
      updateCompanyDetails(id, companyData)
        .then((res) => {
          setSaveLoading(false);
          toast.success(res.data.message);
          history.push("/company");
        })
        .catch((err) => {
          setSaveLoading(false);
          toast.error(err.response.data.message);
        });
    }
  };

  const handleChange = (e) => {
    const value= e.value
       setState({ ...state, stateName: value })
       getCityName(value).then((res) => {
         let data = res.data.result
         let newData = data.map((s) => {
           return {
             value: s._id,
             label: s.name,
           }
         })
     
         setCityOption(newData)
       })
 
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
              <i className="far fa-building"></i>
              <strong>Update Company Details</strong>
            </CardHeader>
            <CardBody>
              <form>
                <Row>
                  <Col xs="12">
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Compnay Name</label>
                          <input
                            type="text"
                            name="title"
                            placeholder="Enter Compnay Name"
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
                          <label>Company Address</label>
                          <input
                            type="text"
                            name="address"
                            placeholder="Enter Company Address"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.address}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_address.length > 0,
                              },
                              {
                                valid: errors.error_address.length === 0,
                              }
                            )}
                          />
                          {errors.error_address && (
                            <span className="invalid-text ">
                              {errors.error_address}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                    <Col>
                      <div className='form-group'>
                        <label>State</label>
                        <Select
                          placeholder='Select State'
                          options={stateOption}
                          onChange={(e) => handleChange(e) }  
                          value={stateOption.find(
                            (s) => s.value === state.stateName
                          )}
                        />
                        {errors.error_stateName && (
                          <span className='invalid-text '>
                            {errors.error_stateName}
                          </span>
                        )}
                      </div>
                    </Col>
                     
                    <Col>
                      <div className='form-group'>
                        <label>City</label>
                        <Select
                          placeholder='Select City'
                          options={cityOption}
                          onChange={(e) =>
                            setState({ ...state, cityName: e.value })
                          }
                          value={cityOption.find(
                            (s) => s.value === state.cityName
                          )}
                        />
                       
                       
                        {errors.error_cityName && (
                          <span className='invalid-text '>
                            {errors.error_cityName}
                          </span>
                        )}
                      </div>
                    </Col>
                    </Row>

                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Company Field</label>
                          <input
                            type="text"
                            name="field"
                            placeholder="Enter Company Field"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.field}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_field.length > 0,
                              },
                              {
                                valid: errors.error_field.length === 0,
                              }
                            )}
                          />
                          {errors.error_field && (
                            <span className="invalid-text ">
                              {errors.error_field}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Company Website Url</label>
                          <input
                            type="text"
                            name="website_url"
                            placeholder="Enter Company Website Url"
                            onChange={(e) => handleInputChange(e)}
                            style={{ height: "auto" }}
                            value={state.website_url}
                            className={classnames(
                              "form-control input",
                              {
                                invalid: errors.error_website_url.length > 0,
                              },
                              {
                                valid: errors.error_website_url.length === 0,
                              }
                            )}
                          />
                          {errors.error_website_url && (
                            <span className="invalid-text ">
                              {errors.error_website_url}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Banner Image</label>
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            capture="camera"
                            onChange={(e) => {
                              handleImageChange(e, "banner");
                            }}
                            style={{ height: "auto" }}
                            className={classnames(
                              "form-control py-1 my-0 image-picker-input",
                              {
                                invalid: bannerError.length > 0,
                              },
                              {
                                valid: bannerError.length === 0,
                              }
                            )}
                          />
                          {bannerError.length > 0 && (
                            <div className="w-100">
                              <span className="invalid-text ">
                                {bannerError}
                              </span>
                            </div>
                          )}
                          {bannerPreview !== "" && (
                            <img
                              src={bannerPreview}
                              className="border-rounded rounded mt-3"
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
                          <label>Logo Image</label>
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            capture="camera"
                            onChange={(e) => {
                              handleImageChange(e, "logo");
                            }}
                            style={{ height: "auto" }}
                            className={classnames(
                              "form-control py-1 my-0 image-picker-input",
                              {
                                invalid: logoError.length > 0,
                              },
                              {
                                valid: logoError.length === 0,
                              }
                            )}
                          />
                          {logoError.length > 0 && (
                            <div className="w-100">
                              <span className="invalid-text ">{logoError}</span>
                            </div>
                          )}
                          {logoPreview !== "" && (
                            <img
                              src={logoPreview}
                              className="border-rounded rounded-img mt-3"
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
                    </Row>

                    <Col md="12">
                      <fieldset className="scheduler-border">
                        <legend className="scheduler-border">Social:</legend>
                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Facebook</Label>
                              <input
                                type="url"
                                name="facebook"
                                placeholder="Enter Facebook"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.facebook || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_facebook.length > 0,
                                  },
                                  {
                                    valid: errors.error_facebook.length === 0,
                                  }
                                )}
                              />
                              {errors.error_facebook && (
                                <span className="invalid-text ">
                                  {errors.error_facebook}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Instagram</Label>
                              <input
                                type="url"
                                name="instagram"
                                placeholder="Enter Instagram Url"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.instagram || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_instagram.length > 0,
                                  },
                                  {
                                    valid: errors.error_instagram.length === 0,
                                  }
                                )}
                              />
                              {errors.error_instagram && (
                                <span className="invalid-text ">
                                  {errors.error_instagram}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Twitter</Label>
                              <input
                                type="url"
                                name="twitter"
                                placeholder="Enter Twitter Url"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.twitter || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_twitter.length > 0,
                                  },
                                  {
                                    valid: errors.error_twitter.length === 0,
                                  }
                                )}
                              />
                              {errors.error_twitter && (
                                <span className="invalid-text ">
                                  {errors.error_twitter}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Linkdin</Label>
                              <input
                                type="url"
                                name="linkdin"
                                placeholder="Enter Linkdin Url"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.linkdin || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_linkdin.length > 0,
                                  },
                                  {
                                    valid: errors.error_linkdin.length === 0,
                                  }
                                )}
                              />
                              {errors.error_linkdin && (
                                <span className="invalid-text ">
                                  {errors.error_linkdin}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Youtube</Label>
                              <input
                                type="url"
                                name="youtube"
                                placeholder="Enter Youtube Url"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.youtube || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_youtube.length > 0,
                                  },
                                  {
                                    valid: errors.error_youtube.length === 0,
                                  }
                                )}
                              />
                              {errors.error_youtube && (
                                <span className="invalid-text">
                                  {errors.error_youtube}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </fieldset>
                    </Col>

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
                          onClick={(e) => onSubmitForm(e)}
                        >
                          Update
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
export default connect(mapStateToProps, {})(UpdateCompany);
