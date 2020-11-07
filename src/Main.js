import React, { Component } from "react";
import {
    Route,
    NavLink,
    Link,
    Switch,
    BrowserRouter as Router
  } from "react-router-dom";
import { connect } from 'react-redux';
import Home from "./Home";
import NoFound from "./containers/NoFound";
import Login from './containers/Login';
import Register from './containers/Register';
import Stuff from "./Stuff";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import { logoutAction } from "./actions/usersActions";
import PrivateRoute from "./components/PrivateRoute";
 
class Main extends Component {
  render() {
    // Controls the login, registration and logout routes.
    let loginLink = <span><li><NavLink to="/login">Login</NavLink></li><li><NavLink to="/register">Register</NavLink></li></span>;
    if(this.props.isLogged){
      loginLink = <li><Link to="/" onClick={this.handlerLogout}>Logout</Link></li>;
    }
    // System permissions
    const Administrator="מנהלן מערכת";
    const Company="מדווח אירועים";
    const Customer="בודק אירועים";

    // Dynamic routes for registered users.
    const administratorMenu = 
    <span>
      <li><NavLink to="/company-manage">Company management</NavLink></li>
      <li><NavLink to="/customers-manage">Customers management</NavLink></li>
    </span>;
    const companyMenu = 
    <span>
      <li><NavLink to="/coupon-manage">Coupon management</NavLink></li>
    </span>;
    const custumerMenu = 
    <span>
      <li><NavLink to="/store">Buy coupons</NavLink></li>
      <li><NavLink to="/coupons">My coupons</NavLink></li>
      <li><NavLink to="/detailes">My details</NavLink></li>
    </span>;

    let userMenu = (this.props.role === Administrator) ? administratorMenu :( (this.props.role === Company) ? companyMenu: ((this.props.role === Customer) ? custumerMenu: <span></span>));
    return (
        <Router>
            <ToastContainer/>
            <div>
                <h1>Simple SPA</h1>
                <ul className="header">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    {userMenu}
                    {loginLink}
                </ul>
                <Switch className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/Login" component={Login}/>
                    <Route path="/Register" component={Register}/> 
                    {/* Administrator routes*/}
                    <PrivateRoute path="/company-manage" component={} requiredRole={Administrator}/>
                    <PrivateRoute path="/customers-manage" component={} requiredRole={Administrator}/>
                    {/* Company routes */}
                    <PrivateRoute path="/coupon-manage" component={} requiredRole={Company}/>
                    {/* Customer routes */}
                    <PrivateRoute path="/store" component={} requiredRole={Customer}/>
                    <PrivateRoute path="/coupons" component={} requiredRole={Customer}/>
                    <PrivateRoute path="/detailes" component={} requiredRole={Customer}/>
                    <Route component={NoFound}/>
                </Switch>
            </div>
        </Router>
    );
  }

  handlerLogout = () => {
    this.props.logout(); 
  };
}

const mapStateToProps = state => {
	return {
    isLogged: state.usersReducer.isLogged,
    role: state.usersReducer.role
	}
}

const mapDispatchToProps = dispatch => {
	return {
    logout(){
      dispatch(logoutAction());
    }
	}
}
 
export default connect( mapStateToProps, mapDispatchToProps ) (Main);