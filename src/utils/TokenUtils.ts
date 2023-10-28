import jwt_decode from "jwt-decode";
import axios from "axios";
import { AUTH } from "../redux/types/authType";
import { ALERT } from "../redux/types/alertType";
import { log } from "console";

interface IToken {
  exp: number;
  iat: number;
  id: string;
}

export const checkTokenExp = async (
  access_token: string | undefined,
  dispatch: any
): Promise<string | undefined> => {
  // function return new token if have, else => return undefine or empty string
  // use if(checkTokenExpRs) token= checkTokenExpRs, make sure only if there is a  new token,  asssign it to token
  // if there is not access_token=>  not assign=> let user to login again
  if (!access_token) return access_token;
  const access_tokenDecode: IToken = jwt_decode(access_token);
  if (access_tokenDecode.exp >= Date.now() / 1000) {
    // if token valid => not assign=>continue use old token
    return access_token;
  }
  try {
    dispatch({ type: ALERT, payload: { success: "Refresh new token" } });
    const res = await axios.get("/api/refresh_token");
    dispatch({ type: AUTH, payload: res.data });
    if (res.data && res.data.access_token) return res.data.access_token;
  } catch (e: any) {
    // if refresh error mean refresh token has expired => can logout:
    const rfTokenError = new Error();
    rfTokenError.name = "RefreshTokenError";
    rfTokenError.message = e.response.data.msg;
    throw rfTokenError;
  }
};

export const logout = (dispatch: any) => {
  dispatch({ type: AUTH, payload: {} });
  localStorage.removeItem("logged");
};

export const showError = (error: any, dispatch: any) => {
  if (error.name == "RefreshTokenError") {
    dispatch({ type: ALERT, payload: { error: error.message } });
    return logout(dispatch);
  }
  dispatch({ type: ALERT, payload: { error: error.response.data.msg } });
};
