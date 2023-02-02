import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import swal from 'sweetalert'
import { Tooltip } from 'react-tippy'
import { bindActionCreators } from 'redux'
import * as companyActions from '../../actions/CompanyProfileActions'
import { useDispatch, useSelector } from 'react-redux'

const CompanyProfile = (props) => {
  const dispatch = useDispatch()
  const { getCompanyDetails, deleteCompnay } = bindActionCreators(
    companyActions,
    dispatch
  )
  const [limit, setLmit] = useState(10)
  const [search, setSearch] = useState('')
  const [isDataLoad, setIsDataLoad] = useState(false)

  useEffect(() => {
    if (!isDataLoad) {
      getCompanyDetails(1, limit, '').then((res) => {
        setIsDataLoad(true)
      })
    }
  }, [limit, getCompanyDetails, isDataLoad])

  const { companyData, companyLoading } = useSelector((state) => state.company)

  const onDeleteCompany = (company) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete ${company.title.toLowerCase()}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const { page } = companyData
        deleteCompnay(company._id)
          .then((res) => {
            toast.success(res.data.message)
            getCompanyDetails(page, limit, search)
          })
          .catch((err) => {
            toast.error(err.respoonse.data.message)
          })
      }
    })
  }

  const changeLimit = (value) => {
    setLmit(value)
    const { page } = companyData

    getCompanyDetails(page, value, search)
  }

  // use: // -> search
  const onFieldKeyPress = (e) => {
    const { name, value } = e.target

    if (name === 'search') {
      if (e.key === 'Enter') {
        getCompanyDetails(1, limit, value)
      }
    }
  }

  const onPageClick = (page) => {
    getCompanyDetails(page, limit, search)
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
              <i className='far fa-building'></i>
              <strong>Company</strong>
            </CardHeader>
            <CardBody>
              <Col md='12'>
                <Row>
                  <Col md='12' className='pr-0'>
                    <div className='text-right mr-0 pr-0'>
                      <Link to='/company/add'>
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
                      onChange={(e) => changeLimit(e.target.value)}
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
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Field</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companyData.docs.length > 0 && !companyLoading ? (
                    companyData.docs.map((company, i) => (
                      <tr key={company._id}>
                        <td>{i + 1}</td>
                        <td>{company.title}</td>
                        <td>{company.address}</td>
                        <td>{company.field}</td>
                        <td>
                          <Tooltip
                            title='View Company Details'
                            position='bottom'
                            arrow={true}
                            distance={15}
                            trigger='mouseenter'>
                            <Link to={`/company/${company._id}`}>
                              <Button
                                size='md'
                                className='btn-twitter btn-brand  mr-2'
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
                            title='Edit Company Details'>
                            <Link to={`/company/update/${company._id}`}>
                              <Button
                                size='md'
                                color='info'
                                className='btn-spotify btn-brand'
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
                            title='Delete Company'>
                            <Button
                              size='md'
                              className='btn-youtube btn-brand ml-2'
                              onClick={() => onDeleteCompany(company)}
                              type='button'>
                              <i className='fa fa-trash'></i>
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : companyLoading ? (
                    <tr>
                      <td colSpan='7' className='middle-align text-center'>
                        <Spinner type='grow' />
                      </td>
                    </tr>
                  ) : companyData.docs.length === 0 && !companyLoading ? (
                    <tr>
                      <td colSpan='9' className='middle-align text-center'>
                        No companies found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Field</th>
                    <th>Actions</th>
                  </tr>
                </tfoot>
              </Table>
              <div className='row'>
                <div className='col-md-12'>
                  {paginationSection(companyData)}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default CompanyProfile
