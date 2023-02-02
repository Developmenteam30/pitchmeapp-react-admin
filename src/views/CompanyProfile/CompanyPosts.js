import React, { useEffect, useState } from "react";
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
  Label,
  Spinner,
} from "reactstrap";
import { Tooltip } from "react-tippy";
import LaddaButton, { ZOOM_OUT } from "react-ladda/dist/LaddaButton";
import swal from "sweetalert";
import ReadMore from "react-read-more-read-less";
import { bindActionCreators } from "redux";
import * as companyActions from "../../actions/CompanyProfileActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import classNames from "classnames";
import {
  checkEmptyValidation,
  checkRequiredValidationWithMinMax,
} from "../../Helpers/Validation";

const CompanyPosts = () => {
  const dispatch = useDispatch();
  const {
    getCompanyPost,
    deleteCompnayPost,
    addCompanyPosts,
    updateCompanyPosts,
  } = bindActionCreators(companyActions, dispatch);
  const { id } = useParams();
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    if (!isDataLoad) {
      getCompanyPost({
        other: id,
        page: 1,
        limit: limit,
        search: search,
      }).then((res) => {
        setIsDataLoad(true);
      });
    }
  }, [limit, getCompanyPost, id, isDataLoad, search]);

  const { companyPosts, companyPostsLoading } = useSelector(
    (state) => state.company
  );

  const setDefaultValue = () => {
    setShowModal(!showModal);
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
        setPhotoError("Please select image.");
      } else if (
        !file.name.match(/\.(jpg|jpeg|png|gif||PNG||JPG||JPEG||GIF)$/)
      ) {
        setPhotoError("Please select Valid Image.");
      } else if (imageSize > 2) {
        setPhotoError("Please select image less than 2 MB.");
      } else {
        let imageDataUrl = await readFile(file);
        setPhoto(file);
        setPhotoPreview(imageDataUrl);
        setPhotoError("");
      }
    }
  };
  const onAdd = () => {
    setDefaultValue();
  };
  const toggleModal = () => {
    setDefaultValue();
  };
  const onEditPostClick = (data) => {
    setPostId(data._id);
    setTitle(data.title);
    setDescription(data.description);
    setPhoto(data.image);
    setPhotoPreview(data.image);
    setShowModal(!showModal);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    let errTitle = "";
    let errDescription = "";
    let errPhoto = "";

    errTitle = checkRequiredValidationWithMinMax(title, "post title", 2, 50);
    errDescription = checkRequiredValidationWithMinMax(
      description,
      "Post description",
      2,
      255
    );
    errPhoto = checkEmptyValidation(photo, "Post photo ");

    if (errTitle || errDescription || errPhoto) {
      setTitleError(errTitle);
      setDescriptionError(errDescription);
      setPhotoError(errPhoto);
    } else {
      setTitleError("");
      setDescriptionError("");
      setPhotoError("");

      const postData = new FormData();
      postData.append("title", title);
      postData.append("other", id);
      postData.append("description", description);
      postData.append("image", photo);
      postData.append("type", 2);

      setSubmitLoading(true);
      if (postId) {
        updateCompanyPosts(postId, postData)
          .then((res) => {
            setSubmitLoading(false);
            toast.success(res.data.message);
            getCompanyPost({
              other: id,
              page: 1,
              limit: limit,
              search: search,
            });
            setShowModal(false);
          })
          .catch((err) => {
            setSubmitLoading(false);
            toast.error(err.response.data.message);
          });
      } else {
        addCompanyPosts(postData)
          .then((res) => {
            setSubmitLoading(false);
            toast.success(res.data.message);
            getCompanyPost({
              other: id,
              page: 1,
              limit: limit,
              search: search,
            });
            setShowModal(false);
          })
          .catch((err) => {
            setSubmitLoading(false);
            toast.error(err.response.data.message);
          });
      }
    }
  };
  const onDeletePost = (post) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete ${post.title.toLowerCase()}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const { page } = CompanyPosts;
        deleteCompnayPost(post._id)
          .then((res) => {
            toast.success(res.data.message);
            getCompanyPost({
              other: id,
              page: page,
              limit: limit,
              search: search,
            });
          })
          .catch((err) => {
            toast.error(err.respoonse.data.message);
          });
      }
    });
  };
  //
  const changeLimit = (value) => {
    setLimit(value);
    const { page } = companyPosts;

    getCompanyPost({
      other: id,
      page: page,
      limit: value,
      search: search,
    });
  };

  // use: // -> search
  const onFieldKeyPress = (e) => {
    const { name, value } = e.target;

    if (name === "search") {
      if (e.key === "Enter") {
        getCompanyPost({
          other: id,
          page: 1,
          limit: limit,
          search: value,
        });
      }
    }
  };

  const onPageClick = (page) => {
    getCompanyPost({
      other: id,
      page: 1,
      limit: limit,
      search: search,
    });
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
      <nav className="float-right">
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
  let { page } = CompanyPosts;
  page -= 1;
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
                        className="btnColor btn-brand mb-3"
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
                      value={limit}
                      onChange={(e) => changeLimit(e.target.value)}
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
                  <th>Post Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {companyPosts.docs.length > 0 && !companyPostsLoading ? (
                  companyPosts.docs.map((post, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{post.title}</td>
                      <td>
                        <ReadMore
                          charLimit={200}
                          readMoreText={"Read more"}
                          readLessText={"Read less"}
                        >
                          {post.description}
                        </ReadMore>
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
                            onClick={() => onEditPostClick(post)}
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
                            onClick={() => onDeletePost(post)}
                            type="button"
                          >
                            <i className="fa fa-trash"></i>
                          </Button>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
                ) : companyPostsLoading ? (
                  <tr>
                    <td colSpan="7" className="middle-align text-center">
                      <Spinner type="grow" />
                    </td>
                  </tr>
                ) : companyPosts.docs.length === 0 && !companyPostsLoading ? (
                  <tr>
                    <td colSpan="9" className="middle-align text-center">
                      No posts found
                    </td>
                  </tr>
                ) : null}
              </tbody>
              <tfoot>
                <tr>
                  <th>No.</th>
                  <th>Post Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </Table>
            <div className="row">
              <div className="col-md-12 text-right">
                {paginationSection(companyPosts)}
              </div>
            </div>
          </Card>
        </Col>
        <Modal isOpen={showModal}>
          <ModalHeader toggle={toggleModal}>
            {postId ? "Edit Post" : "Add Post"}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup row>
                  <Col xs="12">
                    <label>Post Title</label>
                    <span className="required">*</span>
                  </Col>
                  <Col xs="12">
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter post title"
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ height: "auto" }}
                      value={title}
                      className={classNames(
                        "form-control input",
                        {
                          invalid: titleError.length > 0,
                        },
                        {
                          valid: titleError.length === 0,
                        }
                      )}
                    />
                    {titleError && (
                      <span className="invalid-text ">{titleError}</span>
                    )}
                  </Col>
                </FormGroup>
              </Col>
              <Col xs="12">
                <FormGroup row>
                  <Col xs="12">
                    <label>Description</label>
                    <span className="required">*</span>
                  </Col>
                  <Col xs="12">
                    <textarea
                      type="text"
                      placeholder="Enter post description"
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ height: "auto" }}
                      value={description}
                      className={classNames(
                        "form-control input",
                        {
                          invalid: descriptionError.length > 0,
                        },
                        {
                          valid: descriptionError.length === 0,
                        }
                      )}
                    />
                    {descriptionError && (
                      <span className="invalid-text ">{descriptionError}</span>
                    )}
                  </Col>
                </FormGroup>
              </Col>
              <Col md="12">
                <Label>Image</Label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  capture="camera"
                  onChange={(e) => {
                    handleImageChange(e, "banner");
                  }}
                  style={{ height: "auto" }}
                  className={classNames(
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
                {photoPreview !== "" && (
                  <img
                    src={photoPreview}
                    className="border-rounded rounded mt-3"
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="px-4">
            <LaddaButton
              className="btn btnColor px-4 btn-ladda"
              loading={submitLoading}
              data-color="blue"
              data-style={ZOOM_OUT}
              onClick={onSubmitForm}
            >
              {postId ? "Update" : "Submit"}
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

export default CompanyPosts;
