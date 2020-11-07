import React, { Component } from 'react';

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
        let user = this.state.user;
        user[property] = value;
        
        this.setState({
            user
        })
    }

    handlerSubmit = (e) =>{
        e.preventDefault();
        this.props.handlerRegister(this.state.user.email, this.state.user.password, this.state.user.role, "s8989898");
    }


    render() {
        return (
            <form className="login-form" onSubmit = {this.handlerSubmit}>
                <div className= "form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="text" value={this.state.user.email} onChange={(e)=> this.handlerChangeUser('email', e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={this.state.user.password} onChange={(e)=> this.handlerChangeUser('password', e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete="true"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select name="role" id="role" className="form-control" value={this.state.user.role} onChange={(e)=> this.handlerChangeUser('role', e.target.value)}>
                        <option value="Administrator">Administrator</option>
                        <option value="Company">Company</option>
                        <option value="Customer">Customer</option>
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        )
    }
        
}
        
export default RegisterForm;