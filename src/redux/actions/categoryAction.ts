
import { Dispatch } from "redux";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import {
  CREATE_CATE,
  DELETE_CATE,
  GET_CATES,
  ICategoryType,
  UPDATE_CATE,
} from "../types/categoryType";
import { ICategory } from "../../TypeScript";
import { checkTokenExp, getTimeToExpiration } from "../../utils/TokenUtils";
import { showError, showLoading, stopLoading } from "../../utils/Utils";

import { IToken } from "../../TypeScript";

export const getCates = () => async (dispatch: Dispatch) => {
  try {
    const res = await getAPI("category");

    dispatch({ type: GET_CATES, payload: res.data.categories });
  } catch (err: any) {
    // showError(err, dispatch);
  }
};

export const createCategory =
  (name: string, token: string | undefined) => async (dispatch: Dispatch) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);
      showLoading(dispatch);
      const res = await postAPI("category", { name }, access_token);
      dispatch({ type: CREATE_CATE, payload: res.data.newCategory });

      stopLoading(dispatch);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };

export const updateCategory =
  (data: ICategory, token: string | undefined) =>
  async (dispatch: Dispatch<ICategoryType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);
      showLoading(dispatch);
      const res = await patchAPI(`category/${data._id}`, data, access_token);

      dispatch({ type: UPDATE_CATE, payload: data });
      stopLoading(dispatch);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
export const deteteCategory =
  (id: string, token: string | undefined) =>
  async (dispatch: Dispatch< ICategoryType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);

      showLoading(dispatch);
      const res = await deleteAPI(`category/${id}`, access_token);

      dispatch({ type: DELETE_CATE, payload: id });
      stopLoading(dispatch);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
