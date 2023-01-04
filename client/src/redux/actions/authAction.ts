import { IUserLogin, IUserRegister } from "../../TypeScript";
import { postAPI } from "../../utils/FetchData";
import { AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { ValidRegister } from "../../utils/Valid";
import { Dispatch } from "redux";
export const login =
  (userLogin: any) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("login", userLogin);
      console.log("???????????????????????login dispatch", res);
      dispatch({
        type: "AUTH",
        payload: res.data,
      });

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      console.log(err);
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
      console.log(res);
      dispatch({ type: ALERT, payload: { success: "Register Success!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      console.log(err);
    }
  };
