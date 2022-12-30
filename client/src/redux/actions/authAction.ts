import { IUserLogin } from "../../TypeScript";
import { postAPI } from "../../utils/FetchData";
import { AUTH, IAuthType } from "../types/authType";
import { Dispatch } from "redux";
export const login =
  (userLogin: any) => async (dispatch: Dispatch<IAuthType>) => {
    try {
      const res = await postAPI("login", userLogin);
      console.log(res);
      dispatch({
        type: "AUTH",
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
