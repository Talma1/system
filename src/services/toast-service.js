//const { toast } = require("react-toastify");
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfigurations = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
}

const infoToast = (massage) => {toast.info(massage, toastConfigurations)};

const errorToast = (massage) => {toast.error(massage, toastConfigurations)};

export {errorToast, infoToast};