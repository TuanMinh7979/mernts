import { IUserLogin } from "../../TypeScript";
import { postAPI } from "../../utils/FetchData";
import { AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";

import { Dispatch } from "redux";
export const login =
  (userLogin: any) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("login", userLogin);
      console.log(res);
      dispatch({
        type: "AUTH",
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({ type: ALERT, payload: { success: "Login Success!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      console.log(err);
    }
  };
