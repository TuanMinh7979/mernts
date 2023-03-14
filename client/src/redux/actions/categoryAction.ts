import { ErrorResponse } from "@remix-run/router";
import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import {
  CREATE_CATE,
  DELETE_CATE,
  GET_CATES,
  ICategoryType,
  UPDATE_CATE,
} from "../types/categoryType";
import { ICategory } from "../../TypeScript";
import { checkTokenExp } from "../../utils/checkTokenExp";
export const createCategory =
  (name: string, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("category", { name }, token);

      dispatch({ type: CREATE_CATE, payload: res.data.newCategory });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const getCates = () => async (dispatch: Dispatch<IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await getAPI("category");

    dispatch({ type: GET_CATES, payload: res.data.categories });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
  }
};
export const updateCategory =
  (data: ICategory, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    const checkTokenRs = await checkTokenExp(token, dispatch);
    if (checkTokenRs) token = checkTokenRs;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await patchAPI(`category/${data._id}`, data, token);

      dispatch({ type: UPDATE_CATE, payload: data });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const deteteCategory =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    const checkTokenRs = await checkTokenExp(token, dispatch);
    if (checkTokenRs) token = checkTokenRs;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await deleteAPI(`category/${id}`, token);

      dispatch({ type: DELETE_CATE, payload: id });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
