
const isLoggedLocalStorage = window.localStorage.getItem('isLogged');
const roleLocalStorage = window.localStorage.getItem("role");
const userIdLocalStorage = window.localStorage.getItem("userId");

const initState = { 
    isLogged: (isLoggedLocalStorage !== null ? (isLoggedLocalStorage === "true") : false),
    role: (roleLocalStorage !== null) ? roleLocalStorage : "",
    userId: (userIdLocalStorage !== null)? userIdLocalStorage : "",
    customers: [],
    companies: [],
}

const usersReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN':
            window.localStorage.setItem('isLogged',action.payload.isLogged);
            window.localStorage.setItem("role", action.payload.role);
            window.localStorage.setItem('userId', action.payload.userId);
            state = { ...state, isLogged: action.payload.isLogged, role:action.payload.role , user: action.payload.userId};
            break;
        case 'CUSTOMERS':
            state = {...state, customers: action.payload};
            break;
        case 'COMPANIES':
            state = {...state, companies: action.payload};
            console.log(action.payload);
            break
        default:
            break;
    }
    return state;
}

export default usersReducer;