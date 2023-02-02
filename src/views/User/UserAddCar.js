import React, { useEffect, useState } from 'react';
import LaddaButton, { ZOOM_OUT } from 'react-ladda/dist/LaddaButton';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import { toast, ToastContainer } from 'react-toastify';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
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
} from 'reactstrap';
import swal from 'sweetalert';
import {
  deleteUserOwnedVehicals,
  getUserOwnedVehicals,
  addNewOwnedVehicals,
  updateUserOwnedVehicals,
  getUserOwnedVehicalsById,
  getCompanyDropDown,
  getModalDropDown,
} from '../../actions/userActions';
import Select from 'react-select';
import { checkEmptyValidation } from '../../Helpers/Validation';

const UserAddCar = (props) => {
  const {
    getUserOwnedVehicals,
    user_details,
    deleteUserOwnedVehicals,
    addNewOwnedVehicals,
    updateUserOwnedVehicals,
    getUserOwnedVehicalsById,
    getCompanyDropDown,
    getModalDropDown,
  } = props;
  let history = useHistory();
  const { _id } = useParams();
  const [UpdateData, setUpdateData] = useState(null);
  const [editId, setEditId] = useState('');
  const [search, setSearch] = useState('');
  const [pageLimit, setPageLimit] = useState(10);
  const [pageLength, setPageLength] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSaveLoading] = useState(false);
  const [getCarBrand, setCarBrand] = useState({ car_brand_options: [] });
  const [getCarModal, setCarModal] = useState({ car_modal_options: [] });

  const [state, setstate] = useState({
    car_brand: '',
    vehicle: '',
  });

  const [errors, seterrors] = useState({
    error_car_brand: '',
    error_vehicle: '',
  });

  useEffect(() => {
    getCompanyDropDown().then((res) => {
      var response = res.data.result.map((s) => {
        return {
          value: s._id,
          label: s.title,
        };
      });
      setCarBrand({
        car_brand_options: response,
      });
    });
  }, []);

  useEffect(() => {
    getModalDropDown(state.car_brand).then((res) => {
      var response = res.data.result.map((s) => {
        return {
          value: s._id,
          label: s.title,
        };
      });
      setCarModal({
        car_modal_options: response,
      });
    });
  }, [state.car_brand]);

  const onSelectCarBrand = (value) => {
    setstate({
      ...state,
      car_brand: value ? value.value : '',
    });
  };

  const onSelectCarModal = (value) => {
    setstate({
      ...state,
      vehicle: value ? value.value : '',
    });
  };

  const setDefaultValue = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getUserOwnedVehicals(_id, pageLength, pageLimit, '');
  }, [_id, pageLength, pageLimit]);

  const onAddNewBlog = () => {
    setUpdateData(false);
    setDefaultValue();
    setstate({
      car_brand: '',
      vehicle: '',
    });
  };

  const toggleModal = () => {
    setDefaultValue();
    setSaveLoading(false);
  };

  const onEditBlog = (user) => {
    setUpdateData(true);
    setEditId(user._id);
    setDefaultValue();
    getUserOwnedVehicalsById(user._id).then((res) => {
      let response = res.data.result;
      setstate({
        ...state,
        car_brand: response.brand,
        vehicle: response.vehicle,
      });
      setShowModal(!showModal);
    });
  };

  const onFieldKeyPress = (e) => {
    if (e.target.name === 'search') {
      if (e.key === 'Enter') {
        getUserOwnedVehicals(_id, pageLength, pageLimit, e.target.value);
      }
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { car_brand, vehicle } = state;
    let validationFlag = true;
    let errBrand = '';
    let errVehicle = '';
    errBrand = checkEmptyValidation(car_brand, 'car_brand');
    errVehicle = checkEmptyValidation(vehicle, 'vehicle');
    if (errBrand || errVehicle) {
      validationFlag = false;
      seterrors({
        error_car_brand: errBrand,
        error_vehicle: errVehicle,
      });
    } else {
      validationFlag = true;
      seterrors({
        error_car_brand: '',
        error_vehicle: '',
      });
    }
    if (validationFlag === true) {
      setSaveLoading(true);
      const updateVehicle = {
        brand: state.car_brand,
        vehicle: state.vehicle,
      };
      const addVehicle = {
        user: _id,
        brand: state.car_brand,
        vehicle: state.vehicle,
      };
      if (UpdateData === true) {
        updateUserOwnedVehicals(editId, updateVehicle)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setDefaultValue();
            getUserOwnedVehicals(_id, pageLength, pageLimit, '');
            setTimeout(() => {
              history.push(`/user/view/${_id}`);
            }, 1300);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      } else {
        addNewOwnedVehicals(addVehicle)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setDefaultValue();
            getUserOwnedVehicals(_id, pageLength, pageLimit, '');
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

  const ondeleteUserBlog = (user) => {
    console.log(
      '🚀 ~ file: UserAddCar.js ~ line 222 ~ ondeleteUserBlog ~ user',
      user
    );
    swal({
      car_brand: 'Are you sure?',
      text: `Are you sure that you want to delete vehicle ${user.modelData.title} ?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUserOwnedVehicals(user._id)
          .then((result) => {
            toast.success(result.data.message);
            getUserOwnedVehicals(_id, pageLength, pageLimit, '');
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
    getUserOwnedVehicals(_id, page, pageLimit, '');
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
                <PaginationLink disabled tag='button'>
                  ...
                </PaginationLink>
              </PaginationItem>
            ) : null}
            <PaginationItem
              active={page === i ? true : false}
              onClick={page === i ? () => null : () => onPageClick(test)}
              key={i}
            >
              <PaginationLink tag='button'>{i}</PaginationLink>
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
              tag='button'
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
              tag='button'
              disabled={hasNextPage === true ? false : true}
            >
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </nav>
    );
  };

  const { userOwnedVehicals, userOwnedVehicalsLoading } = user_details;
  let { page } = userOwnedVehicals;
  page = page - 1;

  return (
    <div className='animated fadeIn'>
      <Row>
        <Col xs='12'>
          <Card body className='px-0 py-0'>
            <CardBody className='px-3 py-3'>
              <Col md='12'>
                <Row>
                  <Col md='12'>
                    <div className='text-right'>
                      <Tooltip
                        title='Add Owned vehicle'
                        position='bottom'
                        arrow={true}
                        distance={15}
                        trigger='mouseenter'
                      >
                        <Button
                          size='md'
                          className='btnColor btn-brand my-4'
                          onClick={() => onAddNewBlog()}
                        >
                          <i className='fa fa-plus'></i>
                          <span>Add</span>
                        </Button>
                      </Tooltip>
                    </div>
                  </Col>
                  <Col md='6' className='pl-0'>
                    <div className='text-left'>
                      <span className=''>Show</span>
                      <select
                        type='text'
                        name='pageLimit'
                        value={pageLimit}
                        onChange={(e) => setPageLimit(e.target.value)}
                        className='form-control list-style  d-inline  mx-2'
                      >
                        <option value={10}>10 </option>
                        <option value={20}>20 </option>
                        <option value={50}>50 </option>
                        <option value={100}>100 </option>
                      </select>
                    </div>
                  </Col>
                  <Col md='6' className='pr-0'>
                    <div className='text-right'>
                      <span className=''>Search : </span>
                      <input
                        type='text'
                        name='search'
                        className='form-control w-50 input  d-inline'
                        onKeyPress={(e) => onFieldKeyPress(e)}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Table responsive striped className='mt-2 customDataTable'>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Brand</th>
                    <th>Modal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userOwnedVehicals &&
                  userOwnedVehicals.docs.length > 0 &&
                  !userOwnedVehicalsLoading ? (
                    userOwnedVehicals.docs.map((user, i) => (
                      <tr key={i}>
                        <td>{page * pageLength + (i + 1)}</td>
                        <td>
                          {user && user.brandData && user.brandData.title}
                        </td>
                        <td>
                          {user && user.modelData && user.modelData.title}
                        </td>
                        <td>
                          <Tooltip
                            title='Edit Owned vehicle'
                            position='bottom'
                            arrow={true}
                            distance={15}
                            trigger='mouseenter'
                          >
                            <Button
                              size='md'
                              className='btn-spotify btn-brand ml-2'
                              onClick={() => onEditBlog(user)}
                              type='button'
                            >
                              <i className='fa fa-pencil'></i>
                            </Button>
                          </Tooltip>
                          <Tooltip
                            title='Delete Owned vehicle'
                            position='bottom'
                            arrow={true}
                            distance={15}
                            trigger='mouseenter'
                          >
                            <Button
                              size='md'
                              className='btn-youtube btn-brand ml-2'
                              onClick={() => ondeleteUserBlog(user)}
                              type='button'
                            >
                              <i className='fa fa-trash'></i>
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : userOwnedVehicalsLoading ? (
                    <tr>
                      <td colSpan='6' className='middle-align text-center'>
                        <Spinner type='grow' />
                      </td>
                    </tr>
                  ) : userOwnedVehicals.docs.length === 0 &&
                    !userOwnedVehicalsLoading ? (
                    <tr>
                      <td colSpan='6' className='middle-align text-center'>
                        No Owned vehicle found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Brand</th>
                    <th>Modal</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </Table>
              <div className='row float-right'>
                <div className='col-md-12 '>
                  {paginationSection(userOwnedVehicals)}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Modal isOpen={showModal}>
          <ModalHeader toggle={toggleModal}>
            {UpdateData ? 'Edit Owned vehicle' : 'Add Owned vehicle'}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs='12'>
                <FormGroup>
                  <label>Brand</label>
                  <Select
                    name='getCarBrand'
                    placeholder='Select Brand'
                    value={getCarBrand.car_brand_options.find(
                      (s) => s.value === state.car_brand
                    )}
                    isClearable={true}
                    options={getCarBrand.car_brand_options}
                    onChange={(e) => onSelectCarBrand(e)}
                  ></Select>
                </FormGroup>
              </Col>
              <Col xs='12'>
                <FormGroup>
                  <label>Vehicle</label>
                  <Select
                    name='getCarModal'
                    placeholder='Select Vehicle'
                    value={getCarModal.car_modal_options.find(
                      (s) => s.value === state.vehicle
                    )}
                    isClearable={true}
                    options={getCarModal.car_modal_options}
                    onChange={(e) => onSelectCarModal(e)}
                  ></Select>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className='px-4'>
            <LaddaButton
              className='btn btnColor px-4 btn-ladda'
              loading={submitLoading}
              data-color='blue'
              data-style={ZOOM_OUT}
              onClick={(e) => onSubmitForm(e)}
            >
              {UpdateData ? 'Submit' : 'Update'}
            </LaddaButton>

            <button className='btn btn-outline cancel' onClick={toggleModal}>
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
  getUserOwnedVehicals,
  deleteUserOwnedVehicals,
  addNewOwnedVehicals,
  updateUserOwnedVehicals,
  getUserOwnedVehicalsById,
  getCompanyDropDown,
  getModalDropDown,
})(UserAddCar);
