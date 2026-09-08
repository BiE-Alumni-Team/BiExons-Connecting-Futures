import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            closeOnClick={false}
            className="toast-center"
        />
    );
}