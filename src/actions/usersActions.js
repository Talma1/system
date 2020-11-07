
import {infoToast, errorToast} from "../services/toast-service";
import { User } from '../models/users';

const baseUrl = 'http://127.0.0.1:8000/api';

const Administrator="מנהלן מערכת";
const Company="מדווח אירועים";
const Customer="בודק אירועים";

export const loginAction = (username, password) => {

    return async (dispatch) =>{
        const user = new User(); 
        user.password = password;
        user.username = username;
    
        const options = {
            method: "POST",
            body: JSON.stringify(user) 
        }

        fetch(`${baseUrl}/check_login/`, options)
        .then(function(response){
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function(data){
            const isLogged = true;
            const role = data.permissions;
            infoToast("Login successful");
            console.log(data);
            
            return dispatch({
                type: "LOGIN",
                payload: {isLogged, role}
            })
        })
        .catch(function(error) {
            errorToast("Invalid credentials");
        });
    }
}

export const registerAction = (username,password, role, id) => {
    return async (dispatch) =>{
        role = (role == "Administrator")? Administrator : (role == "Company" ? Company : Customer) ;
        const user = new User(); 
        user.password = password;
        user.username = username;
        user.permissions = role;
        user.personalNumber = id;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user) 
        }

        fetch(`${baseUrl}/create_user/`, options)
        .then(function(response){
            if (!response.ok) {
                const error = response.status;
                errorToast((error === 500) ? "Server problem in registration process" : (error === 400 ? "Error! user exists" : "Can't create user!"));
            }
            else{
                infoToast("user created!");
            }
        })
    }
}

export const logoutAction = () =>{
    return{
        type: "LOGIN",
        payload: false
    }
}