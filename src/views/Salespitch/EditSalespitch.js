import React, { useEffect, useState } from "react";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import ReactQuill, { Quill } from "react-quill";
import {
  FormGroup,
  Col,
  Input,
  Card,
  CardBody,
  CardHeader,
  Row,
} from "reactstrap";
import "ladda/dist/ladda-themeless.min.css";
import "quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getSalespitchDetail, updateUserSalespitch } from "../../actions/userActions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from 'react-select';

const EditSalespitch = (props) => {
  const { _id } = useParams();

  const [postData, setPostData] = useState();

  useEffect(() => {
    props.getSalespitchDetail(_id).then((res) => {
      console.log(res?.data);
      const data = res?.data?.result;
      if(data.length > 0){
        setPostData(data[0]);
        settitle(data[0].title);
        setimg1(data[0].img1);
        setimg2(data[0].img2);
        setimg3(data[0].img3);
        setimg4(data[0].img4);
        if(data[0].vid1.indexOf('://') > -1){
          setvid1(data[0].vid1);
        }else{
          setvid1('https://api.salespitchapp.com/'+data[0].vid1);
        }
        setfile(data[0].file);
        var t = data[0].type.replaceAll('"', '').replaceAll("[", '').replaceAll(" ", '').replaceAll("]", '').split(",");
        var z = [];
        t.forEach(e=>{
          if(e != ''){
            if(e == 'ServiceProvider'){
              e = 'Service Provider';
            }
            z.push({ value: e, label: e })
          }
        })
        setType(z);
        setfundingPhase(data[0].fundingPhase);
        setindustry(data[0].industry);
        setlocation(data[0].location);
        setvalueamount(data[0].valueamount);
        setservices(data[0].services);
        setservicesDetail(data[0].servicesDetail);
        setdescription(data[0].description);
        setcomment(data[0].comment);
        setstatus(data[0].status);
      }

    });
  }, []);

  const [title, settitle] = useState(null);
  const [img1, setimg1] = useState(null);
  const [img2, setimg2] = useState(null);
  const [img3, setimg3] = useState(null);
  const [img4, setimg4] = useState(null);
  const [vid1, setvid1] = useState(null);
  const [file, setfile] = useState(null);
  const [type, setType] = useState([]);
  const [industry, setindustry] = useState(null); 
  const [location, setlocation] = useState(null); 
  const [valueamount, setvalueamount] = useState(null); 
  const [services, setservices] = useState(null); 
  const [servicesDetail, setservicesDetail] = useState(null); 
  const [description, setdescription] = useState(null); 
  const [comment, setcomment] = useState(null); 
  const [status, setstatus] = useState(null);
  const [fundingPhase, setfundingPhase] = useState(null);

  const [dropzone, setDropZone] = useState([]);

  const [fileName1, setFileName1] = useState("");
  const [imagePreview1, setPreview1] = useState("");
  const [imagePreviewUrl1, setUrl1] = useState("");

  const [fileName2, setFileName2] = useState("");
  const [imagePreview2, setPreview2] = useState("");
  const [imagePreviewUrl2, setUrl2] = useState("");

  const [fileName3, setFileName3] = useState("");
  const [imagePreview3, setPreview3] = useState("");
  const [imagePreviewUrl3, setUrl3] = useState("");

  const [fileName4, setFileName4] = useState("");
  const [imagePreview4, setPreview4] = useState("");
  const [imagePreviewUrl4, setUrl4] = useState("");

  const [fileName5, setFileName5] = useState("");
  const [imagePreview5, setPreview5] = useState("");
  const [imagePreviewUrl5, setUrl5] = useState("");

  const [fileName6, setFileName6] = useState("");
  const [imagePreview6, setPreview6] = useState("");
  const [imagePreviewUrl6, setUrl6] = useState("");

  const [titleErr, setTitleErr] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [content, setContent] = useState();

  const [errors, seterrors] = useState({
    errorTitle: "",
    errorType: "",
    errorFile: "",
  });

  const onContentChange = (val) => {
    setContent(val);
  };

  const addFilesToDropzone = (files) => {
    let files_with_preview = [];
    files.map((file) => {
      file["preview"] = URL.createObjectURL(file);
      files_with_preview.push(file);
    });
    const new_files = [...dropzone, ...files_with_preview];
    setDropZone(new_files);
  };
  const handleFileChange = (e, name) => {
    e.preventDefault();
    let validationFlag = true;
    if (e.target.files.length) {
      let file = e.target.files[0];
      let imageSize = e.target.files[0].size / 1024 / 1024;

      if (
        !file.name.match(
          /\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF||PDF||pdf)$/
        )
      ) {
        validationFlag = false;

        if (name == "img1") {
          seterrors({
            errorFile1: "Only jpeg, jpg, png and GIF file format allowed",
          });
          setFileName1("no");
          setPreview1("");
        }
        if (name == "img2") {
          seterrors({
            errorFile2: "Only jpeg, jpg, png and GIF file format allowed",
          });
          setFileName2("no");
          setPreview2("");
        }
        if (name == "img3") {
          seterrors({
            errorFile3: "Only jpeg, jpg, png and GIF file format allowed",
          });
          setFileName3("no");
          setPreview3("");
        }
        if (name == "img4") {
          seterrors({
            errorFile4: "Only jpeg, jpg, png and GIF file format allowed",
          });
          setFileName4("no");
          setPreview4("");
        }
        if (name == "file") {
          seterrors({
            errorFile5: "Only jpeg, jpg, png and GIF file format allowed",
          });
          setFileName5("no");
          setPreview5("");
        }

        if (name == "vid1") {
          seterrors({
            errorFile6: "Only mp4 and mov file format allowed",
          });
          setFileName6("no");
          setPreview6("");
        }

        // setUrl("");
        // setFileName("");
      }
      if (imageSize > 15) {
        validationFlag = false;
        if (name == "img1") {
          setUrl1("");
          setFileName1("");
          setPreview1("");
          seterrors({
            errorFile1: "Please select file less than 15 MB",
          });
        }
        if (name == "img2") {
          setUrl2("");
          setFileName2("");
          setPreview2("");
          seterrors({
            errorFile2: "Please select file less than 15 MB",
          });
        }
        if (name == "img3") {
          setUrl3("");
          setFileName3("");
          setPreview3("");
          seterrors({
            errorFile3: "Please select file less than 15 MB",
          });
        }
        if (name == "img4") {
          setUrl4("");
          setFileName4("");
          setPreview4("");
          seterrors({
            errorFile4: "Please select file less than 15 MB",
          });
        }
        if (name == "file") {
          setUrl5("");
          setFileName5("");
          setPreview5("");
          seterrors({
            errorFile5: "Please select file less than 15 MB",
          });
        }
        if (name == "vid1") {
          setUrl6("");
          setFileName6("");
          setPreview6("");
          seterrors({
            errorFile6: "Please select file less than 15 MB",
          });
        }
      }

      if (validationFlag) {
        if (name == "img1") {
          setUrl1(file);
          setFileName1(file.name);
          setPreview1(URL.createObjectURL(e.target.files[0]));
          seterrors({
            errorFile1: "",
          });
        }
        if (name == "img2") {
          setUrl2(file);
          setFileName2(file.name);
          setPreview2(URL.createObjectURL(e.target.files[0]));
          seterrors({
            errorFile2: "",
          });
        }
        if (name == "img3") {
          setUrl3(file);
          setFileName3(file.name);
          setPreview3(URL.createObjectURL(e.target.files[0]));
          seterrors({
            errorFile3: "",
          });
        }
        if (name == "img4") {
          setUrl4(file);
          setFileName4(file.name);
          setPreview4(URL.createObjectURL(e.target.files[0]));
          seterrors({
            errorFile4: "",
          });
        }
        if (name == "file") {
          setUrl5(file);
          setFileName5(file.name);
          setPreview5(URL.createObjectURL(e.target.files[0]));
          seterrors({
            errorFile5: "",
          });
        }
        if (name == "vid1") {
          setUrl6(file);
          setFileName6(file.name);
          setPreview6(URL.createObjectURL(e.target.files[0]));
          seterrors({
            errorFile6: "",
          });
        }
      }
    }
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block", "link"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["image", "video"],
      ["clean"], // remove formatting button
    ],
  };

  const onSubmitForm = () => {
    if (type === "") {
      seterrors({
        errorType: "Type is required",
      });
    } else {
      const formData = new FormData();
      // formData.append("title", title);
      var t = '[';
      var is = 1;
      type.forEach(e=>{
        if(is < type.length){
          t += e.value+', ';
        }else{
          t += e.value;
        }
        is++;
      })
      t = t+']';
      // alert(t);
      // return false;
      formData.append("type", t);
      formData.append("title", title);
      if (fileName1 != "" && fileName1.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("img1", imagePreviewUrl1);
      }else{
        formData.append("img11", img1.replace("https://api.salespitchapp.com/", ""));
      }
      if (fileName2 != "" && fileName2.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("img2", imagePreviewUrl2);
      }else{
        formData.append("img22", img2.replace("https://api.salespitchapp.com/", ""));
      }
      if (fileName3 != "" && fileName3.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("img3", imagePreviewUrl3);
      }else{
        formData.append("img33", img3.replace("https://api.salespitchapp.com/", ""));
      }
      if (fileName4 != "" && fileName4.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("img4", imagePreviewUrl4);
      }else{
        formData.append("img44", img4.replace("https://api.salespitchapp.com/", ""));
      }
      if (fileName5 != "" && fileName5.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF||pdf||PDF)$/)) {
        formData.append("file", imagePreviewUrl5);
      }else{
        formData.append("file5", file.replace("https://api.salespitchapp.com/", ""));
      }
      if (fileName6 != "" && fileName6.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("vid1", imagePreviewUrl6);
      }else{
        formData.append("vid16", vid1.replace("https://api.salespitchapp.com/", ""));
      }
      formData.append("industry", industry);
      formData.append("location", location);
      formData.append("valueamount", valueamount);
      formData.append("services", services);
      formData.append("servicesDetail", servicesDetail);
      formData.append("description", description);
      formData.append("comment", comment);
      formData.append("status", status);
    
      props
        .updateUserSalespitch(_id, formData)
        .then((res) => {
          // toast.success(res.data.message);
          toast.success("Post edited successfully");
          setTimeout(() => {
            props.history.push(`/Salespitch`);
          }, 1300);
        })
        .catch((err) => console.log("err", err));
    }
  };
  const options = [
    { value: 'Investor', label: 'Investor' },
    { value: 'Service Provider', label: 'Service Provider' },
  ]
  const containerStyle = {
    zIndex: 1999,
  };
  const handleSelect = function(selectedItems) {
    const flavors = [];
    for (let i=0; i<selectedItems.length; i++) {
        flavors.push(selectedItems[i].value);
    }
    setType(flavors);
}
  const isImage = /PNG|png|JPEG|jpeg|jpg/;

  return (
    <>
      <div className="animated fadeIn">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={containerStyle}
        />
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="icon-settings"></i>
                <strong>Edit Sales Pitch</strong>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  {/* <Col xs="6">
                    <label>
                      Title<span className="required">*</span>
                    </label>
                    <Input
                      placeholder="Title"
                      rows="3"
                      type="text"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      defaultValue={title}
                    />
                    {titleErr && (
                      <span className="invalid-text ">{titleErr}</span>
                    )}
                    {errors.errorTitle && (
                      <span className="invalid-text ">{errors.errorTitle}</span>
                    )}
                  </Col> */}

                  <Col xs="6">
                    <label>
                      Title<span className="required">*</span>
                    </label>
                    <input type={"text"} value={title} className="form-control" onChange={e=>settitle(e.target.value)} />
                  </Col>
                  <Col xs="6">
                    <label>
                      industry<span className="required">*</span>
                    </label>
                    <input type={"text"} value={industry} className="form-control" onChange={e=>setindustry(e.target.value)} />
                  </Col>
                  <Col xs="6">
                    <label>
                      Location<span className="required">*</span>
                    </label>
                    <input type={"text"} value={location} className="form-control" onChange={e=>setlocation(e.target.value)} />
                  </Col>
                  {valueamount != '0' && (
                    <Col xs="6">
                      <label>
                        Value<span className="required">*</span>
                      </label>
                      <input type={"text"} value={valueamount} className="form-control" onChange={e=>setvalueamount(e.target.value)} />
                    </Col>
                  )}
                  
                  <Col xs="6">
                      <label>
                      Funding Phase<span className="required">*</span>
                      </label>
                      <input type={"text"} value={fundingPhase} className="form-control" onChange={e=>setfundingPhase(e.target.value)} />
                    </Col>
                  <Col xs="6">
                    <label>
                      Services<span className="required">*</span>
                    </label>
                    <input type={"text"} value={services} className="form-control" onChange={e=>setservices(e.target.value)} />
                  </Col>
                  <Col xs="6">
                    <label>
                      Services Detail<span className="required">*</span>
                    </label>
                    <input type={"text"} value={servicesDetail} className="form-control" onChange={e=>setservicesDetail(e.target.value)} />
                  </Col>


                  <Col xs="6">
                    <label>
                      Type<span className="required">*</span> 
                    </label>
                    {type.length > 0 ? (
                      <div>
                        <Select
                          defaultValue={type}
                          isMulti
                          name="colors"
                          options={options}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(e)=>{setType(e)}}
                        />
                      </div>
                    ) : (
                      <Select
                        isMulti
                        name="colors"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e)=>{setType(e)}}
                        />
                    )}
                    {/* <select
                      type="text"
                      name="pageLength"
                      value={type}
                      multiple={true}
                      onChange={(e) => {
                        seterrors({
                          errorFile: "",
                        });
                        handleSelect(e.target.selectedOptions);
                      }}
                      className="form-control"
                    >
                      <option value={""}>Select Type</option>
                      <option value={"Investor"}>Investor</option>
                      <option value={"Fecilitor"}>Fecilitor</option>
                    </select> */}
                    {errors.errorType && (
                      <span className="invalid-text ">{errors.errorType}</span>
                    )}
                  </Col>
                </FormGroup>
                  <FormGroup row>
                    <Col xs="12">
                      <label>
                        Description<span className="required">*</span>
                      </label>
                      <textarea className="form-control" onChange={e=>setdescription(e.target.value)} value={description}>{description}</textarea>
                      {/* <ReactQuill
                        name="content"
                        placeholder="Enter Content"
                        value={description}
                        onChange={(e) => setdescription(e)}
                        modules={modules}
                        style={{
                          insetInlineStart: "10",
                          height: "250px",
                          marginBottom: "59px",
                        }}
                      /> */}
                      {errors.errorFile && (
                        <span className="invalid-text ">
                          {errors.errorFile}
                        </span>
                      )}
                    </Col>
                  </FormGroup>
                  <Card style={{padding: 10}}>
                  <FormGroup row>
                    <Col xs="12">
                      <h5>Images</h5>
                      <label className="mt-1">
                          Note: Only jpeg, jpg, png and GIF file format only,
                          Maximum 15MB file size allowed
                      </label>
                    </Col>
                    <Col xs="3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'img1')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      {imagePreview1 && (
                        <img src={imagePreview1} className="showProfile" />
                      )}{" "}
                      {isImage.test(img1) && (
                        <a href={img1} target='_blank'>
                        <img src={img1} className="showProfile" />
                        </a>
                      )}
                      {/* <img src={imagePreview} className="showProfile" /> */}
                      {errors.errorFile1 && (
                        <div>
                          <span className="invalid-text ">
                            {errors.errorFile1}
                          </span>
                        </div>
                      )}
                    </Col>
                    <Col xs="3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'img2')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      {imagePreview2 && (
                        <img src={imagePreview2} className="showProfile" />
                      )}{" "}
                      {isImage.test(img2) && (
                        <a href={img2} target='_blank'>
                        <img src={img2} className="showProfile" />
                        </a>
                      )}
                      {errors.errorFile2 && (
                        <div>
                          <span className="invalid-text ">
                            {errors.errorFile2}
                          </span>
                        </div>
                      )}
                    </Col>
                     <Col xs="3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'img3')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      {imagePreview3 && (
                        <img src={imagePreview3} className="showProfile" />
                      )}{" "}
                      {isImage.test(img3) && (
                        <a href={img3} target='_blank'>
                        <img src={img3} className="showProfile" />
                        </a>
                      )}
                      {errors.errorFile3 && (
                        <div>
                          <span className="invalid-text ">
                            {errors.errorFile3}
                          </span>
                        </div>
                      )}
                    </Col>
                    <Col xs="3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'img4')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      {imagePreview4 && (
                        <img src={imagePreview4} className="showProfile" />
                      )}{" "}
                      {isImage.test(img4) && (
                        <a href={img4} target='_blank'>
                        <img src={img4} className="showProfile" />
                        </a>
                      )}
                      {errors.errorFile4 && (
                        <div>
                          <span className="invalid-text ">
                            {errors.errorFile4}
                          </span>
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  </Card>
                  <FormGroup row>
                  <Col xs="6">
                  <Card style={{padding: 10}}>
                      <h5>
                        PDF File
                      </h5>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileChange(e, 'file')}
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      <div>
                        <label className="mt-1">
                          Note: Only PDF file format only,
                          Maximum 15MB file size allowed
                        </label>
                      </div>
                      {file != "" && (
                        <a href={file} target='_blank'>
                          <img src={"https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g"} className="showProfile" />
                        </a>
                      )}
                      {errors.errorFile5 && (
                        <div>
                          <span className="invalid-text ">
                            {errors.errorFile5}
                          </span>
                        </div>
                      )}
                      </Card>
                    </Col>
                     <Col xs="6">
                     <Card style={{padding: 10}}>
                      <h5>
                        Video<span className="required">*</span>
                      </h5>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange(e, 'vid1')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      <div className="mt-3">
                        <label>Note: Maximum 15MB file size allowed</label>
                      </div>
                      {imagePreview6 && (
                        <video
                          className="mt-2"
                          height={150}
                          width={250}
                          controls
                          src={imagePreview6}
                        />
                      )}
                      {/* {'Url: '+vid1} */}
                      {(vid1 && vid1 != "") ? 
                        // (vid1.includes("mp4") ||
                        // vid1.includes("mov")) ? 
                        (
                        <video
                          src={vid1}
                          height={150}
                          width={250}
                          className="mt-2"
                          controls
                        />
                      )
                      // : null 
                      : null}

                      {errors.errorFile6 && (
                        <div>
                          <span className="invalid-text ">
                            {errors.errorFile6}
                          </span>
                        </div>
                      )}
                      </Card>
                    </Col>
                    <Col xs="6">
                      <label>
                        Comment (Maximum 50 character)
                      </label>
                      <input type={"text"} value={comment} className="form-control" onChange={e=>{e.target.value.length < 50 ? setcomment(e.target.value) : setcomment(comment)}} />
                    </Col>

                    <Col xs="6">
                      <label>
                        Status<span className="required">*</span>
                      </label>
                      <select
                        type="text"
                        name="pageLength"
                        value={status}
                        onChange={(e) => {
                          seterrors({
                            errorFile: "",
                          });
                          setstatus(e.target.value);
                        }}
                        className="form-control"
                      >
                        <option value={1}>Pending</option>
                        <option value={2}>Approved</option>
                        <option value={3}>Rejected</option>
                        <option value={5}>Expired</option>
                      </select>
                      {errors.errorType && (
                        <span className="invalid-text ">{errors.errorType}</span>
                      )}
                    </Col>
                  </FormGroup>
                <Row>
                  <div className="w-100 float-left mt-3 ml-3">
                    <LaddaButton
                      className="btn btnColor px-4 btn-ladda"
                      loading={saveLoading}
                      data-color="blue"
                      data-style={ZOOM_OUT}
                      onClick={(e) => onSubmitForm(e)}
                    >
                      Save
                    </LaddaButton>
                    <Link to="/salespitch">
                      <LaddaButton
                        className="btn cncllBtn px-3 btn-ladda ml-2"
                        data-color="blue"
                        data-style={ZOOM_OUT}
                        // onClick={(e) => onCancelButn(e)}
                      >
                        Cancel
                      </LaddaButton>
                    </Link>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});
export default connect(mapStateToProps, {
  updateUserSalespitch,
  getSalespitchDetail,
})(EditSalespitch);
