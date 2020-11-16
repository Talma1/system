
import {infoToast, errorToast} from "../services/toast-service";
import { User } from '../models/users';

const baseUrl = 'http://127.0.0.1:8000/api';


export const loginAction = (email, password) => {

    return async (dispatch) =>{
        const user = new User(); 
        user.password = password;
        user.email = email;
    
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
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
            const role = data.role;
            const userId = data.id;
            infoToast("Login successful");
            
            return dispatch({
                type: "LOGIN",
                payload: {isLogged, role, userId}
            })
        })
        .catch(function(error) {
            errorToast("Invalid credentials");
        });
    }
}

export const registerAction = (user) => {
    return async (dispatch) =>{
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

    return dispatch => {
        return dispatch({
            type: "LOGIN",
            payload: {isLogged: false , role: ""}
        });   
    }
}

export const getCustomersListAction = () =>{
    return async dispatch =>{
        getAction("/customers_list").then((data)=>{
            return dispatch({
                type: "CUSTOMERS",
                payload: data
            });
        });
    }
}

export const getCompaniesListAction = () =>{
    return async dispatch =>{
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

export const addUserAction = (user) =>{
    registerAction(user);
}

export const getUserDetails = async (userId) =>{
    let data = []
    const options={
        method: "GET"
    }
    await fetch(`${baseUrl}/get-user/${userId}`, options)
    .then(function(response){
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then(function(dataFromServer){
        data = dataFromServer;
    })
    .catch(function(error) {
        errorToast("Server problem in reading data process");
    });
    return data;
}

export const purchaseCouponAction = async (coupon, userId) =>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coupon) 
    }

    fetch(`${baseUrl}/purchase-coupon/${userId}`, options)
    .then(function(response){
        if (!response.ok) {
            const error = response.status;
            errorToast((error === 500) ? "Server problem in coupon purchase process" : "Can't purchase coupon");
        }
        else{
            infoToast("coupon purchased!");
        }
    })
}