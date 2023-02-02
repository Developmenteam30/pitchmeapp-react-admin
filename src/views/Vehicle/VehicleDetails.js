import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tippy'
import { toast, ToastContainer } from 'react-toastify'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
  Table,
} from 'reactstrap'
import { bindActionCreators } from 'redux'
import swal from 'sweetalert'
import * as VehicleActions from '../../actions/VehicleActions'

const VehicleDetails = (props) => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(10)

  const { getVehicles, deleteVehicle } = bindActionCreators(
    VehicleActions,
    dispatch
  )
  const { vehicleData, vehicleLoading } = useSelector((state) => state.vehicle)

  useEffect(() => {
    getVehicles(1, limit, '')
  }, [limit])

  const onDeleteVehicle = (data) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete ${data.title}  ?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteVehicle(data._id)
          .then((result) => {
            toast.success(result.data.message)
            getVehicles(vehicleData.page, limit, '')
          })
          .catch((err) => {
            if (err.response !== undefined) {
              toast.error(err.response.data.message)
            }
          })
      }
    })
  }
  const onFieldKeyPress = (e) => {
    if (e.target.name === 'search') {
      if (e.key === 'Enter') {
        getVehicles(1, limit, e.target.value)
      }
    }
  }
  const onPageClick = (page) => {
    getVehicles(page, limit, search)
  }

  const paginationSection = (data) => {
    const { page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
      data

    let Pages = []
    let skipped = 0
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
        const test = i
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
              key={i}>
              <PaginationLink tag='button'>{i}</PaginationLink>
            </PaginationItem>
          </React.Fragment>
        )
        skipped = 0
        Pages.push(item)
      } else {
        skipped = 1
      }
    }

    return (
      <nav className='float-right'>
        <Pagination>
          <PaginationItem
            onClick={hasPrevPage === true ? () => onPageClick(prevPage) : null}>
            <PaginationLink
              previous
              disabled={hasPrevPage === true ? false : true}
              tag='button'>
              Prev
            </PaginationLink>
          </PaginationItem>
          {Pages}
          <PaginationItem
            onClick={hasNextPage === true ? () => onPageClick(nextPage) : null}>
            <PaginationLink
              next
              tag='button'
              disabled={hasNextPage === true ? false : true}>
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </nav>
    )
  }

  let { page } = vehicleData
  page = page - 1
  const containerStyle = { zIndex: 1999 }
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
              <strong>Vehicles</strong>
            </CardHeader>
            <CardBody>
              <Col md='12'>
                <Row>
                  <Col md='12' className='pr-0'>
                    <div className='text-right mr-0 pr-0'>
                      <Link to='/vehicles/add'>
                        <Button
                          size='md'
                          className='btnColor btn-brand mr-1 mb-4'>
                          <i className='fa fa-plus'></i>
                          <span>Add </span>
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col md='6' className='pl-3'>
                  <div className='text-left'>
                    <span className=''>Show</span>
                    <select
                      type='text'
                      name='pageLength'
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                      className='form-control list-style input  d-inline  mx-2'>
                      <option value={10}>10 </option>
                      <option value={20}>20 </option>
                      <option value={50}>50 </option>
                      <option value={100}>100 </option>
                    </select>
                    <span className=''>Entries </span>
                  </div>
                </Col>
                <Col md='6' className='pr-3'>
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
              <Table responsive striped className='mt-2 customDataTable'>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Vehicle Name</th>
                    <th>Price (₹)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleData.docs.length > 0 && !vehicleLoading ? (
                    vehicleData.docs.map((vehicle, i) => (
                      <tr>
                        <td>{page * limit + (i + 1)}</td>
                        <td>{vehicle.title}</td>
                        <td>{vehicle.total_price}</td>
                        <td>
                          <Tooltip
                            position='bottom'
                            arrow={true}
                            distance={15}
                            trigger='mouseenter'
                            title='View Vehicle'>
                            <Link to={`/vehicles/details/${vehicle._id}`}>
                              <Button
                                size='md'
                                className='btn-twitter btn-brand ml-2'
                                type='button'>
                                <i className='fa fa-eye'></i>
                              </Button>
                            </Link>
                          </Tooltip>
                          <Tooltip
                            position='bottom'
                            arrow={true}
                            distance={15}
                            trigger='mouseenter'
                            title='Edit Vehicle Details'>
                            <Link to={`/vehicles/update/${vehicle._id}`}>
                              <Button
                                size='md'
                                color='info'
                                className='btn-spotify btn-brand ml-2'
                                type='button'>
                                <i className='fa fa-pencil'></i>
                              </Button>
                            </Link>
                          </Tooltip>
                          <Tooltip
                            position='bottom'
                            arrow={true}
                            distance={15}
                            trigger='mouseenter'
                            title='Delete Vehicle'>
                            <Button
                              size='md'
                              className='btn-youtube btn-brand ml-2'
                              onClick={() => onDeleteVehicle(vehicle)}
                              type='button'>
                              <i className='fa fa-trash'></i>
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : vehicleData.docs.length === 0 && !vehicleLoading ? (
                    <tr>
                      <td colSpan='4' className='text-center'>
                        No vehicle found
                      </td>
                    </tr>
                  ) : vehicleLoading ? (
                    <tr>
                      <td colSpan='4' className='text-center'>
                        <Spinner type='grow' />
                      </td>
                    </tr>
                  ) : null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Vehicle Name</th>
                    <th>Price (₹)</th>
                    <th>Actions</th>
                  </tr>
                </tfoot>
              </Table>
              <div className='row'>
                <div className='col-md-12'>
                  {paginationSection(vehicleData)}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default VehicleDetails
