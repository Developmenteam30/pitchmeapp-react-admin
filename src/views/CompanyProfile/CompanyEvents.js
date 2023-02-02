import React, { useState } from "react";
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
} from "reactstrap";
import { Tooltip } from "react-tippy";
import LaddaButton, { ZOOM_OUT } from "react-ladda/dist/LaddaButton";
import swal from "sweetalert";

import ReadMore from "react-read-more-read-less";
const CompanyEvents = () => {
  const [search, setSearch] = useState("");
  const [pageLength, setPageLength] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const setDefaultValue = () => {
    setShowModal(!showModal);
  };

  const onAdd = () => {
    setId("1");
    setDefaultValue();
  };
  const toggleModal = () => {
    setDefaultValue();
  };
  const onEdit = (data) => {
    setId("2");
    setShowModal(!showModal);
  };
  const onSave = () => {
    setDefaultValue();
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
                  <th>Event Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tata Motors</td>
                  <td>
                    <ReadMore
                      charLimit={25}
                      readMoreText={"Read more"}
                      readLessText={"Read less"}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Deleniti dolorum sapiente optio vitae aliquid quisquam
                      quis rem aliquam est repudiandae, nesciunt ipsum
                      laudantium sit, reiciendis pariatur! Impedit similique
                      quae dicta.
                    </ReadMore>
                  </td>
                  <td>12 December 2021</td>
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
                        onClick={() => onEdit()}
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
              </tbody>
              <tfoot>
                <tr>
                  <th>No.</th>
                  <th>Event Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </Table>
          </Card>
        </Col>
        <Modal isOpen={showModal}>
          <ModalHeader toggle={toggleModal}>
            {id === "2" ? "Edit Event" : "Add Event"}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup row>
                  <Col xs="12">
                    <label>Event Name</label>
                    <span className="required">*</span>
                  </Col>
                  <Col xs="12">
                    <Input type="text" placeholder="Enter Event Name" />
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
                    <Input type="textarea" placeholder="Enter description" />
                  </Col>
                </FormGroup>
              </Col>
              <Col xs="12">
                <FormGroup row>
                  <Col xs="12">
                    <label>Date </label>
                    <span className="required">*</span>
                  </Col>
                  <Col xs="12">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="select Date"
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col md="12">
                <Label>Image</Label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="choose file"
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="px-4">
            <LaddaButton
              className="btn btnColor px-4 btn-ladda"
              loading={submitLoading}
              data-color="blue"
              data-style={ZOOM_OUT}
              onClick={onSave}
            >
              {id ? "Update" : "Submit"}
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

export default CompanyEvents;
