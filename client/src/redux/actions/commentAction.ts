import { Dispatch } from "react";
import { IComment } from "../../TypeScript";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/FetchData";
import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_COMMENT,
  GET_COMMENTS,
  ICreateCommentType,
  IGetCommentsType,
  IReplyCommentType,
  IUpdateCommentType,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLYCOMMENT,
  DELETE_COMMENT,
  DELETE_REPLY,
  IDeleteCommentType,
} from "../types/commentType";
import { checkTokenExp } from "../../utils/checkTokenExp";
export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    const checkTokenRs = await checkTokenExp(token, dispatch);
    if (checkTokenRs) token = checkTokenRs;
    try {
      const res = await postAPI("comment", data, token);

      // dispatch({
      //   type: CREATE_COMMENT,
      //   payload: { ...res.data, user: data.user },
      // });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateCommentType>) => {
    const checkTokenRs = await checkTokenExp(token, dispatch);
    if (checkTokenRs) token = checkTokenRs;
    try {
      // dispatch({
      //   type: data.comment_root ? UPDATE_REPLYCOMMENT : UPDATE_COMMENT,
      //   payload: data,
      // });
      const res = await patchAPI(`comments/${data._id}`, { data }, token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteCommentType>) => {
    const checkTokenRs = await checkTokenExp(token, dispatch);
    if (checkTokenRs) token = checkTokenRs;
    try {
      // dispatch({
      //   type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
      //   payload: data,
      // });

      await deleteAPI(
        `comments/${data._id}`,

        token
      );
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const getComments =
  (id: string, numPage: Number) =>
  async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
      let limit = 4;
      const res = await getAPI(
        `comments/blog/${id}?limit=${limit}&page=${numPage}`
      );

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
    const checkTokenRs = await checkTokenExp(token, dispatch);
    if (checkTokenRs) token = checkTokenRs;
    try {
      const res = await postAPI("reply_comment", data, token);

      // dispatch({
      //   type: REPLY_COMMENT,
      //   payload: { ...res.data, user: data.user, reply_user: data.reply_user },
      // });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
