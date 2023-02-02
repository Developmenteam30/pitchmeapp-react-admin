import React, { useState,useEffect } from "react";
import { useParams } from 'react-router'
import { bindActionCreators } from 'redux';
import {connect,useSelector, useDispatch} from "react-redux"
import * as companyActions from "../../actions/CompanyProfileActions"
import * as generalActions from "../../actions/generalAction"
import { addChargingStation,updateChargingStation } from "../../actions/CompanyProfileActions";
import { toast, ToastContainer } from "react-toastify";
import {useHistory} from "react-router-dom";
import classnames from "classnames";
import {checkEmptyValidation,checkRequiredValidationWithMinMax} from "../../Helpers/Validation";
import {
  Button,
  Card,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { Tooltip } from "react-tippy";
import LaddaButton, { ZOOM_OUT } from "react-ladda/dist/LaddaButton";
import swal from "sweetalert";
import ReadMore from "react-read-more-read-less";

const ChargingStationDetails = () => {

let history = useHistory();
const {id} = useParams()
const dispatch = useDispatch()
const {companyCharging,  companyChargingLoading} = useSelector((state) => state.company)
const {getCompanyCharging, addChargingStation,updateChargingStation} = bindActionCreators(companyActions, dispatch);

const {citiesData, citiesDataLoading,  } = useSelector((state)=> state.general)
const {getCities,getState} = bindActionCreators(generalActions,dispatch)

const {stateData,stateDataLoading} =useSelector((state)=> state.general)

  const [search, setSearch] = useState("");
  const [pageLength, setPageLength] = useState(10);
  const [showModal, setShowModal] = useState(false);
   const [editId, setEditId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [isData,setIsData] = useState(false);
  
  const [data,setData] = useState(false);
  const [pagelength, setPagelength] = useState(0)
  const [updateData, setUpdateData] = useState(null);
 
  const [state, setState] = useState({
    State:"",
    City:"",
    Company:"",
    numChargingInfra:"",
  })
  const [errors, setErrors] = useState({
    error_State:"",
    error_City:"",
    error_numChargingInfra:"",
  })

  useEffect(() => {
   if(!isDataLoad){
     getCompanyCharging(id).then((res) => {
       setIsDataLoad(true)
     })
   }
  },[getCompanyCharging,isDataLoad,id])

  

  useEffect(() =>{
    if(!data){
      getState(id).then((res) =>{
        setData(true)
      })
    }
   
  },[id,data,getState])

  const setDefaultValue = () => {
    setShowModal(!showModal);
  };

  const onAdd = () => {
    setUpdateData(false)
    setDefaultValue();
    setState({
      State:"",
      City:"",
      Company:"",
      numChargingInfra:"",
    });
    setErrors({
      error_State:"",
      error_City:"",
      error_numChargingInfra:"",
    })
  };

 const handleInputChange = (e) =>{
   const value=e.target.value
   
   setState({
     ...state,
     [e.target.name] : value,
   });
  
  if(e.target.name==="State")
    getCities(value)
   
 };

  const toggleModal = () => {
    setDefaultValue();
  };
  const onEdit = (data) => {
    console.log(data)
  setUpdateData(true)
    setShowModal(!showModal);
    setEditId(data._id);
    setState({
      ...state,
      State:data.state_id,
      City:data.city_id,
      numChargingInfra:data.numberc_charging_stations,
    });
    setShowModal(!showModal);
  };
  const onSave = (e) => {
    e.preventDefault()
    setDefaultValue();
    const {State,City,numChargingInfra,Company} = state;
    let validationFlag=true;
    let errState = "";
    let errCity = "";
    let errnumChargingInfra = "";

    errState = checkRequiredValidationWithMinMax(State,"State",2,50);
    errCity = checkRequiredValidationWithMinMax(City,"City",2,50);
    errnumChargingInfra = checkEmptyValidation(numChargingInfra,"numChargingInfra");
    
    if (
      errState ||
      errCity  ||
      errnumChargingInfra 
    ){
      validationFlag = false;
      setErrors({
        error_State:errState,
        error_City:errCity,
        error_numChargingInfra:errnumChargingInfra,
      })
    } else {
      validationFlag = true;
      setErrors({
        error_State:"",
        error_City:"",
        error_numChargingInfra:"",
      })
    }

    if (validationFlag === true){
      setSubmitLoading(true);
      const formData = {
        company_id:id,
        state_id:State,
        city_id:City,
        numberc_charging_stations:numChargingInfra
      };

      if (updateData === true){
       updateChargingStation(editId, formData)
       .then((res) => {
         setSubmitLoading(false);
         toast.success(res.data.message);
         setShowModal(!showModal);
         getCompanyCharging();
         setTimeout(() => {
          history.push(`/company/${id}`)
        }, 1300)
       })
       .catch((err) => {
        toast.error(err.response.data.message);
      });
      } else {
        addChargingStation(formData)
      .then((res) => {
        setSubmitLoading(false);
        toast.success(res.data.message);
        setShowModal(!showModal);
        getCompanyCharging();
        setTimeout(() => {
          history.push(`/company/${id}`)
        }, 130);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      }
     
    }
  };
  const onDeleteCompany = () => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete this perticular Event ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
  };
  //
  const onPageClick = (page) => {
    // getAllTankers(page, pageLength, search)
  };
  const onFieldKeyPress = (e) => {
    if (e.target.name === "search") {
      if (e.key === "Enter") {
        // getAllTankers(1, pageLength, e.target.value)
      }
    }
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
 
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card body>
            {/* <CardBody> */}
            <Col md="12">
              <Row>
                <Col md="12">
                  <div className="text-right">
                    <Tooltip
                      title="Add Post"
                      position="bottom"
                      arrow={true}
                      distance={15}
                      trigger="mouseenter"
                    >
                      <Button
                        size="md"
                        className="btnColor btn-brand my-4"
                        onClick={() => onAdd()}
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
                      name="pageLength"
                      value={pageLength}
                      onChange={(e) => setPageLength(e.target.value)}
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
                  <th>State</th>
                  <th>City</th>
                  <th>No. of charging station</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {companyCharging && !companyChargingLoading ? (
                 companyCharging.map((charge,i) => (
                  
                  <tr key={i}>
                  <td>{ pagelength + (i+1)}</td>
                  <td>{charge.StateData ? charge.StateData.name : ""}</td>
                  <td>
                    <ReadMore
                      charLimit={25}
                      readMoreText={"Read more"}
                      readLessText={"Read less"}
                    >
                      {charge.CityData ? charge.CityData.name : ""}
                    </ReadMore>
                  </td>
                  <td>{charge.numberc_charging_stations}</td>
                  <td>
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
                        onClick={() => onEdit(charge)}
                        type="button"
                      >
                        <i className="fa fa-pencil"></i>
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title="Delete Post"
                      position="bottom"
                      arrow={true}
                      distance={15}
                      trigger="mouseenter"
                    >
                      <Button
                        size="md"
                        className="btn-youtube btn-brand ml-2"
                        onClick={() => onDeleteCompany()}
                        type="button"
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
                 )) 
                
                   ): companyChargingLoading ? (
                    <tr>
                    <td colSpan="6" className="middle-align text-center">
                      <Spinner type="grow" />
                    </td>
                  </tr>
                  ) : companyCharging.length === 0 && !companyChargingLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        No Charging infrastructure found
                      </td>
                    </tr>
                  ) : null } 
              </tbody>
              <tfoot>
                <tr>
                  <th>No.</th>
                  <th> State</th>
                  <th>City</th>
                  <th>No. of charging station</th>
                  <th>Action</th>
                </tr>
              </tfoot>
           
                
                </Table>
          </Card>
        </Col>
        <Modal isOpen={showModal}>
          <ModalHeader toggle={toggleModal}>
            {updateData ? "Edit Charging Station" : "Add Charging Station"}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
              <FormGroup row >
                  <Col xs="12">
                    <label>State</label>
                    <span className="required">*</span>
                  </Col>
                  <Col xs="12">
                    <select type="text" 
                      name="State"
                      onChange={(e) =>{ handleInputChange(e)
                           
                        console.log(state.State)
                      }}
                      value={state.State}
                      className={classnames(
                        "form-control ",
                        {
                          invalid:errors.error_State.length >0,
                        },
                        {
                          valid:errors.error_City.length === 0,
                        }
                      )}

                      
                    //  style={{width:"250px"}} 
                    
                    >
                {stateData && !stateDataLoading ? (
                  stateData.map((stat,i) => (
                   
                      <option value={stat._id} key={i}>{stat.name}</option>
                      ))
                      ): ""}
                     
                    </select>
                    {
                      errors.error_State && (
                        <span className="invalid-text">
                          {errors.error_State}
                          </span>
                      )
                    }
                  </Col>
                </FormGroup>
                
              </Col>

              <Col xs="12">
              
                <FormGroup row >
                  
                      <Col xs="12">
                      <label>City</label>
                      <span className="required">*</span>
                    </Col>
                    <Col xs="12">
                      <select type="textarea" 
                       name="City"
                       onChange={(e) => {handleInputChange(e)
                                
                      }}
                       value={state.City || ""}
                       className="form-control"
                      //  style={{ width: "100%" }}
                      >
                        {citiesData && !citiesDataLoading ? (
                    citiesData.map((city,i) => (
                      
                        <option value={city._id} key={i}>{city.name}</option>
                        ))
                        ): ""}
                       
                      </select>
                      </Col>
                      </FormGroup>
                  
                  
                
              </Col>
              <Col xs="12">
                <FormGroup row>
                  <Col xs="12">
                    <label>No. of Charging Station</label>
                    <span className="required">*</span>
                  </Col>
                  <Col xs="12">
                    <Input type="textarea" placeholder="Enter no of charging station"
                      name="numChargingInfra"
                      onChange={(e) => handleInputChange(e)}
                      style={{ height: "auto" }}
                      value={state.numChargingInfra || ""}
                      className={classnames(
                        "form-control input",
                        {
                          invalid:errors.error_City.length>0,
                        },
                        {
                          valid:errors.error_City.length === 0,
                        }
                      )}
                    /> 
                    {errors.error_numChargingInfra && (
                      <span className="invalid-text">
                        {errors.error_numChargingInfra}
                        </span>
                    )}
                  </Col>
                </FormGroup>
              </Col>
              {/* <Col md="12">
                <Label>Image</Label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="choose file"
                />
              </Col> */}
            </Row>
          </ModalBody>
          <ModalFooter className="px-4">
            <LaddaButton
              className="btn btnColor px-4 btn-ladda"
              loading={submitLoading}
              data-color="blue"
              data-style={ZOOM_OUT}
              onClick={(e) => onSave(e)}
            >
              {updateData ? "Update" : "Submit"}
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

})
export default connect(mapStateToProps,{addChargingStation,updateChargingStation}) (ChargingStationDetails);
