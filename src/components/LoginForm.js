import React, { Component } from 'react';
import {Form, Button} from "semantic-ui-react";

class LoginForm extends Component {
    constructor(){
        super();

        this.state = {
            user:{
                email: "",
                password: ""
            },
        }

    }
    handlerChangeUser=(property, value)=>{
        let user = this.state.user;
        user[property] = value;
        
        this.setState({
            user
        })
    }

    handlerSubmit = (e) =>{
        e.preventDefault();
        this.props.handlerLogin(this.state.user.email, this.state.user.password);
    }


    render() {
        const login_form = {
            padding: "20px"
        };
        return (

            <Form className="login-form" style={login_form} onSubmit={this.handlerSubmit}>
                <Form.Input label='Enter Username' type='text' placeholder="username" value={this.state.user.email} onChange={(e)=> this.handlerChangeUser('email', e.target.value)}/>
                <Form.Input label='Enter Password' type='password' placeholder="password" value={this.state.user.password} onChange={(e)=> this.handlerChangeUser('password', e.target.value)}/>
                <Button type='submit'>Submit</Button>
            </Form>

        )
    }
        
}
        
export default LoginForm;