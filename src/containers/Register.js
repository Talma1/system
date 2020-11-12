import React, {Component} from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../components/RegisterForm';
import {registerAction} from '../actions/usersActions';



class Register extends Component{

    componentDidMount(){
        if(this.props.isLogged === true){
            this.props.history.push('/');
        }
    }

    handlerRegister = (user) => {
        this.props.register(user);
        this.props.history.push('/');
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
        register: (user) => {
            dispatch(registerAction(user));
        }
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (Register);