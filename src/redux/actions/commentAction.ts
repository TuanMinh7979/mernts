import { Dispatch } from "react";
import { IComment } from "../../TypeScript";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/FetchData";
import {
  GET_COMMENTS,
  ICreateCommentType,
  IGetCommentsType,
  IReplyCommentType,
  IUpdateCommentType,
  IDeleteCommentType,
} from "../types/commentType";
import { checkTokenExp } from "../../utils/TokenUtils";
import { showError } from "../../utils/Utils";
export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<ICreateCommentType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);
      const res = await postAPI("comment", data, access_token);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IUpdateCommentType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);
      const res = await patchAPI(
        `comments/${data._id}`,
        { data },
        access_token
      );
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IDeleteCommentType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);
      await deleteAPI(`comments/${data._id}`, access_token);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
export const getComments =
  (id: string, numPage: Number) =>
  async (dispatch: Dispatch<IGetCommentsType>) => {
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
      showError(err, dispatch);
    }
  };

export const replyComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IReplyCommentType>) => {
    try {
      const access_token = await checkTokenExp(token, dispatch);
      const res = await postAPI("reply_comment", data, access_token);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
