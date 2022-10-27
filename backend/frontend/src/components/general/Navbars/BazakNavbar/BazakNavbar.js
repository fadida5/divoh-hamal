import React, { useEffect, useState } from 'react'

import { Link, withRouter, Redirect } from "react-router-dom";

import { isAuthenticated } from '../../../../auth/index';
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";

import { ThemeContext, themes } from "contexts/ThemeContext";

import UserProfileCircle from '../UserProfileCircle/UserProfileCircle'
import BazakNavbarTitle from './BazakNavbarTitle/BazakNavbarTitle';
import ToggleDarkModeButton from './ToggleDarkModeButton/ToggleDarkModeButton';

function BazakNavbar(props) {
  const [colorhr, setcolorhr] = useState("lightGray");
  const [color, setcolor] = useState("white");
  // const { user } = isAuthenticated()

  return (
    <>
      <ThemeContext.Consumer>
        {({ changeTheme, theme }) => (
          <>
            {theme == "white-content" ?
              setcolor("white")
              : setcolor("rgb(32 33 51)")}
            {theme == "white-content" ?
              setcolorhr("lightGray")
              : setcolorhr("white")}
            <Navbar style={{ display: 'block', height: '60px', backgroundColor: color, boxShadow: "none", top: '0', paddingBottom: '0px', marginRight: '60px', position: 'sticky' }}>
              <Row>
                <Col xs={12} md={4}>
                  {/* <UserProfileCircle fname={user.name} lname={user.lastname} bgcolor={color} /> */}
                  <ToggleDarkModeButton color={color} />
                </Col>
                <Col xs={12} md={4}>
                  <BazakNavbarTitle theme={theme} />
                </Col>
                <Col xs={12} md={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 
                </Col>
              </Row>
            </Navbar>
            <hr style={{ margin: '0px', borderTop: `1px solid ${colorhr}` }} />
          </>

        )}
      </ThemeContext.Consumer>
    </>
  );
}

export default withRouter(BazakNavbar);