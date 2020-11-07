import React from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';


const PrivateRoute = ({path, component: Component, requiredRole, ...rest}) => {
    return (
        <Route path={path} {...rest} render={props =>{
            if(this.props.role === requiredRole){
                return <Component {...props} {...rest}/>; 
            }
            return <Redirect to="/"/>
        }}/>
    );
}




const mapStateToProps = state => {
	return {
        isLogged: state.usersReducer.isLogged,
        role: state.usersReducer.role
	}
}

const mapDispatchToProps = dispatch => {
	return {
        
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (PrivateRoute);

