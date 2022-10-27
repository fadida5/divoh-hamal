import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import LoggedinLayout from "layouts/LoggedinLayout";

const UnloggedinRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            <LoggedinLayout component={Component}/>
        }
    />
)
export default UnloggedinRoute;