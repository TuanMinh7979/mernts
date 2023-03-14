import { IUserLogin, IUserRegister } from "../../TypeScript";
import { getAPI, postAPI } from "../../utils/FetchData";
import { AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { ValidRegister } from "../../utils/Valid";
import { Dispatch } from "redux";
import { checkTokenExp } from "../../utils/checkTokenExp";
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
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("refresh_token");
      dispatch({ type: AUTH, payload: res.data });

      console.log("REFESH OK");
      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      console.log("REFESH LOI ROI", err);
      // dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      // dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      // localStorage.removeItem("logged");
    }
  };

export const logout =
  (token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      localStorage.removeItem("logged");
      dispatch({ type: AUTH, payload: {} });
      await getAPI("logout", access_token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

//google login
export const gglogin =
  (id_token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("google_login", { id_token });

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
