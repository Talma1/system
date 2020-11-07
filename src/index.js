import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./index.css";
import {Provider} from 'react-redux';
import store from "./store";

ReactDOM.render(
    <Provider store = {store}>
        <Main/>
    </Provider>, 
    document.getElementById("root")
);