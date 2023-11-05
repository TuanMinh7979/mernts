import {
  NEW_TOAST,
  REMOVE_TOASTS,
  SHOW_LOADING,
  SHOW_SPINNER,
  STOP_LOADING,
  STOP_SPINNER,
} from "../redux/types/toastType";
import { clientLogout } from "./TokenUtils";

export const showError = (errorObject: any, dispatch: any) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>", errorObject);
  console.log(">>>>>>>>>>>>>>>>>>>>>", Object.keys(errorObject));
  if (errorObject.name == "RefreshTokenError") {

    dispatch({
      type: NEW_TOAST,
      payload: { message: errorObject.message, type: "error" },
    });
    return clientLogout(dispatch);
  } else if (errorObject.response) {

    console.log(errorObject.response);

    dispatch({
      type: NEW_TOAST,
      payload: { message: errorObject.response.data.msg, type: "error" },
    });
  } else {
  

    dispatch({
      type: NEW_TOAST,
      payload: { message: errorObject, type: "error" },
    });
  }
};
export const showSuccess = (text: any, dispatch: any) => {
  dispatch({ type: NEW_TOAST, payload: { message: text, type: "success" } });
};
export const showInfo = (text: any, dispatch: any) => {
  dispatch({ type: NEW_TOAST, payload: { message: text, type: "info" } });
};
export const showWarning = (text: any, dispatch: any) => {
  dispatch({ type: NEW_TOAST, payload: { message: text, type: "warning" } });
};
export const showClientError = (errorObject: any, dispatch: any) => {
  dispatch({
    type: NEW_TOAST,
    payload: { message: errorObject, type: "clientError" },
  });
};

export const showLoading = (dispatch: any) => {
  dispatch({
    type: SHOW_LOADING,
    payload: {},
  });
};
export const stopLoading = (dispatch: any) => {
  dispatch({
    type: STOP_LOADING,
    payload: {},
  });
};
export const showSpinner = (dispatch: any) => {
  dispatch({
    type: SHOW_SPINNER,
    payload: {},
  });
};
export const stopSpinner = (dispatch: any) => {
  dispatch({
    type: STOP_SPINNER,
    payload: {},
  });
};
export const removeToasts = (dispatch: any) => {
  dispatch({
    type: REMOVE_TOASTS,
    payload: {},
  });
};
