import { IUserLogin, IUserRegister } from "../../TypeScript";
import { getAPI, postAPI } from "../../utils/FetchData";
import { AUTH, IAuthType } from "../types/authType";

import { ValidRegister } from "../../utils/Valid";
import { Dispatch } from "redux";
import { checkTokenExp } from "../../utils/TokenUtils";
import {
  showClientError,
  showError,
  showLoading,
  showSuccess,
} from "../../utils/Utils";

export const login = (userLogin: any) => async (dispatch: Dispatch) => {
  try {
    showLoading(dispatch);
    const res = await postAPI("login", userLogin);

    dispatch({
      type: "AUTH",
      payload: {
        access_token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("logged", "true");

    showSuccess(res.data.msg, dispatch);
  } catch (err: any) {
    showError(err.response.data.msg, dispatch);
  }
};
export const register =
  (userRegister: any) => async (dispatch: Dispatch<IAuthType>) => {
    const check = ValidRegister(userRegister);

    if (check.errLength > 0) {
      // return dispatch({
      //   type: NEW_TOAST,
      //   payload: { error: check.errMsg },
      // });
      return showClientError(check.errMsg, dispatch);
    }
    try {
      showLoading(dispatch);
      const res = await postAPI("register", userRegister);

      showSuccess("Register Success!", dispatch);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
export const refreshToken = () => async (dispatch: Dispatch<IAuthType>) => {
  const logged = localStorage.getItem("logged");
  //if not logged returnI

  if (!logged) {
    //if logged thi khong refresh token
    return;
  }
  //if login get new token

  try {
    const res = await getAPI("refresh_token");
    dispatch({ type: AUTH, payload: res.data });
  } catch (err: any) {
    showError(err, dispatch);
  }
};

export const logout =
  (token: string) => async (dispatch: Dispatch<IAuthType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);

      dispatch({ type: AUTH, payload: {} });
      await getAPI("logout", access_token);
      localStorage.removeItem("logged")
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
