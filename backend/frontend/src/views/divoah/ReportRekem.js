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
      pikod: "0",
      ogda: "0",
      hativa: "0",
      gdod: "0",
      typevent: "רק'ם",
      resevent:"0",
      cli:"0",
      yn:"",
      selneshek:"0",
      whap:"0",
      amlahtype:"0",
      rekemtype:"0",
      mazavrekem:"0",
      dwork:"0",
      mataftype:"0",
      apitype:"0",
      mholaztype:"0",
      // mhalztype:"0",
      pirot:"",
      datevent:"",
      mikom:"",
      nifga:"",

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
        if (
          document.getElementById("pikod").options[
            document.getElementById("pikod").selectedIndex
          ].value == "0"
        ) {
          flag = false;
          ErrorReason += " פיקוד ריק \n";
        }
        if (
          document.getElementById("ogda").options[
            document.getElementById("ogda").selectedIndex
          ].value == "0"
        ) {
          flag = false;
          ErrorReason += " אוגדה ריק \n";
        }
        if (
          document.getElementById("hativa").options[
            document.getElementById("hativa").selectedIndex
          ].value == "0"
        ) {
          flag = false;
          ErrorReason += " חטיבה ריק \n";
        }
        if (
          document.getElementById("gdod").options[
            document.getElementById("gdod").selectedIndex
          ].value == "0"
        ) {
          flag = false;
          ErrorReason += " גדוד ריק \n";
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
        if(!document.getElementById('YES').checked && !document.getElementById('NO').checked) {
          flag = false;
          ErrorReason += " ,אם נגרם נזק ריק \n";
        }
        if (data.pirot == "") {
          flag = false;
          ErrorReason += "  פירוט האירוע ריק \n";
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
            SendFormData(event);
          } else {
            toast.error(ErrorReason);
          }      
      };
      
      const SendFormData = (event) => {
        event.preventDefault();
        setData({ ...data, loading: true, successmsg: false, error: false, NavigateToReferrer: false });
        const requestData = {
          name: data.name,
          lastname: data.lastname,
          personalnumber:data.personalnumber,
          cellphone: data.cellphone,
          pikod:data.pikod,
          ogda:data.ogda,
          hativa:data.hativa,
          gdod:data.gdod,
          typevent: data.typevent,
          resevent: data.resevent,
          cli: data.cli,
          yn: data.yn,
          selneshek: data.selneshek,
          whap: data.whap,
          amlahtype: data.amlahtype,
          rekemtype: data.rekemtype,
          mazavrekem: data.mazavrekem,
          dwork: data.dwork,
          mataftype: data.mataftype,
          apitype: data.apitype,
          mholaztype: data.mholaztype,
          mhalztype: data.mhalztype,
          pirot: data.pirot,
          datevent: data.datevent,
          mikom: data.mikom,
          nifga: data.nifga,
        };
        console.log("In the SendFormData Func")
        console.log(requestData)

        console.groupCollapsed("Axios");
        
        axios
        .post(`http://localhost:8000/report/add`, requestData)
        .then((res) => {
          console.groupCollapsed("Axios then");
          console.log(res);
          setData({ ...data, loading: false, error: false, successmsg: true });
          toast.success(` הדיווח נשלח בהצלחה`);
          history.push(`/dash`);
          console.log(res.data);
          console.groupEnd();
        })
        .catch((error) => {
          console.groupCollapsed("Axios catch error");
          console.log(error);
          setData({
            ...data,
            errortype: error.response.data.error,
            loading: false,
            error: true,
          });
          console.groupEnd();
        });
        console.groupEnd();
  };

  const showSuccess = () => (
    <div
      className="alert alert-info "
      style={{ textAlign: "right", display: data.successmsg ? "" : "none" }}
    >
      <h2>הדיווח נשלח בהצלחה</h2>
    </div>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ textAlign: "right", display: data.error ? "" : "none" }}
    >
      <h2>שגיאה בשליחת הדיווח</h2>
    </div>
  );


      const ReportRekem = () => (
        <>
          <div>
                <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
          <Col lg="6" md="7">
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

                  <FormGroup>
                        <Input
                          type="select"
                          name="pikod"
                          value={data.pikod}
                          onChange={handleChange}
                          id="pikod"
                        >
                          <option value={"0"}>פיקוד</option>
                          <option value={"1"}>סתם</option>

                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="select"
                          name="ogda"
                          value={data.ogda}
                          onChange={handleChange}
                          id="ogda"
                        >
                          <option value={"0"}>אוגדה</option>
                          <option value={"1"}>סתם</option>

                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="select"
                          name="hativa"
                          value={data.hativa}
                          onChange={handleChange}
                          id="hativa"
                        >
                          <option value={"0"}>חטיבה</option>
                          <option value={"1"}>סתם</option>

                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="select"
                          name="gdod"
                          value={data.gdod}
                          onChange={handleChange}
                          id="gdod"
                        >
                          <option value={"0"}>גדוד</option>
                          <option value={"1"}>סתם</option>

                        </Input>
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
                          <option value={"1"}>סתם</option>

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
                            name="yn"
                            value={true}
                            onChange={handleChange}
                            id="YES"
                          />
                          כן  
                        </div>
                        </FormGroup>

                        <FormGroup check inline>
                        <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        <Input
                          type="radio"
                          id="NO"
                          name="yn"
                          value={false}
                          onChange={handleChange}
                        />
                        לא
                        </div>
                      </FormGroup>
                      </div>

                      <FormGroup dir="rtl">
                    <Input
                      placeholder="פירוט האירוע"
                      name="pirot"
                      type="textarea"
                      value={data.pirot}
                      onChange={handleChange}
                    />
                  </FormGroup> 

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
           {showError()}
           {showSuccess()}
           {ReportRekem()}
        </>
      );
}  

