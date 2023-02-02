import React, { Fragment, useEffect, useState } from "react";
import ReadMore from "react-read-more-read-less";
import { Card, CardBody, Col, Row, Spinner, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as companyActions from "../../actions/CompanyProfileActions";
import { useParams } from "react-router";

const CompanyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getCompanyDetailsById } = bindActionCreators(
    companyActions,
    dispatch
  );
  const { companyDetails, companyDetailsLoading } = useSelector(
    (state) => state.company
  );
  const [fetchDataLoading, setFetchDataLoading] = useState(false);

  useEffect(() => {
    if (!fetchDataLoading) {
      getCompanyDetailsById(id).then(() => {
        setFetchDataLoading(true);
      });
    }
  }, [getCompanyDetailsById, fetchDataLoading, id]);

  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardBody>
            {companyDetails && !companyDetailsLoading ? (
              <Table responsive striped className="custome-table-th-td">
                <tbody>
                  <Fragment>
                    <tr>
                      <th>Logo</th>
                      <th>
                        <div className="image-border w-25">
                          <img
                            src={companyDetails.logo}
                            width="100"
                            height="100%"
                            alt=""
                          />
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th>Banner</th>
                      <td>
                        <div className="image-banner w-100">
                          <img src={companyDetails.banner} alt="" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Company Name</th>
                      <td> {companyDetails.title}</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>
                        <ReadMore
                          charLimit={150}
                          readMoreText={"Read more"}
                          readLessText={"Read less"}
                        >
                          {companyDetails.address}
                        </ReadMore>
                      </td>
                    </tr>

                    <tr>
                      <th>Field </th>
                      <td> {companyDetails.field}</td>
                    </tr>
                    <tr>
                      <th>State </th>
                      <td> {companyDetails.stateName}</td>
                    </tr>
                    <tr>
                      <th>City </th>
                      <td> {companyDetails.cityName}</td>
                    </tr>
                    <tr>
                      <th>Website </th>
                      <td>
                        <a
                          href="https://www.tatamotors.com"
                          target="_blank"
                          className="website-link"
                          rel="noreferrer"
                        >
                          {companyDetails.website_url}
                        </a>
                      </td>
                    </tr>
                  </Fragment>
                </tbody>
              </Table>
            ) : companyDetailsLoading ? (
              <div className="w-100 text-center">
                <Spinner type="grow" />
              </div>
            ) : null}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CompanyDetails;
