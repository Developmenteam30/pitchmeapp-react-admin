import React, { useEffect, useState } from "react";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import ShowMore from "react-show-more";
import parse from "html-react-parser";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
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
  deleteUserPost,
  getUserPost,
  addNewPost,
  updateUserPost,
  getUserPostById,
} from "../../actions/userActions";
import classnames from "classnames";
import { checkEmptyValidation } from "../../Helpers/Validation";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

const UserPost = (props) => {
  const {
    getUserPost,
    user_details,
    deleteUserPost,
    addNewPost,
    updateUserPost,
    getUserPostById,
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
  const [photoError, setPhotoError] = useState("");
  const [imagePreview, setPreview] = useState([]);
  const [imagePreviewUrl, setUrl] = useState([]);

  const [state, setstate] = useState({
    title: "",
    description: "",
  });

  const [errors, seterrors] = useState({
    error_title: "",
    error_description: "",
  });

  const setDefaultValue = () => {
    setShowModal(!showModal);
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
    imageResize: {
      // parchment: Quill.import('parchment'),
      modules: ["Resize", "DisplaySize"],
    },
  };

  useEffect(() => {
    getUserPost(_id, pageLength, pageLimit, "");
  }, [_id, pageLength, pageLimit]);

  const onAddNewPost = () => {
    setUpdateData(false);
    setDefaultValue();
    setstate({
      title: "",
      description: "",
    });
    setUrl([]);
    setPreview([]);
  };

  const toggleModal = () => {
    setDefaultValue();
    setSaveLoading(false);
  };

  const onContentChange = (content) => {
    setstate({
      ...state,
      description: content,
    });
  };

  const onEditPost = (user) => {
    setUpdateData(true);
    setEditId(user._id);
    getUserPostById(user._id).then((res) => {
      let response = res.data.result;
      setstate({
        ...state,
        title: response.title,
        description: response.description,
      });
      setUrl(response.image);
      setPreview(response.image);
      setShowModal(!showModal);
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    let images = [];
    let imageUrl = [];
    for (let i = 0; i < e.target.files.length; i++) {
      imageUrl.push(e.target.files[i]);
      images.push(URL.createObjectURL(e.target.files[i]));
      setUrl(imageUrl);
      setPreview(images);
    }
  };

  const onFieldKeyPress = (e) => {
    if (e.target.name === "search") {
      if (e.key === "Enter") {
        getUserPost(_id, pageLength, pageLimit, e.target.value);
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
    let errImage = "";
    errTitle = checkEmptyValidation(title, "Title");
    errDescription = checkEmptyValidation(description, "Description");
    errImage = checkEmptyValidation(imagePreviewUrl, "Image");
    if (errTitle || errDescription || errImage) {
      validationFlag = false;
      seterrors({
        error_title: errTitle,
        error_description: errDescription,
      });
      setPhotoError(errImage);
    } else {
      validationFlag = true;
      seterrors({
        error_title: "",
        error_description: "",
      });
      setPhotoError("");
    }
    if (validationFlag === true) {
      setSaveLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      for (let i = 0; i < imagePreviewUrl.length; i++) {
        formData.append("image", imagePreviewUrl[i]);
      }
      if (UpdateData === false) {
        formData.append("other", _id);
        formData.append("type", 1);
      }
      if (UpdateData === true) {
        updateUserPost(editId, formData)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setDefaultValue();
            getUserPost(_id, pageLength, pageLimit, "");
            setTimeout(() => {
              history.push(`/user/view/${_id}`);
            }, 1300);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      } else {
        addNewPost(formData)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setDefaultValue();
            getUserPost(_id, pageLength, pageLimit, "");
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

  const onDeleteUserPost = (user) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete user's post ${user.title} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUserPost(user._id)
          .then((result) => {
            toast.success(result.data.message);
            getUserPost(_id, pageLength, pageLimit, "");
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
    getUserPost(_id, page, pageLimit, "");
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

  const { userPost, userPostLoading } = user_details;
  let { page } = userPost;
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
                        title="Add Post"
                        position="bottom"
                        arrow={true}
                        distance={15}
                        trigger="mouseenter"
                      >
                        <Button
                          size="md"
                          className="btnColor btn-brand my-4"
                          onClick={() => onAddNewPost()}
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
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userPost && userPost.docs.length > 0 && !userPostLoading ? (
                    userPost.docs.map((user, i) => (
                      <tr key={i}>
                        <td>{page * pageLength + (i + 1)}</td>
                        <td>{user.title}</td>
                        <td className="readmore-box">
                          <ShowMore lines={2} more="Show more" less="Show less">
                            {parse(user.description)}
                          </ShowMore>
                        </td>
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
                              onClick={() => onEditPost(user)}
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
                              onClick={() => onDeleteUserPost(user)}
                              type="button"
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : userPostLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        <Spinner type="grow" />
                      </td>
                    </tr>
                  ) : userPost.docs.length === 0 && !userPostLoading ? (
                    <tr>
                      <td colSpan="6" className="middle-align text-center">
                        No Post found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </Table>
              <div className="row float-right">
                <div className="col-md-12 ">{paginationSection(userPost)}</div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Modal size="lg" isOpen={showModal}>
          <ModalHeader toggle={toggleModal}>
            {UpdateData ? "Edit Post" : "Add Post"}
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
                    value={state.title || ""}
                    placeholder="Enter Title"
                    onChange={(e) => handleInputChange(e)}
                    style={{ height: "auto" }}
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
                    <label>Description</label>
                    <span className="required">*</span>
                  </Col>
                  <Col xs="12">
                    <ReactQuill
                      name="description"
                      placeholder="Enter Description"
                      value={state.description}
                      onChange={(e) => onContentChange(e)}
                      modules={modules}
                      style={{
                        insetInlineStart: "10",
                        height: "250px",
                        marginBottom: "59px",
                      }}
                    />
                    {errors.error_description && (
                      <span className="invalid-text ">
                        {errors.error_description}
                      </span>
                    )}
                  </Col>
                </FormGroup>
              </Col>
              <Col md="12">
                <Label>Image</Label>
                <input
                  id="image"
                  type="file"
                  multiple
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
                    <span className="invalid-text ">{photoError}</span>
                  </div>
                )}
                {imagePreview.length > 0 &&
                  imagePreview.map((image, i) => (
                    <span key={i}>
                      <img
                        src={image}
                        className="border-rounded"
                        alt=""
                        style={{
                          margin: "10px",
                          width: "75px",
                          objectFit: "cover",
                        }}
                      />
                    </span>
                  ))}
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
  getUserPost,
  deleteUserPost,
  addNewPost,
  updateUserPost,
  getUserPostById,
})(UserPost);
