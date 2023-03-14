import jwt_decode from "jwt-decode";
import axios from "axios";
import { AUTH } from "../redux/types/authType";

interface IToken {
  exp: number;
  iat: number;
  id: string;
}

export const checkTokenExp = async (token: string, dispatch: any) => {
  const decoded: IToken = jwt_decode(token);

  if (decoded.exp >= Date.now() / 1000) return;

  const res = await axios.get("/api/refresh_token");
  console.log(".....ELSE GET NEW TOKEN: ", res);
  dispatch({ type: AUTH, payload: res.data });
  if (res.data && res.data.access_token) return res.data.access_token;
  return "";
};
