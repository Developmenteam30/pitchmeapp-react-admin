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
import { getBiographyDetail, updateUserBiography } from "../../actions/userActions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from 'react-select';

const EditBiography = (props) => {
  const { _id } = useParams();

  const [postData, setPostData] = useState();

  useEffect(() => {
    props.getBiographyDetail(_id).then((res) => {
      console.log(res?.data);
      const data = res?.data?.result;
      setLocation(data[0].Location);
      setSkills(data[0].Skills);
      setEducation(data[0].Education);
      setExperience(data[0].Experience);
      setWealth(data[0].Wealth);
      setAdd(data[0].Add);
      settextstatus(data[0].textstatus);
      setnda(data[0].nda);


      setPostData(data[0]);
      setuserid(data[0].userid);
      setPicture(data[0].Picture)
      setFace(data[0].Face);
      setFace(data[0].Face);
      setIdentity(data[0].Identity);
      setSkillCertificate(data[0].SkillCertificate);
      setProofFunds(data[0].ProofFunds);
      setsignature(data[0].signature);
      setstatus(data[0].status);
      setIdentitystatus(data[0].Identitystatus);
      setSkillCertificatestatus(data[0].SkillCertificatestatus);
      setProofFundsstatus(data[0].ProofFundsstatus);
      setSignaturestatus(data[0].Signaturestatus);
    });
  }, []);

  const [Location, setLocation] = useState('');
  const [Skills, setSkills] = useState('');
  const [Education, setEducation] = useState('');
  const [Experience, setExperience] = useState('');
  const [Wealth, setWealth] = useState('');
  const [Add, setAdd] = useState('');
  const [textstatus, settextstatus] = useState('1');
  const [nda, setnda] = useState('');
  const [userid, setuserid] = useState(null);
  const [Picture, setPicture] = useState(null);
  const [Face, setFace] = useState(null);
  const [Identity, setIdentity] = useState(null);
  const [SkillCertificate, setSkillCertificate] = useState(null);
  const [ProofFunds, setProofFunds] = useState(null);
  const [signature, setsignature] = useState(null);
  const [comment, setcomment] = useState(null); 
  const [status, setstatus] = useState(null);
  const [Identitystatus, setIdentitystatus] = useState(null);
  const [SkillCertificatestatus, setSkillCertificatestatus] = useState(null);
  const [ProofFundsstatus, setProofFundsstatus] = useState(null);
  const [Signaturestatus, setSignaturestatus] = useState(null);

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

        if (name == "Face") {
          seterrors({
            errorFile1: "Only jpeg, jpg, png and GIF file format allowed",
          });
          setFileName1("no");
          setPreview1("");
        }
        if (name == "Identity") {
          seterrors({
            errorFile2: "Only jpeg, jpg, png and GIF file format allowed",
          });
          setFileName2("no");
          setPreview2("");
        }
        if (name == "SkillCertificate") {
          seterrors({
            errorFile3: "Only jpeg, jpg, png and GIF file format allowed",
          });
          setFileName3("no");
          setPreview3("");
        }
        if (name == "ProofFunds") {
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

        if (name == "signature") {
          seterrors({
            errorFile6: "Only mp4 and mov file format allowed",
          });
          setFileName6("no");
          setPreview6("");
        }

        // setUrl("");
        // setFileName("");
      }
      if (imageSize > 10) {
        validationFlag = false;
        if (name == "Face") {
          setUrl1("");
          setFileName1("");
          setPreview1("");
          seterrors({
            errorFile1: "Please select file less than 10 MB",
          });
        }
        if (name == "Identity") {
          setUrl2("");
          setFileName2("");
          setPreview2("");
          seterrors({
            errorFile2: "Please select file less than 10 MB",
          });
        }
        if (name == "SkillCertificate") {
          setUrl3("");
          setFileName3("");
          setPreview3("");
          seterrors({
            errorFile3: "Please select file less than 10 MB",
          });
        }
        if (name == "ProofFunds") {
          setUrl4("");
          setFileName4("");
          setPreview4("");
          seterrors({
            errorFile4: "Please select file less than 10 MB",
          });
        }
        if (name == "file") {
          setUrl5("");
          setFileName5("");
          setPreview5("");
          seterrors({
            errorFile5: "Please select file less than 10 MB",
          });
        }
        if (name == "signature") {
          setUrl6("");
          setFileName6("");
          setPreview6("");
          seterrors({
            errorFile6: "Please select file less than 10 MB",
          });
        }
      }

      if (validationFlag) {
        if (name == "Face") {
          setUrl1(file);
          setFileName1(file.name);
          setPreview1(URL.createObjectURL(e.target.files[0]));
          seterrors({
            errorFile1: "",
          });
        }
        if (name == "Identity") {
          setUrl2(file);
          setFileName2(file.name);
          setPreview2(URL.createObjectURL(e.target.files[0]));
          seterrors({
            errorFile2: "",
          });
        }
        if (name == "SkillCertificate") {
          setUrl3(file);
          setFileName3(file.name);
          setPreview3(URL.createObjectURL(e.target.files[0]));
          seterrors({
            errorFile3: "",
          });
        }
        if (name == "ProofFunds") {
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
        if (name == "signature") {
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
      const formData = new FormData();
      formData.append("userid", userid);
      if (fileName1 != "" && fileName1.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("Face", imagePreviewUrl1);
      }else{
        formData.append("Face1", Face.replace("https://api.salespitchapp.com/", ""));
      }
      if (fileName2 != "" && fileName2.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("Identity", imagePreviewUrl2);
      }else{
        formData.append("Identity1", Identity.replace("https://api.salespitchapp.com/", ""));
      }
      if (fileName3 != "" && fileName3.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("SkillCertificate", imagePreviewUrl3);
      }else{
        formData.append("SkillCertificate1", SkillCertificate.replace("https://api.salespitchapp.com/", ""));
      }
      if (fileName4 != "" && fileName4.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("ProofFunds", imagePreviewUrl4);
      }else{
        formData.append("ProofFunds1", ProofFunds.replace("https://api.salespitchapp.com/", ""));
      }
      if (fileName6 != "" && fileName6.match(/\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/)) {
        formData.append("signature", imagePreviewUrl6);
      }else{
        formData.append("signature1", signature.replace("https://api.salespitchapp.com/", ""));
      }
      formData.append("Picture1", Picture.replace("https://api.salespitchapp.com/", ""));
      formData.append("comment", comment);
      formData.append("status", status);
      formData.append("Identitystatus", Identitystatus);
      formData.append("SkillCertificatestatus", SkillCertificatestatus);
      formData.append("ProofFundsstatus", ProofFundsstatus);
      formData.append("Signaturestatus", Signaturestatus);

      formData.append("Location", Location);
      formData.append("Skills", Skills);
      formData.append("Education", Education);
      formData.append("Experience", Experience);
      formData.append("Wealth", Wealth);
      formData.append("Add", Add);
      formData.append("textstatus", textstatus);

      props
        .updateUserBiography(_id, formData)
        .then((res) => {
          // toast.success(res.data.message);
          toast.success("Post edited successfully");
          setTimeout(() => {
            props.history.push(`/Biography`);
          }, 1300);
        })
        .catch((err) => console.log("err", err));
  };
  const options = [
    { value: 'Investor', label: 'Investor' },
    { value: 'Facilitator', label: 'Facilitator' },
  ]
  const containerStyle = {
    zIndex: 1999,
  };
  const handleSelect = function(selectedItems) {
  }
  const isImage = /PNG|png|JPEG|tmp|jpeg|jpg/;
  const isPDF = /PDF|pdf/;

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
                    <Col xs="12">
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
                      <h5>Face</h5>
                      <label className="mt-1">
                          Note: Only jpeg, jpg, png and GIF file format only,
                          Maximum 10MB file size allowed
                      </label>
                    </Col>
                    <Col xs="6">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'Face')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      {imagePreview1 && (
                        <img src={imagePreview1} className="showProfile" />
                      )}{" "}
                      {isImage.test(Face) && (
                        <a href={Face} target='_blank'>
                        <img src={Face} className="showProfile" />
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
                    <Col xs="6">
                      <Card style={{padding: 10}}>
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
                          <option value={2}>Verified</option>
                          <option value={3}>Not Verified</option>
                        </select>
                        {errors.errorType && (
                          <span className="invalid-text ">{errors.errorType}</span>
                        )}
                      </Card>
                    </Col>
                  </FormGroup>
                  </Card>
                  <Card style={{padding: 10}}>
                  <FormGroup row>
                    <Col xs="12">
                      <h5>Identity</h5>
                      <label className="mt-1">
                          Note: Only jpeg, jpg, png and GIF file format only,
                          Maximum 10MB file size allowed
                      </label>
                    </Col>
                    <Col xs="6">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'Identity')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      {imagePreview2 && (
                        <img src={imagePreview2} className="showProfile" />
                      )}{" "}
                      {isImage.test(Identity) && (
                        <a href={Identity} target='_blank'>
                        <img src={Identity} className="showProfile" />
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
                    <Col xs="6">
                      <Card style={{padding: 10}}>
                        <label>
                          Status<span className="required">*</span>
                        </label>
                        <select
                          type="text"
                          name="pageLength"
                          value={Identitystatus}
                          onChange={(e) => {
                            seterrors({
                              errorFile: "",
                            });
                            setIdentitystatus(e.target.value);
                          }}
                          className="form-control"
                        >
                          <option value={1}>Pending</option>
                          <option value={2}>Verified</option>
                          <option value={3}>Not Verified</option>
                        </select>
                        {errors.errorType && (
                          <span className="invalid-text ">{errors.errorType}</span>
                        )}
                      </Card>
                    </Col>
                    </FormGroup>
                  </Card>
                  <Card style={{padding: 10}}>
                  <FormGroup row>
                    <Col xs="12">
                      <h5>Skill Certificate</h5>
                      <label className="mt-1">
                          Note: Only jpeg, jpg, png and GIF file format only,
                          Maximum 10MB file size allowed
                      </label>
                    </Col>
                     <Col xs="6">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'SkillCertificate')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      {imagePreview3 && (
                        <img src={imagePreview3} className="showProfile" />
                      )}{" "}
                      {isImage.test(SkillCertificate) && (
                        <a href={SkillCertificate} target='_blank'>
                        <img src={SkillCertificate} className="showProfile" />
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
                    <Col xs="6">
                      <Card style={{padding: 10}}>
                        <label>
                          Status<span className="required">*</span>
                        </label>
                        <select
                          type="text"
                          name="pageLength"
                          value={SkillCertificatestatus}
                          onChange={(e) => {
                            seterrors({
                              errorFile: "",
                            });
                            setSkillCertificatestatus(e.target.value);
                          }}
                          className="form-control"
                        >
                          <option value={1}>Pending</option>
                          <option value={2}>Verified</option>
                          <option value={3}>Not Verified</option>
                        </select>
                        {errors.errorType && (
                          <span className="invalid-text ">{errors.errorType}</span>
                        )}
                      </Card>
                    </Col>
                    </FormGroup>
                  </Card>
                  <Card style={{padding: 10}}>
                  <FormGroup row>
                    <Col xs="12">
                      <h5>Proof Funds</h5>
                      <label className="mt-1">
                          Note: Only PDF file format only,
                          Maximum 10MB file size allowed
                      </label>
                    </Col>
                    <Col xs="6">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'ProofFunds')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      {/* {imagePreview4 && (
                        <img src={imagePreview4} className="showProfile" />
                      )}{" "} */}
                      <br />
                      {isImage.test(ProofFunds) && (
                        <a href={ProofFunds} target='_blank'>
                          <img src={ProofFunds} className="showProfile" />
                        </a>
                      )}
                      {isPDF.test(ProofFunds) && (
                        <a href={ProofFunds} target='_blank'>
                          <button class="btn btn-info">
                            download file
                          </button>
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
                    <Col xs="6">
                      <Card style={{padding: 10}}>
                        <label>
                          Status<span className="required">*</span>
                        </label>
                        <select
                          type="text"
                          name="pageLength"
                          value={ProofFundsstatus}
                          onChange={(e) => {
                            seterrors({
                              errorFile: "",
                            });
                            setProofFundsstatus(e.target.value);
                          }}
                          className="form-control"
                        >
                          <option value={1}>Pending</option>
                          <option value={2}>Verified</option>
                          <option value={3}>Not Verified</option>
                        </select>
                        {errors.errorType && (
                          <span className="invalid-text ">{errors.errorType}</span>
                        )}
                      </Card>
                    </Col>
                  </FormGroup>
                  </Card>
                  <FormGroup row>
                     <Col xs="6">
                     <Card style={{padding: 10}}>
                      <h5>
                        Signature<span className="required">*</span>
                      </h5>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'signature')}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      <div className="mt-3">
                        <label>Note: Maximum 10MB file size allowed</label>
                      </div>
                      {imagePreview6 && (
                        <img src={imagePreview4} className="showProfile" />
                      )}{" "}
                      {isImage.test(signature) && (
                        <a href={signature} target='_blank'>
                        <img src={signature} className="showProfile" />
                        </a>
                      )}
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
                      <Card style={{padding: 10}}>
                        <label>
                          Status<span className="required">*</span>
                        </label>
                        <select
                          type="text"
                          name="pageLength"
                          value={Signaturestatus}
                          onChange={(e) => {
                            seterrors({
                              errorFile: "",
                            });
                            setSignaturestatus(e.target.value);
                          }}
                          className="form-control"
                        >
                          <option value={1}>Pending</option>
                          <option value={2}>Verified</option>
                          <option value={3}>Not Verified</option>
                        </select>
                        {errors.errorType && (
                          <span className="invalid-text ">{errors.errorType}</span>
                        )}
                      </Card>
                    </Col>
                    <Col xs="12">
                      <label>
                        Comment (Maximum 50 character)
                      </label>
                      <input type={"text"} value={comment} className="form-control" onChange={e=>{e.target.value.length < 50 ? setcomment(e.target.value) : setcomment(comment)}} />
                    </Col>

                  </FormGroup>
                  <Card style={{padding: 10}}>
                  <FormGroup row>
                    <Col xs="12">
                      <h5>Bio details</h5>
                    </Col>
                    <Col xs="6">
                    <p>NDA</p>
                      <Input
                        name="NDA"
                        placeholder="Enter NDA"
                        value={nda == "Accept" ? "Accepted" : "Not Accepted"}
                        onChange={(e) => setnda(e.target.value)}
                        readOnly={true}
                        style={{
                          insetInlineStart: "10",
                          height: "50px",
                          marginBottom: "10px",
                        }}
                      />
                      <p>Location</p>
                      <Input
                        name="Location"
                        placeholder="Enter Location"
                        value={Location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{
                          insetInlineStart: "10",
                          height: "50px",
                          marginBottom: "10px",
                        }}
                      />
                      <p>Skills</p>
                    <Input
                        name="Skills"
                        placeholder="Enter Skills"
                        value={Skills}
                        onChange={(e) => setSkills(e.target.value)}
                        style={{
                          insetInlineStart: "10",
                          height: "50px",
                          marginBottom: "10px",
                        }}
                      />
                      <p>Education</p>
                    <Input
                        name="Education"
                        placeholder="Enter Education"
                        value={Education}
                        onChange={(e) => setEducation(e.target.value)}
                        style={{
                          insetInlineStart: "10",
                          height: "50px",
                          marginBottom: "10px",
                        }}
                      />
                      <p>Experience</p>
                    <Input
                        name="Experience"
                        placeholder="Enter Experience"
                        value={Experience}
                        onChange={(e) => setExperience(e.target.value)}
                        style={{
                          insetInlineStart: "10",
                          height: "50px",
                          marginBottom: "10px",
                        }}
                      />
                      <p>Wealth</p>
                    <Input
                        name="Wealth"
                        placeholder="Enter Wealth"
                        value={Wealth}
                        onChange={(e) => setWealth(e.target.value)}
                        style={{
                          insetInlineStart: "10",
                          height: "50px",
                          marginBottom: "10px",
                        }}
                      />
                      <p>Add</p>
                    <Input
                        name="Add"
                        placeholder="Enter Add"
                        value={Add}
                        onChange={(e) => setAdd(e.target.value)}
                        style={{
                          insetInlineStart: "10",
                          height: "50px",
                          marginBottom: "10px",
                        }}
                      />

                    </Col>
                    <Col xs="6">
                      <Card style={{padding: 10}}>
                        <label>
                          Status<span className="required">*</span>
                        </label>
                        <select
                          type="text"
                          name="pageLength"
                          value={textstatus}
                          onChange={(e) => {
                            seterrors({
                              errorFile: "",
                            });
                            settextstatus(e.target.value);
                          }}
                          className="form-control"
                        >
                          <option value={1}>Pending</option>
                          <option value={2}>Verified</option>
                          <option value={3}>Not Verified</option>
                        </select>
                        {errors.errorType && (
                          <span className="invalid-text ">{errors.errorType}</span>
                        )}
                      </Card>
                    </Col>
                  </FormGroup>
                  </Card>
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
                    <Link to="/Biography">
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
  updateUserBiography,
  getBiographyDetail,
})(EditBiography);
