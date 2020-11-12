

import {infoToast, errorToast} from "../services/toast-service";


const baseUrl = 'http://127.0.0.1:8000/api';

export const deleteCouponAction = (couponId) =>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(couponId) 
    }
    fetch(`${baseUrl}/delete_coupon/`, options)
    .then(function(response){
        if (!response.ok) {
            const error = response.status;
            errorToast((error === 500) ? "Server problem in deletation process" : (error === 404 ? "Error! no such coupon" : "can't delete coupon"));
        }
        else{
            infoToast("coupon deleted");
        }
    })
}

export const editCouponAction = (coupon) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coupon) 
    }
    fetch(`${baseUrl}/update_coupon/`, options)
    .then(function(response){
        if (!response.ok) {
            const error = response.status;
            errorToast((error === 500) ? "Server problem in edit process" : (error === 404 ? "Error! no such coupon" : "can't update coupon"));
        }
        else{
            infoToast("coupon edited");
        }
    })
}

export const addCouponAction = (coupon) =>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coupon) 
    }
    fetch(`${baseUrl}/add_new_coupon/`, options)
    .then(function(response){
        if (!response.ok) {
            const error = response.status;
            errorToast((error === 500) ? "Server problem in addition process" : "can't add coupon");
        }
        else{
            infoToast("coupon added");
        }
    })
}

export const getCouponListAction = () =>{
    return dispatch =>{
        const options={
            method: "GET"
        }
        fetch(`${baseUrl}/coupons_list/`, options)
        .then(function(response){
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function(data){
            return dispatch({
                type: "COUPONS",
                payload: data
            });
        })
        .catch(function(error) {
            errorToast("Server problem in reading data process");
        });
    }
}