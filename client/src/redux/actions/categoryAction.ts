import { ErrorResponse } from "@remix-run/router";
import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { postAPI, getAPI } from "../../utils/FetchData";
import { CREATE_CATE, GET_CATES } from "../types/categoryType";
export const createCategory =
  (name: string, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("category", { name }, token);
      console.log(res);

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
