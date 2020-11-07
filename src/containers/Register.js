import React, {Component} from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../components/RegisterForm';
import {registerAction} from '../actions/usersActions';



class Register extends Component{

    componentWillMount(){
        if(this.props.isLogged === true){
            this.props.history.push('/');
        }
    }

    handlerRegister = (email,password, role, id) => {
        this.props.register(email,password, role, id);
        //this.props.history.push('/');
    }

    render(){
        return(
            <div className= "register-page">
                <RegisterForm handlerRegister = {this.handlerRegister}/>
            </div>
        )
    }

}



const mapStateToProps = state => {
	return {
		isLogged: state.usersReducer.isLogged
	}
}

const mapDispatchToProps = dispatch => {
	return {
        register: (email,password, role, id) => {
            dispatch(registerAction(email,password,role, id));
        }
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (Register);