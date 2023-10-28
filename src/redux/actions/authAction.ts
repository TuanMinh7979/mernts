import { IUserLogin, IUserRegister } from "../../TypeScript";
import { getAPI, postAPI } from "../../utils/FetchData";
import { AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { ValidRegister } from "../../utils/Valid";
import { Dispatch } from "redux";
import { checkTokenExp, showError } from "../../utils/TokenUtils";

export const login =
  (userLogin: any) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("login", userLogin);

      dispatch({
        type: "AUTH",
        payload: res.data,
      });

      dispatch({ type: ALERT, payload: { success: res.data.msg } });

      localStorage.setItem("logged", "myusername");
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const register =
  (userRegister: any) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = ValidRegister(userRegister);

    if (check.errLength > 0) {
      return dispatch({
        type: ALERT,
        payload: { error: check.errMsg },
      });
    }
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("register", userRegister);

      dispatch({ type: ALERT, payload: { success: "Register Success!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem("logged");
    //if not logged return

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
  (token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);
      localStorage.removeItem("logged");
      dispatch({ type: AUTH, payload: {} });
      await getAPI("logout", access_token);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
