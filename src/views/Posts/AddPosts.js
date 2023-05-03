import React, { useState } from "react";
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
import { addNewPost } from "../../actions/userActions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Select from 'react-select';

const AddPosts = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [type, setType] = useState("");
  const [category, setcategory] = useState([]);
  const [dropzone, setDropZone] = useState([]);
  const [fileName, setFileName] = useState("");
  const [imagePreview, setPreview] = useState("");
  const [imagePreviewUrl, setUrl] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const options = [
    { value: 'Advice', label: 'Advice' },
    { value: 'Mistakes', label: 'Mistakes' },
    { value: 'Strategies', label: 'Strategies' },
    { value: 'Motivational', label: 'Motivational' },
    { value: 'Success Stories', label: 'Success Stories' },
  ]

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
  const handleFileChange = (e) => {
    e.preventDefault();
    let validationFlag = true;

    if (e.target.files.length) {
      let file = e.target.files[0];

      let imageSize = e.target.files[0].size / 1024 / 1024;

      if (
        !file.name.match(
          /\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/
        )
      ) {
        validationFlag = false;
        setFileName("");

        if (type == "2") {
          seterrors({
            errorFile: "Only jpeg, jpg, png and GIF file format allowed",
          });
          setFileName("no");
        }

        if (type == "3") {
          seterrors({
            errorFile: "Only mp4 and mov file format allowed",
          });
          setFileName("no");
        }

        setUrl("");

        setPreview("");
      }
      if (imageSize > 10) {
        validationFlag = false;
        setUrl("");
        setFileName("");
        setPreview("");
        seterrors({
          errorFile: "Please select file less than 10 MB",
        });
      }
      if (validationFlag) {
        setUrl(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(e.target.files[0]));
        seterrors({
          errorFile: "",
        });
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
    } else if (type == 1 && content === "") {
      seterrors({
        errorFile: "Required field",
      });
    } else if (type != 1 && !fileName) {
      seterrors({
        errorFile: "Required field",
      });
    } else if (
      type != 1 &&
      !fileName.match(
        /\.(PNG||png||JPEG||jpeg||MP4||mp4||jpg||mov||MOV||gif||GIF)$/
      )
    ) {
      if (type == "2") {
        seterrors({
          errorFile: "Only jpeg, jpg, png and GIF file format allowed",
        });
      }

      if (type == "3") {
        seterrors({
          errorFile: "Only mp4 and mov file format allowed",
        });
      }
    } else {
      const formData = new FormData();
      var t = '[';
      category.forEach(e=>{
        t += e.value+',';
      })
      t = t+']';
      // formData.append("title", title);
      formData.append("type", type);
      formData.append("category", t);
      if (type == 1) {
        formData.append("text", content);
      } else {
        formData.append("file", imagePreviewUrl);
      }

      props
        .addNewPost(formData)
        .then((res) => {
          // toast.success(res.data.message);
          toast.success("Post added successfully");
          setTimeout(() => {
            props.history.push(`/posts`);
          }, 1300);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  const containerStyle = {
    zIndex: 1999,
  };

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
                <strong>Add Post</strong>
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
                      Type<span className="required">*</span>
                    </label>
                    <select
                      type="text"
                      name="pageLength"
                      value={type}
                      onChange={(e) => {
                        seterrors({
                          errorFile: "",
                        });
                        setType(e.target.value);
                      }}
                      className="form-control"
                    >
                      <option value={""}>Select Type</option>

                      <option value={1}>Article</option>
                      <option value={2}>Image</option>
                      <option value={3}>Video</option>
                    </select>
                    {errors.errorType && (
                      <span className="invalid-text ">{errors.errorType}</span>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="6">
                    <label>
                      Category<span className="required">*</span> 
                    </label>
                    {category.length > 0 ? (
                      <div>
                        <Select
                          defaultValue={category}
                          isMulti
                          name="colors"
                          options={options}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(e)=>{setcategory(e)}}
                        />
                      </div>
                    ) : (
                      <Select
                        isMulti
                        name="colors"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e)=>{setcategory(e)}}
                        />
                    )}
                  </Col>
                </FormGroup>

                {type == 1 && (
                  <FormGroup row>
                    <Col xs="12">
                      <label>
                        Content<span className="required">*</span>
                      </label>
                      <ReactQuill
                        name="content"
                        placeholder="Enter Content"
                        value={content}
                        onChange={(e) => onContentChange(e)}
                        modules={modules}
                        style={{
                          insetInlineStart: "10",
                          height: "250px",
                          marginBottom: "59px",
                        }}
                      />
                      {errors.errorFile && (
                        <span className="invalid-text">{errors.errorFile}</span>
                      )}
                    </Col>
                  </FormGroup>
                )}
                {type == 2 && (
                  <FormGroup row>
                    <Col xs="12">
                      <label>
                        Image<span className="required">*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e)}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      <img src={imagePreview} className="showProfile" />
                      {errors.errorFile && (
                        <span className="invalid-text">{errors.errorFile}</span>
                      )}
                      <div>
                        <label className="mt-1">
                          Note: Only jpeg, jpg, png and GIF file format only,
                          Maximum 10MB file size allowed
                        </label>
                      </div>
                      {/* <div>
                        <label className="mt-1">
                         
                        </label>
                      </div> */}
                    </Col>
                  </FormGroup>
                )}
                {type == 3 && (
                  <FormGroup row>
                    <Col xs="12">
                      <label>
                        Video<span className="required">*</span>
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange(e)}
                        capture="camera"
                        style={{ height: "auto" }}
                        className={classnames("form-control-file")}
                      />
                      {imagePreview && (
                        <video
                          className="mt-2"
                          height={150}
                          width={250}
                          controls
                          src={imagePreview}
                        />
                      )}
                      {errors.errorFile && (
                        <label className="invalid-text my-1">
                          {errors.errorFile}
                        </label>
                      )}
                      <div className="mt-3">
                        <label>Note: Maximum 10MB file size allowed</label>
                      </div>
                    </Col>
                  </FormGroup>
                )}
                <Row>
                  <div className="w-100 float-left mt-1 ml-3">
                    <LaddaButton
                      className="btn btnColor px-4 btn-ladda"
                      loading={saveLoading}
                      data-color="blue"
                      data-style={ZOOM_OUT}
                      onClick={(e) => onSubmitForm(e)}
                    >
                      Save
                    </LaddaButton>
                    <Link to="/posts">
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
  addNewPost,
})(AddPosts);
