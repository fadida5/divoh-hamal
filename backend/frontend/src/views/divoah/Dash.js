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
      <Row className="justify-content-center">
      <Col lg="10" md="2">
            <Card className="shadow border-0">
                <CardHeader> <h2 className="text-center">עשרת הדיברות בבטיחות בעבודה</h2></CardHeader>
                <CardBody className="text-right">
                <li> t is a long established fact that a reader will be 
                distracted by the readable content of a page when looking
                 at its layout. The point of using Lorem Ipsum is that it 
                 has a more-or-less normal distribution of letters, as opposed
                to using 'Content here, content here', making it look like 
                readable English. Many desktop publishing packages and web
                page editors now use Lorem Ipsum as their default model text,
                and a search for 'lorem ipsum' will uncover many web sites still in their infancy
                . Various versions have evolved over the years, sometimes by accident,
                 sometimes on purpose (injected humour and the like).
                </li>
                <li> t is a long established fact that a reader will be 
                distracted by the readable content of a page when looking
                 at its layout. The point of using Lorem Ipsum is that it 
                 has a more-or-less normal distribution of letters, as opposed
                to using 'Content here, content here', making it look like 
                readable English. Many desktop publishing packages and web
                page editors now use Lorem Ipsum as their default model text,
                and a search for 'lorem ipsum' will uncover many web sites still in their infancy
                . Various versions have evolved over the years, sometimes by accident,
                 sometimes on purpose (injected humour and the like).
                </li>

                </CardBody>
            </Card>
          </Col>
      </Row>
    </Container>
  </div>
)
}

export default AdminSignInForm;
