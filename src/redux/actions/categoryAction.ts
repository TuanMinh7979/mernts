
import { log } from "console";
import { ErrorResponse } from "@remix-run/router";
import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import jwt_decode from "jwt-decode";
import {
  CREATE_CATE,
  DELETE_CATE,
  GET_CATES,
  ICategoryType,
  UPDATE_CATE,
} from "../types/categoryType";
import { ICategory } from "../../TypeScript";
import { checkTokenExp, getTimeToExpiration } from "../../utils/TokenUtils";
import { showError } from "../../utils/TokenUtils";
import Cookies from "js-cookie";
interface IToken {
  exp: number;
  iat: number;
  id: string;
}

export const getCates = () => async (dispatch: Dispatch<IAlertType>) => {
  try {
    // dispatch({ type: ALERT, payload: { loading: true, showSpinner: true } });
    const res = await getAPI("category");

    dispatch({ type: GET_CATES, payload: res.data.categories });
    // dispatch({ type: ALERT, payload: {} });
  } catch (err: any) {
    // showError(err, dispatch);
  }
};

export const createCategory =
  (name: string, token: string | undefined) =>
  async (dispatch: Dispatch<IAlertType>) => {
    console.log(token);
    const rftkDC: IToken = jwt_decode(Cookies.get("refreshtoken") as string);
    const tokenDC: IToken = jwt_decode(token as string);
    console.log(">>>>>>>>>>>>>>rftk", rftkDC);
    if (rftkDC.exp >= Date.now() / 1000) {
      console.log("-----------rftoken VALID ", rftkDC.exp);
    } else {
      console.log("-----------rftoken invalid ", rftkDC.exp);
    }
    console.log(
      "..........",
      rftkDC.exp == tokenDC.exp,
      rftkDC.exp, "rest rf time ", getTimeToExpiration(rftkDC.exp), 
      tokenDC.exp,  "rest ac time ", getTimeToExpiration(tokenDC.exp)
    );

    console.log("?????access token ", token?.substring(token.length - 5));
    console.log(
      "?????rftoken ",
      Cookies.get("refreshtoken")?.substring(
        (Cookies.get("refreshtoken") as string).length - 5
      )
    );
    try {
      const access_token = await checkTokenExp(token, dispatch);
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("category", { name }, access_token);
      dispatch({ type: CREATE_CATE, payload: res.data.newCategory });
      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      showError(err, dispatch);
    }
  };

export const updateCategory =
  (data: ICategory, token: string | undefined) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await patchAPI(`category/${data._id}`, data, access_token);

      dispatch({ type: UPDATE_CATE, payload: data });
      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
export const deteteCategory =
  (id: string, token: string | undefined) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);

      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await deleteAPI(`category/${id}`, access_token);

      dispatch({ type: DELETE_CATE, payload: id });
      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
