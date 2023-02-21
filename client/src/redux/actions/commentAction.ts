import { Dispatch } from "react";
import { IComment } from "../../TypeScript";
import { getAPI, postAPI } from "../../utils/FetchData";
import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_COMMENT,
  GET_COMMENTS,
  ICreateCommentType,
  IGetCommentsType,
  IReplyCommentType,
  REPLY_COMMENT,
} from "../types/commentType";

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
      const res = await postAPI("comment", data, token);

      dispatch({
        type: CREATE_COMMENT,
        payload: { ...res.data, user: data.user },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const getComments =
  (id: string, numPage: number) => async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
      let limit = 2;
      const res = await getAPI(`comments/blog/${id}?limit=${limit}&page=${numPage}`);
      console.log(res);

      dispatch({
        type: GET_COMMENTS,
        payload: {
          data: res.data.comments,
          total: res.data.total,
        },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const replyComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
    try {
      const res = await postAPI("reply_comment", data, token);

      dispatch({
        type: REPLY_COMMENT,
        payload: { ...res.data, user: data.user, reply_user: data.reply_user },
      });
      console.log("result ", res);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
