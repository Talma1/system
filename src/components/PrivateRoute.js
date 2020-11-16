import React from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';


const PrivateRoute = ({path, component: Component, requiredRole, role, ...rest}) => {

    function handlePermissionCheck(role,requiredRole){
        return requiredRole.some(item => role === item);
    }

    return (
        <Route path={path} {...rest} render={props =>{
            if(handlePermissionCheck(role, requiredRole)){
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

