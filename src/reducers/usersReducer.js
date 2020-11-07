
const isLoggedLocalStorage = window.localStorage.getItem('isLogged');

const initState = { 
    isLogged: (isLoggedLocalStorage !== null ? (isLoggedLocalStorage === "true") : false),
    role: ""
}

const usersReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload);
            window.localStorage.setItem('isLogged',action.payload.isLogged);
            state = { ...state, isLogged: action.payload.isLogged, role:action.payload.role }
            break;
    }
    console.log("users Reducers", state);
    return state;
}

export default usersReducer;