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
        <h1>Hello</h1>
    </Container>
  </div>
)
}

export default AdminSignInForm;
