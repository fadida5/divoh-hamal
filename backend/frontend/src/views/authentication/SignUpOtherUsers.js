import React, { useState, useEffect } from "react";

import { signin, authenticate, isAuthenticated } from 'auth/index';

import { Link, Redirect, useHistory } from "react-router-dom";
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
  Col,
} from "reactstrap";
import axios from "axios";
import history from 'history.js';
import { toast } from "react-toastify";
import Select from 'components/general/Select/AnimatedSelect'

export default function SignUpForm() {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    personalnumber: "",
    role: "1",
    //
    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
    //
  });
  const { user } = isAuthenticated();


  function handleChange(evt) {
    const value = evt.target.value;
    setData({ ...data, [evt.target.name]: value });
  }


  const clickSubmit = (event) => {
    CheckSignUpForm(event);
  };

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    var flag = true;
    var ErrorReason = "";
    if (data.name == "") {
      flag = false;
      ErrorReason += "שם ריק \n";
    }
    if (data.lastname == "") {
      flag = false;
      ErrorReason += "שם משפחה ריק \n";
    }
    if (data.personalnumber == "") {
      flag = false;
      ErrorReason += "מס אישי ריק \n";
    }
    if (flag == true) {
      FixUser(event);
    } else {
      toast.error(ErrorReason);
    }
  };

  const FixUser = (event) => {
    event.preventDefault();
    //check and fix roles
    //check and fix personalnumber
    let c = data.personalnumber.charAt(0);
    if (c >= '0' && c <= '9') {
      // it is a number
      let temppersonalnumber = data.personalnumber;
      temppersonalnumber = 's' + temppersonalnumber;
      data.personalnumber = temppersonalnumber;
    } else {
      // it isn't
      if (c == c.toUpperCase()) {
        //UpperCase Letter -Make Lowercase
        let tempc=c.toLowerCase();
        let temppersonalnumber = data.personalnumber;
        temppersonalnumber = temppersonalnumber.substring(1);
        temppersonalnumber = tempc + temppersonalnumber;
        data.personalnumber = temppersonalnumber;
      }
      if (c == c.toLowerCase()) {
        //LowerCase Letter - All Good
      }
    }

    SignUp(event);
  };

  const SignUp = (event) => {
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false });
    const user = {
      name: data.name,
      lastname: data.lastname,
      role: data.role,
      personalnumber: data.personalnumber,
    };
    axios
      .post(`http://localhost:8000/api/signup`, user)
      .then((res) => {
        setData({ ...data, loading: false, error: false, successmsg: true });
        toast.success(`הרשמה נקלטה בהצלחה`);
        history.goBack();
        console.log(res.data);
      })
      .catch((error) => {
        setData({
          ...data,
          errortype: error.response.data.error,
          loading: false,
          error: true,
        });
      });
  };

  const showSuccess = () => (
    <div
      className="alert alert-info "
      style={{ textAlign: "right", display: data.successmsg ? "" : "none" }}
    >
      <h2>הבקשה נשלחה למנהל המערכת</h2>
      <Link to="/signin">להתחברות</Link>
    </div>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ textAlign: "right", display: data.error ? "" : "none" }}
    >
      <h2>שגיאה בשליחת הטופס</h2>
    </div>
  );
  const showLoading = () => (
    <div
      className="alert alert-success"
      style={{ textAlign: "right", display: data.loading ? "" : "none" }}
    >
      <h2>{"בטעינה"}</h2>
    </div>
  );

  useEffect(() => {
  }, []);

  const signUpForm = () => (
    <>
      <Container className="" dir='rtl'>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>הרשמה</small>
                </div>
                <Form role="form">
                  <FormGroup>
                    <Input
                      placeholder="שם פרטי"
                      name="name"
                      type="string"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      placeholder="שם משפחה"
                      name="lastname"
                      type="string"
                      value={data.lastname}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <Input
                      placeholder="מספר אישי"
                      name="personalnumber"
                      type="string"
                      value={data.personalnumber}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <div className="text-center">
                    <button onClick={clickSubmit} className="btn-new-blue">
                      רשום משתמש
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );


  return (
    <>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {signUpForm()}
          </Col>
        </Row>
      </Container>
    </>
  );
}