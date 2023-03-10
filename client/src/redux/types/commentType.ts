import { IndentStyle } from "typescript";
import { IComment } from "../../TypeScript";

export const CREATE_COMMENT = "CREATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const REPLY_COMMENT = "REPLY_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const UPDATE_REPLYCOMMENT = "UPDATE_REPLYCOMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_REPLY = "DELETE_REPLY";

//action type
export interface ICreateCommentType {
  type: typeof CREATE_COMMENT;
  payload: IComment;
}
export interface IUpdateCommentType {
  type: typeof UPDATE_COMMENT | typeof UPDATE_REPLYCOMMENT;
  payload: IComment;
}
//for action type
export interface IDeleteCommentType {
  type: typeof DELETE_COMMENT | typeof DELETE_REPLY;
  payload: IComment;
}

export interface IReplyCommentType {
  type: typeof REPLY_COMMENT;
  payload: IComment;
}
export interface IGetCommentsType {
  type: typeof GET_COMMENTS;
  payload: ICommentState;
}
//state
export interface ICommentState {
  data: IComment[];
  total: number;
}

export type ICommentAtType =
  | ICreateCommentType
  | IUpdateCommentType
  | IGetCommentsType
  | IReplyCommentType
  | IDeleteCommentType;
