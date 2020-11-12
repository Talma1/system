
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

export const registerAction = (user) => {
    return async (dispatch) =>{
        const role = (user.permissions === "Administrator")? Administrator : (user.permissions === "Company" ? Company : Customer) ;
        user.permissions = role;

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
        payload: {isLogged: false , role: ""}
    }
}

export const getCustomersListAction = () =>{
    return dispatch =>{
        getAction("/customers_list").then((data)=>{
            return dispatch({
                type: "CUSTOMERS",
                payload: data
            });
        });
    }
}


export const getCompaniesListAction = () =>{
    return dispatch =>{
        getAction("/companies_list").then((data)=>{
            console.log(data);
            return dispatch({
            type: "COMPANIES",
            payload: data
            });
        });
    }
}

const getAction = async (url) =>{
    let data = []
    const options={
        method: "GET"
    }
    await fetch(`${baseUrl}${url}/`, options)
    .then(function(response){
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then(function(dataFromServer){
        console.log(dataFromServer)
        data = dataFromServer;
    })
    .catch(function(error) {
        errorToast("Server problem in reading data process");
    });
    await console.log(data);
    return data;
}

export const deleteCustomerAction = (customerId) =>{
    deleteUser("customer", customerId);
}

export const deleteCompanyAction = (companyId) =>{
    deleteUser("company", companyId);
}

const deleteUser = (userType, userId) =>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userId) 
    }
    fetch(`${baseUrl}/delete_user/`, options)
    .then(function(response){
        if (!response.ok) {
            const error = response.status;
            errorToast((error === 500) ? "Server problem in deletation process" : (error === 404 ? "Error! no such " + userType : "can't delete " + userType));
        }
        else{
            infoToast(userType + " deleted");
        }
    })
}

export const editCustomerAction = (customer) =>{
    updateUser("customer", customer);
}

export const editCompanyAction = (company) =>{
    updateUser("company", company);
}

const updateUser = (userType, user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user) 
    }
    fetch(`${baseUrl}/update_user/`, options)
    .then(function(response){
        if (!response.ok) {
            const error = response.status;
            errorToast((error === 500) ? "Server problem in edit process" : (error === 404 ? "Error! no such " + userType : "can't update " + userType));
        }
        else{
            infoToast(userType + "  edited");
        }
    })
}

export const addCustomerAction = (customer) =>{
    registerAction(customer);
}

export const addCompanyAction = (company) =>{
    registerAction(company);
}