/**
 * @param {string} type - The type of toast to display (success, error, warning, info)
 * @param {string} message - The message to display
 */

import { toast } from "react-toastify";
const Toast = (type, message) => {
  return toast[type](`🦄 ${message}`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export default Toast;
