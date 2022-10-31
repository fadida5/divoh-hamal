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


export default function Report() {

    const [data, setData] = useState({
        name: "",
        lastname: "",
        personalnumber: "",
        cellphone: "",
        yhida:"",
        typevent:"",
        resevent:"",
        cli:"",
        carYN:"",
        datevent:"",
        mikom:"",
        nifga:"",
        tahkirFile:"",
        tahkirimg:"",
        iddivoah:"",
        password: "",
        role: "",
        error: false,
        successmsg: false,
        loading: false,
        redirectToReferrer: false,
      });

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
          ErrorReason += " ,שם ריק \n";
        }
        if (data.lastname == "") {
          flag = false;
          ErrorReason += " ,שם משפחה ריק \n";
        }
        if (data.personalnumber == "") {
          flag = false;
          ErrorReason += " ,מס אישי ריק \n";
        }
        if (data.cellphone == "") {
          flag = false;
          ErrorReason += " ,טלפון ריק \n";
        }
        if (data.yhida == "") {
          flag = false;
          ErrorReason += " ,יחידה ריקה \n";
        }
        if (
          document.getElementById("res").options[
            document.getElementById("res").selectedIndex
          ].value == "0"
        ) {
          flag = false;
          ErrorReason += " ,סיבת האירוע ריקה \n";
        }
        if (
          document.getElementById("sel").options[
            document.getElementById("sel").selectedIndex
          ].value == "0"
        ) {
          flag = false;
          ErrorReason += " ,סוג הרקם ריק \n";
        }
        if(!document.getElementById('carYES').checked && !document.getElementById('carNO').checked) {
          flag = false;
          ErrorReason += " ,אם נגרם נזק ריק \n";
        }
        if (data.mikom == "") {
            flag = false;
            ErrorReason += " ,מיקום ריק \n";
        }
          if (!data.datevent) {
            flag = false;
            ErrorReason += " ,תאריך ריק \n";
          }
          if(data.nifga== ""){
            flag = false;
            ErrorReason += "כמות הנפגעים ריקה \n";
          }

          if (flag == true) {
            // FixUser(event);
            // Shem(event);
          } else {
            toast.error(ErrorReason);
          }
      
      }    

      const ReportRekem = () => (
        <>
          <div>
                <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <big>שליחת דיווח</big>
                </div>
                <div className="text-center text-muted mb-4">
                  <small>פרטי מדווח</small>
                </div>
                <Form role="form">
                  <FormGroup dir="rtl">
                    <Input
                      placeholder="שם פרטי"
                      name="name"
                      type="text"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      placeholder="שם משפחה"
                      name="lastname"
                      type="text"
                      value={data.lastname}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="mb-3" dir="rtl">
                    <Input
                      placeholder="מספר אישי"
                      name="personalnumber"
                      type="string"
                      maxlength="7"
                      value={data.personalnumber}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="mb-3" dir="rtl">
                    <Input
                      placeholder="טלפון נייד"
                      name="cellphone"
                      type="tel"
                      maxlength="10"
                      value={data.cellphone}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      placeholder="יחידה"
                      name="yhida"
                      type="string"
                      value={data.yhida}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <div className="text-center text-muted mb-4">
                    <small>פרטי אירוע</small>
                  </div>

                  <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    סיבת האירוע
                  </div>
                 <FormGroup>
                    <Input
                      type="select"
                      name="resevent"
                      value={data.resevent}
                      onChange={handleChange}
                      id="res"
                    >
                      <option value={"0"}>בחר</option>
                      <option value={"1"}>תאונה</option>
                      <option value={"2"}>כשל טכני</option>
                      <option value={"4"}>טעות אנוש</option>
                      <option value={"3"}>לא ידוע</option>
                    </Input>
                  </FormGroup>

                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        סוג הרק"ם
                      </div>
                      <FormGroup>
                        <Input
                          type="select"
                          name="cli"
                          value={data.cli}
                          onChange={handleChange}
                          id="sel"
                        >
                          <option value={"0"}>בחר</option>
                        </Input>
                      </FormGroup>

                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        האם נגרם נזק לרק"ם
                      </div>

                      <div style={{ textAlign: "right"}}>
                      <FormGroup check inline>
                        <div style={{ textAlign: "right", paddingTop: "10px" }}>
                          <Input
                            type="radio"
                            name="carYN"
                            value={data.yes}
                            onChange={handleChange}
                            id="carYES"
                          />
                          כן  
                        </div>
                        </FormGroup>

                        <FormGroup check inline>
                        <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        <Input
                          type="radio"
                          id="carNO"
                          name="carYN"
                          value={data.no}
                          onChange={handleChange}
                        />
                        לא
                        </div>
                      </FormGroup>
                      </div>

                <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    תאריך אירוע
                </div>                  
                  <FormGroup dir="rtl">
                    <Input
                      placeholder="תאריך אירוע"
                      name="datevent"
                      type="datetime-local"
                      value={data.datevent}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      placeholder="מיקום האירוע"
                      name="mikom"
                      type="string"
                      value={data.mikom}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      placeholder="כמה נפגעים היו באירוע"
                      name="nifga"
                      type="number"
                      value={data.nifga}
                      onChange={handleChange}
                    />
                  </FormGroup>

                   {data.nifga > "0" && (
                    <>
                  <FormGroup dir="rtl">
                    <Input
                      placeholder="שם הנפגע"
                      name="namenifga"
                      type="string"
                      value={data.namenifga}
                      onChange={handleChange}
                    />
                  </FormGroup> 

                  <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    דרגת הנפגע
                  </div>
                 <FormGroup>
                    <Input
                      type="select"
                      name="dargaNifga"
                      value={data.dargaNifga}
                      onChange={handleChange}
                      id="darga"
                    >
                      <option value={"0"}>בחר</option>
                    </Input>
                  </FormGroup>

                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        מצב הנפגע
                      </div>
                      <FormGroup>
                        <Input
                          type="select"
                          name="mazavnifga"
                          value={data.mazavnifga}
                          onChange={handleChange}
                          id="mazav"
                        >
                          <option value={"0"}>בחר</option>
                          <option value={"1"}>קל</option>
                          <option value={"2"}>בינוני</option>
                          <option value={"3"}>קשה</option>
                          <option value={"4"}>נהרג</option>
                        </Input>
                      </FormGroup>

                      <FormGroup dir="rtl">
                    <Input
                      placeholder="מיקום הפגיעה בגוף"
                      name="mikompgia"
                      type="string"
                      value={data.mikompgia}
                      onChange={handleChange}
                    />
                  </FormGroup> 
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>
                  <button
                  //  onClick={clickSubmit} 
                   className="btn btn-primary">
                      +
                 </button>
                 </div>
                  </>
                  )}


                  <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    צירוף מסמך של התחקיר
                  </div>
                  <input
                    placeholder="צירוף מסמך של התחקיר"
                    name="tahkirFile"
                    type="file"
                    id="upfile"
                    value={data.tahkirFile}
                    onChange={handleChange}
                    accept=".pdf, .doc, .docx, .txt, .xls"
                  />

                  <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    צירוף תמונות האירוע
                  </div>
                  <input
                    placeholder="צירוף תמונות האירוע"
                    name="tahkirimg"
                    type="file"
                    value={data.tahkirimg}
                    onChange={handleChange}
                    accept=".jpeg, .png"
                  />

                  <div className="text-center">
                    <button 
                    onClick={clickSubmit} 
                    className="btn-new-blue">
                      שליחה
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
                </Container>
         </div>
        </>
      );


    return (
        <>
           {ReportRekem()}
        </>
      );
}  


