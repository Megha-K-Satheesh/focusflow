import { toast } from "react-toastify";


const defaultConfig = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccess = (message, options = {}) => {
  toast.success(message, {
    ...defaultConfig,
    ...options,
  });
};

export const showError = (message, options = {}) => {
  toast.error(message, {
    ...defaultConfig,
    autoClose: 3500,
    ...options,
  });
};


export const showInfo = (message, options = {}) => {
  toast.info(message, {
    ...defaultConfig,
    ...options,
  });
};

export const showWarning = (message, options = {}) => {
  toast.warn(message, {
    ...defaultConfig,
    ...options,
  });
};


export const showPromise = (promise, messages = {}) => {
  return toast.promise(promise, {
    pending: messages.pending || "Loading...",
    success: messages.success || "Success!",
    error: messages.error || "Something went wrong!",
  });
};
