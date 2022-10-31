import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router, Route, Switch, Redirect, withRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'components/Table.css'
import 'components/TableDark.css'
import 'components/ExcelButton.css'
import 'components/EmptyButton.css'
import 'components/NewButton.css'
import 'components/NewButtonBlue.css'
import 'components/NewButtonDelete.css'
import "assets/css/black-dashboard-react.css";
import ThemeContextWrapper from "./components/general/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/general/BackgroundColorWrapper/BackgroundColorWrapper";

import history from './history'

import LoggedinRoute from "auth/LoggedinRoute";
import UnloggedinRoute from "auth/UnloggedinRoute";
import AdminRoute from "auth/AdminRoute.js";

//auth routes
import SignIn from "views/authentication/SignInForm";
import AdminSignIn from "views/authentication/AdminSignInForm";
import SignUp from "views/authentication/SignUpForm";
import SignUpOtherUsers from "views/authentication/SignUpOtherUsers";
import ManageUsers from "views/authentication/manageusers/ManageUsers";
import EditUser from "views/authentication/EditUserForm";
import Dash from "views/divoah/Dash";
import Report from "views/divoah/Report";
import ReportRekem from "views/divoah/ReportRekem";
import SignInHamal from "views/divoah/SignInHamal";
import DashHamal from "views/divoah/Hamal/DashHamal";


ReactDOM.render(
  <>
    <ThemeContextWrapper>
      <ToastContainer rtl autoClose={4000} style={{ textAlign: 'right' }} />
      <BackgroundColorWrapper>
        <Router history={history}>
          <Switch>
            {/*///////////////////////////////////////////UnLoggedIn Routes/////////////////////////////////////////////////*/}
            <UnloggedinRoute path="/signin" exact component={SignIn} />
            <UnloggedinRoute path="/adminsignin" exact component={AdminSignIn} />
            <UnloggedinRoute path="/signup" exact component={SignUp} />
            <LoggedinRoute path="/signupotherusers" exact component={SignUpOtherUsers} />
            {/*///////////////////////////////////////////UnLoggedIn Routes/////////////////////////////////////////////////*/}

            {/*///////////////////////////////////////////Admin Routes/////////////////////////////////////////////////*/}
            <AdminRoute path="/manageusers" exact component={ManageUsers} />
            <AdminRoute path="/edituser/:userid" exact component={EditUser} />
            {/*///////////////////////////////////////////Admin Routes/////////////////////////////////////////////////*/}

            {/*///////////////////////////////////////////LoggedIn Routes/////////////////////////////////////////////////*/}
            <UnloggedinRoute path="/dash" exact component={Dash} />
            <UnloggedinRoute path="/report" exact component={Report} />
            <UnloggedinRoute path="/reportrekem" exact component={ReportRekem} />
            <UnloggedinRoute path="/signinhamal" exact component={SignInHamal} />
            {/*///////////////////////////////////////////LoggedIn Routes/////////////////////////////////////////////////*/}
            <LoggedinRoute path="/dashamal" exact component={DashHamal} />


            <Redirect from="/" to="/dash" />
          </Switch>
        </Router>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </>,
  document.getElementById("root")
);
