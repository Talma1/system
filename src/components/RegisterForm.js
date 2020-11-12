import React, { Component } from 'react';
import {Form, Button} from "semantic-ui-react";
import { User } from '../models/users';

const permissions = [
    { key: 'Administrator', text: 'Administrator', value: 'Administrator' },
    { key: 'Company', text: 'Company', value: 'Company' },
    { key: 'Customer', text: 'Customer', value: 'Customer' },
  ]

class RegisterForm extends Component {
    constructor(){
        super();

        this.state = {
            user:{
                email: "",
                password: "",
                role: "Administrator",
            },
        }

    }
    handlerChangeUser=(property, value)=>{
        console.log(value);
        let user = this.state.user;
        user[property] = value;
        
        this.setState({
            user
        })
    }

    handlerSubmit = (e) =>{
        e.preventDefault();
        const user = new User(); 
        user.password = this.state.user.password;
        user.username = this.state.user.username;
        user.permissions = this.state.user.role;
        this.props.handlerRegister(user);
    }


    render() {
        const login_form = {
            padding: "20px"
        };
        return (
            <Form className="login-form" style={login_form} onSubmit={this.handlerSubmit}>
                <Form.Input label='Enter Username' type='text' placeholder="username" value={this.state.user.email} onChange={(e)=> this.handlerChangeUser('username', e.target.value)}/>
                <Form.Input label='Enter Password' type='password' placeholder="password" value={this.state.user.password} onChange={(e)=> this.handlerChangeUser('password', e.target.value)}/>
                <Form.Select
                    fluid
                    label='Role'
                    value={this.state.user.role}
                    options={permissions}
                    placeholder='Role'
                    onChange={(e)=> this.handlerChangeUser('role', e.target.textContent)}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
        
}
        
export default RegisterForm;