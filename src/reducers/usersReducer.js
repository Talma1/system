
const isLoggedLocalStorage = window.localStorage.getItem('isLogged');
const roleLocalStorage = window.localStorage.getItem("role");

const initState = { 
    isLogged: (isLoggedLocalStorage !== null ? (isLoggedLocalStorage === "true") : false),
    role: (roleLocalStorage !== null) ? roleLocalStorage : "",
    customers: [],
    companies: [],
}

const usersReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN':
            window.localStorage.setItem('isLogged',action.payload.isLogged);
            window.localStorage.setItem("role", action.payload.role);
            state = { ...state, isLogged: action.payload.isLogged, role:action.payload.role };
            break;
        case 'CUSTOMERS':
            state = {...state, customers: action.payload};
            break;
        case 'COMPANIES':
            state = {...state, companies: action.payload};
            console.log(action.payload);
            break
    }
    return state;
}

export default usersReducer;