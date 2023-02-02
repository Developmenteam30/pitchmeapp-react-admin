
import React,{useState,useEffect} from "react";
import {Card,CardBody,Spinner,Col,Row,Label,  Button,Table,Modal,ModalBody,ModalHeader,ModalFooter, FormGroup, Input, Toast,Pagination,PaginationItem,PaginationLink} from 'reactstrap';
import { useParams } from 'react-router'
import {connect, useDispatch, useSelector} from "react-redux" 
import { bindActionCreators } from 'redux';
import * as vehicleActions from "../../actions/VehicleActions"
import { addVehicleVideo,updateVehicleVideo } from "../../actions/VehicleActions";
import { Tooltip } from "react-tippy";
import ReactPlayer from 'react-player'
import classnames from "classnames";
import LaddaButton, { ZOOM_OUT } from "react-ladda/dist/LaddaButton";
import { checkEmptyValidation,validURL } from "../../Helpers/Validation";
import {useHistory} from "react-router-dom"
import { toast } from "react-toastify";

const VehicleVideo=(props)=>{

  const {_id} = useParams()
   let history = useHistory();
   const dispatch = useDispatch();
    const {vehicleVideos,vehicleVideosLoading} = useSelector((state) => state.vehicle)
    const {addVehicleVideo,updateVehicleVideo} = bindActionCreators(vehicleActions, dispatch);
    
    const {getVehicleVideos} = bindActionCreators(vehicleActions,dispatch)
   
    
    const [UpdateData, setUpdateData] = useState(null);
    const [editId, setEditId] = useState("");
    const [isDataLoad, setIsDataLoad] = useState(false)
    const [pageLength, setPageLength] = useState(1);
    const [showModal, setShowModal] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [submitLoading,setSubmitLoading] = useState(false)
    const [pageLimit,setPageLimit] = useState(10)
    const [state, setState] = useState({
      vehicle:"",
      title:"",
      video_url:"",
      
    });
    const [errors, seterrors] = useState({
      error_title:"",
      error_url:"",
    })

      useEffect(() => {
      if (!isDataLoad){
        getVehicleVideos(_id,pageLength,pageLimit).then((res) => {
          
          setIsDataLoad(true)
        })
      }
      },[getVehicleVideos,_id,isDataLoad,pageLength,pageLimit]);

     const  onViewVideo= (video) =>{
    setShowModal(!showModal)
   
    
     }

    const toggleModal = () =>{
      setShowModal(!showModal)
    }
    const toggleModalAdd =() => {
      setViewModal(!viewModal);
      setSubmitLoading(false);
    }

    const onAddVideo = () =>{
      setUpdateData(false)
      setViewModal(!viewModal);
      setState({
        title:"",
        video_url:""
      });
      seterrors({
        error_title:"",
        error_url:"",
      })
    }
    const handleInputChange = (e) =>{
      setState({
        ...state,
        [e.target.name] : e.target.value,
      });
    };
    const onEditVideo=(response) =>{
     setUpdateData(true);
     setViewModal(!viewModal);
     console.log(response._id)
     setEditId(response._id);
     setState({
       ...state,
       vehicle:response._id,
       title:response.title,
       video_url:response.video_url,
     });
     setViewModal(!viewModal);
    }

    const onSubmitForm = (e) => {
      e.preventDefault();
      const {title,video_url} = state;
      let validationFlag= true;
      let errTitle = "";
      let errUrl = "";
      errTitle = checkEmptyValidation(title,"Title");
      errUrl = validURL(video_url,"video url")
      if (errTitle){
        validationFlag= false;
        seterrors({
          error_title:errTitle,
          error_url:errUrl,
        });
      } else {
        validationFlag = true;
        seterrors({
          error_title:"",
          error_url:"",
        })
      }
      if (validationFlag === true){
        setSubmitLoading(true);
        const formData = {
          vehicle:_id,
          title:title,
          video_url:video_url,
   
        };

        if (UpdateData === true){
          
          updateVehicleVideo(editId, formData)
          .then((res) => {
            setSubmitLoading(false);
            toast.success(res.data.message);
            setViewModal(!viewModal);
            getVehicleVideos(_id);
            setTimeout(() => {
              history.push(`/vehicles/details/${_id}`)
            }, 1300)
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setSubmitLoading(false);
          });
        } else {
        addVehicleVideo(formData)
        .then((res) =>{
          setSubmitLoading(false);
          toast.success(res.data.message);
          setViewModal(!viewModal);
          getVehicleVideos(_id);
          setTimeout(() => {
            history.push(`/vehicles/details/${_id}`)
          }, 1300)
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setSubmitLoading(false);
        })
      }
    }
  } 
  
  
  const onPageClick = (page) => {
   getVehicleVideos(_id,page,pageLimit)
  }

  const paginationSection = (data) => {
    const {page,totalPages,hasPrevPage,hasNextPage,prevPage,nextPage} = 
    data;
    
    let Pages = [];
    let skipped = 0;
    for (var i = 1; i <= totalPages; i++){
      if(
        i === 1 ||
        (page <4 && i <= 5) ||
        i === page - 1 ||
        i === page + 1 ||
        i === page ||
        i === totalPages ||
        (page >= totalPages -3 && i >= totalPages - 4)
      ) {
        const test = i;
        const item = (
          <React.Fragment key={i}>
            {
              skipped === 1 ? (
                <PaginationItem>
                 <PaginationLink disabled tag = "button">
                   ...
                 </PaginationLink>
                </PaginationItem>
              ) : null
            }
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
           tag = "button"
           >
             Prev
           </PaginationLink>
         </PaginationItem>
         {Pages}

         <PaginationItem
          onClick={hasNextPage === true ? () => onPageClick(nextPage) : null }
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
    )
  }

    let {page} = vehicleVideos;
    return(
        <div className='animated fadeIn'>
         <div className="mt-2 mb-3 px-2">
          <span className="fs-5 f-w-medium">Vehicle Videos</span>
         </div>
         <div className="row px-2">
           <Col xs="12">
             <Card>
             <CardBody className="px-3 py-3">
               <Row>
                 <Col md="12">
                   <div className="text-right">
                    <Tooltip
                     title="Add Video"
                     position="bottom"
                     arrow={true}
                     distance={15}
                     trigger="mouseenter"
                    >
                      <Button
                       size="md"
                       className="btnColor btn-brand my-4"
                       onClick={() => onAddVideo()}
                      >
                      <i className="fa fa-plus"></i>
                          <span>Add</span> 
                      </Button>
                    </Tooltip>
                   </div>
                 </Col>
               </Row>
               <Table responsive striped className="mt-2 customDataTable">
                 <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                 </thead>
                 <tbody>
                  
                 {vehicleVideos && vehicleVideos.docs.length >0 && !vehicleVideosLoading ? (
                 vehicleVideos.docs.map((video,i) => (
                  
                  <tr key={i}>
                   <td>{pageLimit * (page-1) + (i+1)  }</td>
                   <td>{video.title}</td>
                   <td>
                       <Tooltip
                        title="View Video"
                        position="bottom"
                        arrow={true}
                        distance={15}
                        trigger="mouseenter">
                          
                          <Button
                          size="md"
                          className="btn-twitter btn-brand ml-2"
                          type="button"
                          onClick={() =>  onViewVideo(video)}
                          >
                             <i className="fa fa-eye"></i> 
                          </Button>
                        </Tooltip>
                        <Tooltip
                            title="Edit Video"
                            position="bottom"
                            arrow={true}
                            distance={15}
                            trigger="mouseenter"
                          >
                            <Button
                              size="md"
                              className="btn-spotify btn-brand ml-2"
                              onClick={() => onEditVideo(video)}
                              type="button"
                            >
                              <i className="fa fa-pencil"></i>
                            </Button>
                          </Tooltip>
                     
                       
                        <Modal size="lg" isOpen={showModal}  >
                 <ModalHeader>

                 </ModalHeader>
                 <ModalBody>
                  <Row  className = "w-25">
                   <Col xs="12">
                   <ReactPlayer  url={video.video_url} width={"760px"} height={"400px"} /> 
                   </Col>
                  </Row>
                 </ModalBody>
                 <ModalFooter>
                   <button className="btn btn-outline cancel" onClick={toggleModal}>
                     <span>Cancel</span>
                   </button>
                 </ModalFooter>
               </Modal>
                   </td>
                  </tr>
                 ))
                 ): vehicleVideosLoading ? (
                  <tr>
                  <td colSpan="6" className="middle-align text-center">
                    <Spinner type="grow" />
                  </td>
                </tr>
              ) : vehicleVideos.docs.length === 0 && !vehicleVideosLoading ? (
                <tr>
                  <td colSpan="6" className="middle-align text-center">
                    No video found
                  </td>
                </tr>
              ) : null}
       
                 </tbody>
               </Table>
                <div className="row float-right">
                  <div className="col-md-12">
                    {paginationSection(vehicleVideos)}
                  </div>
                </div>
                    </CardBody> 
               
               
                 </Card>
                 </Col> 
                 <Modal size="lg" isOpen={viewModal}>
                   <ModalHeader toggle={toggleModalAdd}>
                    {UpdateData ? "Edit Video" : "Add Video"}
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
                          <label>Video URL</label>
                          <span className="required">*</span>
                        </Col>

                        <Col xs="12">
                         <Input
                         type="url"
                         placeholder="Enter Video url"
                         name="video_url"
                         onChange={(e) => handleInputChange(e)}
                         style={{ height: "auto" }}
                         value={state.video_url || ""}
                        //  className={classnames(
                        //   "form-control input",
                        //   {
                        //     invalid: errors.error_url.length > 0,
                        //   },
                        //   {
                        //     valid: errors.error_url.length === 0,
                        //   }
                        //  )}
                         />
                          {errors.error_url && (
                            <span className="invalid-text ">
                              {errors.error_url}
                            </span>
                          )}
                        </Col>
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
              {UpdateData ? "Update" : "Submit"}
              </LaddaButton>
              <button className="btn btn-outline cancel" onClick={toggleModalAdd}>
              <span>Cancel</span>
            </button>
          </ModalFooter>
                 </Modal>
              
         </div>

        </div>
    )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps,{addVehicleVideo,updateVehicleVideo })(VehicleVideo) ;
