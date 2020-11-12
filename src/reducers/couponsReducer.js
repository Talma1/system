const initState = { 
    coupons: []
}

const couponsReducer = (state = initState, action) => {

    switch (action.type) {
        case 'COUPONS':
            state = { ...state, coupons: action.payload };
            break;
    }
    return state;
}

export default couponsReducer;