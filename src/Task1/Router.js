import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Signup from './Signup';
import Signin from './Signin';

export class Routerr extends Component {
    render() {
        return (
        <Router>
            <Switch>
                <Route path="/signin" component={Signin} />
                <Route path="/"  component={Signup} />
            </Switch>
        </Router>
            
        )
    }
}

export default Routerr
