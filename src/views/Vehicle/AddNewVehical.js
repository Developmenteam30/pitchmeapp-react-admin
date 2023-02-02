import classnames from 'classnames';
import 'ladda/dist/ladda-themeless.min.css';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useState } from 'react';
import LaddaButton, { ZOOM_OUT } from 'react-ladda';
import { useDispatch } from 'react-redux';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as VehicleActions from '../../actions/VehicleActions';
import {
  checkEmptyValidation,
  checkMobileNumberValidation,
  checkRequiredValidationWithMinMax,
} from '../../Helpers/Validation';
import DatePicker from 'react-datepicker';
import FileHook from '../../Hooks/FileHooks';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

const AddNewVehical = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  console.log('🚀 ~ file: AddNewVehical.js ~ line 29 ~ AddNewVehical ~ id', id);
  // Redux
  const {
    generalSpecification,
    getCompanyList,
    addVehicle,
    getVehicleDetailsById,
    updateVehicle,
    getParentVehical,
  } = bindActionCreators(VehicleActions, dispatch);
  const [
    file,
    onChange,
    FilePreview,
    ImageError,
    FileSubmit,
    defaultError,
    DefaultImage,
  ] = FileHook({
    validation: ['png', 'JPEG', 'PNG', 'jpeg', 'jpg', 'JPG', 'GIF', 'gif'],
    rule: 'required',
    size: 10,
  });

  const [saveLoading, setSaveLoading] = useState(false);
  // const [color_code, setColor_code] = useState([])
  // const [color_codeError, setcolor_codeError] = useState('')
  const [specificationError, setSpecificationError] = useState('');
  const [specification, setSpecification] = useState([]);
  const [specificationValues, setSpecificationValues] = useState([]);
  const [companyOption, setCompanyOption] = useState([]);
  const [state, setstate] = useState({
    company: '',
    title: '',
    states: '',
    city: '',
    pin_code: '',
    ex_showroom_price: '',
    registration_price: '',
    insurance_price: '',
    other_charges: '',
    subsidy_price: '',
    waiting_period: '',
    launch_date: '',
    vehicle_type: '',
    color_code: '',
    parentId: '',
  });
  const [parentOption, setParentOption] = useState([]);

  const [errors, seterrors] = useState({
    error_company: '',
    error_title: '',
    error_state: '',
    error_city: '',
    error_pin_code: '',
    error_ex_showroom_price: '',
    error_registration_price: '',
    error_insurance_price: '',
    error_other_charges: '',
    error_subsidy_price: '',
    error_waiting_period: '',
    error_launch_date: '',
    error_vehicle_type: '',
    error_color_code: '',
  });
  //
  useEffect(() => {
    defaultError();
    generalSpecification().then((res) => {
      setSpecification(res.data.result);
      let spec = res.data.result;

      if (id) {
        getVehicleDetailsById(id).then((res) => {
          let getSpec = res.data.result;
          getSpec = getSpec.vehicleSpecificationData;

          setstate({
            parentId: res.data.result.parent,
            title: res.data.result.title,
            states: res.data.result.state,
            city: res.data.result.city,
            pin_code: res.data.result.pin_code,
            ex_showroom_price: res.data.result.ex_showroom_price,
            registration_price: res.data.result.registration_price,
            insurance_price: res.data.result.insurance_price,
            other_charges: res.data.result.other_charges,
            subsidy_price: res.data.result.subsidy_price,
            waiting_period: res.data.result.waiting_period,
            launch_date: new Date(res.data.result.launch_date),
            vehicle_type: res.data.result.vehicle_type,
            color_code: res.data.result.color_code,
            company: res.data.result.company,
          });
          DefaultImage(res.data.result.image);
          let specArray = [];
          spec.forEach((s) => {
            s.childData.forEach((d) => {
              let findData = getSpec.find(
                (s) => s.specification_code === d.specification_code
              );
              if (findData) {
                let newObj = {};
                newObj['specification_code'] = findData.specification_code;
                newObj['id'] = findData._id;
                newObj['specification_value_number'] =
                  findData.specification_value_number;
                newObj['specification_value_string'] =
                  findData.specification_value_string;
                specArray.push(newObj);
              }
            });
          });
          setSpecificationValues(specArray);
        });
      }
    });
    getCompanyList().then((res) => {
      let data = res.data.result;
      let newData = data.map((s) => {
        return {
          value: s._id,
          label: s.title,
        };
      });

      setCompanyOption(newData);
    });
    getParentVehical().then((res) => {
      let data = res.data.result;
      let newData = data.map((s) => {
        return {
          value: s._id,
          label: s.title,
        };
      });
      setParentOption(newData);
    });
  }, []);

  //

  const handleInputChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    let validationFlag = true;
    const {
      company,
      title,
      states,
      city,
      pin_code,
      ex_showroom_price,
      registration_price,
      insurance_price,
      other_charges,
      subsidy_price,
      waiting_period,
      launch_date,
      color_code,
      vehicle_type,
    } = state;
    e.preventDefault();
    let errTitle = '';
    let errCompany = '';
    let errState = '';
    let errCity = '';
    let errPincode = '';
    let errex_showroom_price = '';
    let errregistration_price = '';
    let errinsurance_price = '';
    let errother_charges = '';
    let errsubsidy_price = '';
    let errcolor_code = '';
    let errwaiting_period = '';
    let errlaunch_date = '';

    let errvehicle_type = '';
    errTitle = checkRequiredValidationWithMinMax(title, 'Vehical name', 2, 50);
    errCompany = checkRequiredValidationWithMinMax(company, 'Company', 2, 255);
    errState = checkRequiredValidationWithMinMax(states, 'State', 2, 99);
    errCity = checkRequiredValidationWithMinMax(city, 'City', 2, 99);
    errPincode = checkMobileNumberValidation(pin_code, 'Pincode');
    errex_showroom_price = checkEmptyValidation(
      ex_showroom_price,
      'Ex Showroom Price'
    );
    errregistration_price = checkEmptyValidation(
      registration_price,
      'Registration price'
    );
    errinsurance_price = checkEmptyValidation(
      insurance_price,
      'Insurance price'
    );
    errother_charges = checkEmptyValidation(other_charges, 'Other price');
    errsubsidy_price = checkEmptyValidation(subsidy_price, 'Subsidy price');
    errcolor_code = checkEmptyValidation(color_code, 'Color code');
    errwaiting_period = checkEmptyValidation(waiting_period, 'Waiting period');
    errlaunch_date = checkEmptyValidation(launch_date, 'Date');
    errvehicle_type = checkEmptyValidation(vehicle_type, 'Vehical Type');
    if (
      errTitle ||
      errCompany ||
      errState ||
      errCity ||
      errPincode ||
      errex_showroom_price ||
      errregistration_price ||
      errinsurance_price ||
      errother_charges ||
      errsubsidy_price ||
      errcolor_code ||
      errwaiting_period ||
      errlaunch_date ||
      errvehicle_type
    ) {
      validationFlag = false;
      seterrors({
        error_company: errCompany,
        error_title: errTitle,
        error_state: errState,
        error_city: errCity,
        error_pin_code: errPincode,
        error_ex_showroom_price: errex_showroom_price,
        error_registration_price: errregistration_price,
        error_insurance_price: errinsurance_price,
        error_other_charges: errother_charges,
        error_subsidy_price: errsubsidy_price,
        error_color_code: errcolor_code,
        error_waiting_period: errwaiting_period,
        error_launch_date: errlaunch_date,
        error_vehicle_type: errvehicle_type,
      });
    } else {
      seterrors({
        error_company: '',
        error_title: '',
        error_state: '',
        error_city: '',
        error_pin_code: '',
        error_ex_showroom_price: '',
        error_registration_price: '',
        error_insurance_price: '',
        error_other_charges: '',
        error_subsidy_price: '',
        error_color_code: '',
        error_waiting_period: '',
        error_launch_date: '',
        error_vehicle_type: '',
      });
    }
    setSaveLoading(true);
    const fileValidation = FileSubmit(id);
    if (validationFlag && fileValidation) {
      let specArray = [];
      specificationValues.forEach((s) => {
        if (
          s.specification_value_number ||
          s.specification_value_string !== ''
        ) {
          specArray.push({
            id: s.id ? s.id : null,
            specification_value_number: s.specification_value_number,
            specification_value_string: s.specification_value_string,
            specification_code: s.specification_code,
          });
        }
      });

      const formData = new FormData();
      formData.append('title', title);
      formData.append('company', company);
      formData.append('state', states);
      formData.append('city', city);
      formData.append('pin_code', pin_code);
      formData.append('ex_showroom_price', ex_showroom_price);
      formData.append('registration_price', registration_price);
      formData.append('insurance_price', insurance_price);
      formData.append('other_charges', other_charges);
      formData.append('subsidy_price', subsidy_price);
      formData.append('color_code', color_code);
      formData.append('waiting_period', waiting_period);

      formData.append('launch_date', moment(launch_date).format('yyyy-MM-DD'));

      formData.append('specification', JSON.stringify(specArray));

      for (let i = 0; i < file.length; i++) {
        formData.append('image', file[i]);
      }
      formData.append('vehicle_type', vehicle_type);
      formData.append('parent', state.parentId);
      if (id) {
        updateVehicle(id, formData)
          .then((res) => {
            toast.success(res.data.message);
            setSaveLoading(false);
            setTimeout(() => {
              history.push('/vehicles');
            }, 2000);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setSaveLoading(false);
          });
      } else {
        addVehicle(formData)
          .then((res) => {
            toast.success(res.data.message);
            setSaveLoading(false);
            setTimeout(() => {
              history.push('/vehicles');
            }, 2000);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setSaveLoading(false);
          });
      }
    }
  };
  const changeSpecification = async (e, code, type) => {
    console.log(e.target.value);
    let values = [...specificationValues];
    let index = specificationValues.findIndex(
      (s) => s.specification_code === code
    );
    // debugger

    if (index >= 0) {
      if (type === 1) {
        values[index].specification_value_string = e.target.value;
      }
      if (type === 2) {
        values[index].specification_value_number = parseInt(e.target.value);
      }
      if (type === 3) {
        values[index].specification_value_string =
          values[index].specification_value_string === 'true'
            ? 'false'
            : 'true';
      }

      setSpecificationValues(values);
    } else {
      if (values.length > 0) {
        let updateObj = {};

        if (type === 1) {
          updateObj.specification_code = code;
          updateObj.specification_value_string = e.target.values;
          updateObj.specification_value_number = '';
        }
        if (type === 2) {
          updateObj.specification_code = code;
          updateObj.specification_value_string = '';
          updateObj.specification_value_number = parseInt(e.target.value);
        }
        if (type === 3) {
          updateObj.specification_code = code;
          updateObj.specification_value_string = 'true';
          updateObj.specification_value_number = '';
        }
        values.push(updateObj);
        setSpecificationValues(values);
      } else {
        let newArray = [];
        let updateObj = {};

        if (type === 1) {
          updateObj.specification_code = code;
          updateObj.specification_value_string = e.target.values;
          updateObj.specification_value_number = '';
        }
        if (type === 2) {
          updateObj.specification_code = code;
          updateObj.specification_value_string = '';
          updateObj.specification_value_number = parseInt(e.target.value);
        }
        if (type === 3) {
          updateObj.specification_code = code;
          updateObj.specification_value_string = 'true';
          updateObj.specification_value_number = '';
        }
        newArray.push(updateObj);
        setSpecificationValues(newArray);
      }
    }
  };
  const containerStyle = {
    zIndex: 1999,
  };

  return (
    <div className='animated fadeIn'>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        style={containerStyle}
      />
      <Row>
        <Col xs='12'>
          <Card>
            <CardHeader>
              <i className='fas fa-car'></i>
              <strong>{id ? 'Update Vehicle' : 'Add Vehicle'}</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs='12'>
                  <Row>
                    <Col>
                      <div className='form-group'>
                        <label>Vehicle Name</label>
                        <input
                          type='text'
                          name='title'
                          placeholder='Enter Vehicle Name'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.title}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_title.length > 0,
                            },
                            {
                              valid: errors.error_title.length === 0,
                            }
                          )}
                        />
                        {errors.error_title && (
                          <span className='invalid-text '>
                            {errors.error_title}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className='form-group'>
                        <label>Company</label>
                        <Select
                          placeholder='Select Company'
                          options={companyOption}
                          onChange={(e) =>
                            setstate({ ...state, company: e.value })
                          }
                          value={companyOption.find(
                            (s) => s.value === state.company
                          )}
                        />
                        {/* <input
                          type='text'
                          name='company'
                          placeholder='Enter Company Name'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.company}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_company.length > 0,
                            },
                            {
                              valid: errors.error_company.length === 0,
                            }
                          )}
                        /> */}
                        {errors.error_company && (
                          <span className='invalid-text '>
                            {errors.error_company}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <strong>Company Address</strong>
                  <hr className='mt-0' />
                  <Row>
                    <Col>
                      <div className='form-group'>
                        <label>State</label>
                        <input
                          type='text'
                          name='states'
                          placeholder='Enter State'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.states}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_state.length > 0,
                            },
                            {
                              valid: errors.error_state.length === 0,
                            }
                          )}
                        />
                        {errors.error_state && (
                          <span className='invalid-text '>
                            {errors.error_state}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className='form-group'>
                        <label>City</label>
                        <input
                          type='text'
                          name='city'
                          placeholder='Enter City'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.city}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_city.length > 0,
                            },
                            {
                              valid: errors.error_city.length === 0,
                            }
                          )}
                        />
                        {errors.error_city && (
                          <span className='invalid-text '>
                            {errors.error_city}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className='form-group'>
                        <label>Pincode</label>
                        <input
                          type='number'
                          name='pin_code'
                          placeholder='Enter Pincode'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.pin_code}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_pin_code.length > 0,
                            },
                            {
                              valid: errors.error_pin_code.length === 0,
                            }
                          )}
                        />
                        {errors.error_pin_code && (
                          <span className='invalid-text '>
                            {errors.error_pin_code}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <strong>Price of the Vehicle</strong>
                  <hr className='mt-0' />
                  <Row>
                    <Col>
                      <div className='form-group'>
                        <label>Ex Showroom Price</label>
                        <input
                          type='number'
                          name='ex_showroom_price'
                          placeholder='Enter Ex Showroom Price'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.ex_showroom_price}
                          className={classnames(
                            'form-control input',
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
                          <span className='invalid-text '>
                            {errors.error_ex_showroom_price}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className='form-group'>
                        <label>Registration Price</label>
                        <input
                          type='number'
                          name='registration_price'
                          placeholder='Enter Registration Price'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.registration_price}
                          className={classnames(
                            'form-control input',
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
                          <span className='invalid-text '>
                            {errors.error_registration_price}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className='form-group'>
                        <label>Insurance Price</label>
                        <input
                          type='number'
                          name='insurance_price'
                          placeholder='Enter Insurance Price'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.insurance_price}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_insurance_price.length > 0,
                            },
                            {
                              valid: errors.error_insurance_price.length === 0,
                            }
                          )}
                        />
                        {errors.error_insurance_price && (
                          <span className='invalid-text '>
                            {errors.error_insurance_price}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className='form-group'>
                        <label>Other Charges</label>
                        <input
                          type='number'
                          name='other_charges'
                          placeholder='Enter Other Charges'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.other_charges}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_other_charges.length > 0,
                            },
                            {
                              valid: errors.error_other_charges.length === 0,
                            }
                          )}
                        />
                        {errors.error_other_charges && (
                          <span className='invalid-text '>
                            {errors.error_other_charges}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className='form-group'>
                        <label>Subsidy Price</label>
                        <input
                          type='number'
                          name='subsidy_price'
                          placeholder='Enter Subsidy Price'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.subsidy_price}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_subsidy_price.length > 0,
                            },
                            {
                              valid: errors.error_subsidy_price.length === 0,
                            }
                          )}
                        />
                        {errors.error_subsidy_price && (
                          <span className='invalid-text '>
                            {errors.error_subsidy_price}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <strong>Other Specification</strong>
                  <hr className='mt-0' />
                  <Row>
                    <Col>
                      <div className='form-group'>
                        <label>Color Code</label>
                        <input
                          type='text'
                          name='color_code'
                          placeholder='Enter Color Code'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.color_code}
                          className={classnames('form-control input', {
                            invalid: errors.error_color_code.length > 0,
                          })}
                        />
                        {errors.error_color_code && (
                          <span className='invalid-text '>
                            {errors.error_color_code}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className='form-group'>
                        <label>Waiting Period</label>
                        <input
                          type='number'
                          name='waiting_period'
                          placeholder='Enter Waiting Period'
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: 'auto' }}
                          value={state.waiting_period}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_waiting_period.length > 0,
                            },
                            {
                              valid: errors.error_waiting_period.length === 0,
                            }
                          )}
                        />
                        {errors.error_waiting_period && (
                          <span className='invalid-text '>
                            {errors.error_waiting_period}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className='form-group'>
                        <label>Launch Date</label>
                        <DatePicker
                          placeholderText='Select Date'
                          onChange={(e) =>
                            setstate({ ...state, launch_date: e })
                          }
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_launch_date.length > 0,
                            },
                            {
                              valid: errors.error_launch_date.length === 0,
                            }
                          )}
                          selected={state.launch_date}
                        />
                        {errors.error_launch_date && (
                          <span className='invalid-text '>
                            {errors.error_launch_date}
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col>
                      <div className='form-group'>
                        <label>Vehicle Type</label>
                        <select
                          style={{ height: 'auto' }}
                          name='vehicle_type'
                          value={state.vehicle_type}
                          placeholder='Select Category'
                          onChange={(e) => handleInputChange(e)}
                          className={classnames(
                            'form-control input',
                            {
                              invalid: errors.error_vehicle_type.length > 0,
                            },
                            {
                              valid: errors.error_vehicle_type.length === 0,
                            }
                          )}
                        >
                          <option value=''>Select Vehicle Type</option>
                          <option value={1}>Two Wheeler</option>
                          <option value={2}>Four Wheeler</option>
                        </select>
                        {errors.error_vehicle_type && (
                          <span className='invalid-text '>
                            {errors.error_vehicle_type}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className='form-group'>
                        <label>Vehicle Image</label>
                        <input
                          id='image'
                          type='file'
                          multiple
                          accept='image/*'
                          onChange={onChange}
                          style={{ height: 'auto' }}
                          className={classnames('form-control-file')}
                        />

                        {ImageError && ImageError.length > 0 ? (
                          <div className='invalid-feedback capital'>
                            <em>{ImageError}</em>
                          </div>
                        ) : null}
                        <div>
                          {FilePreview && FilePreview.length > 0
                            ? FilePreview.map((s, i) =>
                                s ? (
                                  <img
                                    src={s}
                                    alt='new'
                                    height='50px'
                                    className='mr-1'
                                    key={i}
                                  />
                                ) : null
                              )
                            : null}
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className='form-group'>
                        <label> Select parent Vehicle</label>
                        <Select
                          placeholder='Select parent vehicle'
                          options={parentOption}
                          onChange={(e) =>
                            setstate({ ...state, parentId: e.value })
                          }
                          value={parentOption.find(
                            (s) => s.value === state.parentId
                          )}
                        />

                        {/* {errors.error_company && (
                          <span className='invalid-text '>
                            {errors.error_company}
                          </span>
                        )} */}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {specification.map((general) => (
                      <>
                        <Col sm='12'>
                          <strong>{general.specification}</strong>
                          <hr />
                        </Col>
                        <Col sm='12'>
                          <Row>
                            {general.childData.map((child, i) => {
                              return child.value_type === 1 ||
                                child.value_type === 2 ? (
                                <Col sm='4'>
                                  <div className='form-group'>
                                    <label>{child.specification}</label>
                                    <input
                                      name={child.specification_code}
                                      value={
                                        child.value_type === 2
                                          ? specificationValues.find(
                                              (v) =>
                                                v.specification_code ===
                                                child.specification_code
                                            )
                                            ? specificationValues.find(
                                                (v) =>
                                                  v.specification_code ===
                                                  child.specification_code
                                              ).specification_value_number
                                            : null
                                          : specificationValues.find(
                                              (v) =>
                                                v.specification_code ===
                                                child.specification_code
                                            )
                                          ? specificationValues.find(
                                              (v) =>
                                                v.specification_code ===
                                                child.specification_code
                                            ).specification_value_string
                                          : null
                                      }
                                      onChange={(e) =>
                                        changeSpecification(
                                          e,
                                          child.specification_code,
                                          child.value_type
                                        )
                                      }
                                      placeholder={`Enter ${child.specification.toLowerCase()}`}
                                      type={
                                        child.value_type === 1
                                          ? 'text'
                                          : 'number'
                                      }
                                      className={classnames(
                                        'form-control input'
                                      )}
                                    />
                                  </div>
                                </Col>
                              ) : (
                                <Col sm='4'>
                                  <div className='form-group'>
                                    <div className='form-check'>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        id={child.specification_code}
                                        onChange={(e) =>
                                          changeSpecification(
                                            e,
                                            child.specification_code,
                                            child.value_type
                                          )
                                        }
                                        checked={
                                          specificationValues.find(
                                            (v) =>
                                              v.specification_code ===
                                              child.specification_code
                                          ) &&
                                          specificationValues.find(
                                            (v) =>
                                              v.specification_code ===
                                              child.specification_code
                                          ).specification_value_string ===
                                            'true'
                                            ? true
                                            : false
                                        }
                                      />
                                      <label htmlFor={child.specification_code}>
                                        {child.specification}
                                      </label>
                                    </div>
                                  </div>
                                </Col>
                              );
                            })}
                          </Row>
                        </Col>
                      </>
                    ))}
                  </Row>
                  <Row>
                    <div className='w-100 float-left mt-3 ml-3'>
                      <LaddaButton
                        className='btn btnColor px-4 btn-ladda'
                        loading={saveLoading}
                        data-color='blue'
                        data-style={ZOOM_OUT}
                        onClick={(e) => onSubmitForm(e)}
                      >
                        {id ? 'Update' : 'Save'}
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

export default AddNewVehical;
