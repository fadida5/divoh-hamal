import React, { useState, useEffect } from 'react';

import { Link, withRouter, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import axios from 'axios';
import history from 'history.js'
import { toast } from "react-toastify";


function AdminSignInForm() {

return (
  <div>
    <Container className="mt--8 pb-5">
        <Row>
          <Col lg="6">
          <Card className="card-chart">
             <CardHeader>
                <h3 className="card-category text-center">טבלאת אירועים</h3>
              </CardHeader>
            <CardBody>
            <table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">יחידה</th>
                      <th className="text-center">סוג אירוע</th>
                      <th className="text-center">פירוט האירוע</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>

            </CardBody>
          </Card>
          </Col>
          <Col lg="6">
            <Row>
             <Col lg="12">
              <Card className="card-chart">
              <CardHeader>
                <h3 className="card-category text-center"> אירועים לפי פיקוד</h3>
              </CardHeader>
               <CardBody>
                <h1>2</h1>
               </CardBody>
              </Card>
             </Col>
             <Col lg="12">
              <Card className="card-chart">
              <CardHeader>
                <h3 className="card-category text-center"> אירועים לפי סוג אירוע</h3>
              </CardHeader>
               <CardBody>
                <h1>3</h1>
               </CardBody>
              </Card>
             </Col>
            </Row>
          </Col>
        </Row>
    </Container>
  </div>
)
}

export default AdminSignInForm;
