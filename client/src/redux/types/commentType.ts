import { IComment } from "../../TypeScript";

export const CREATE_COMMENT = "CREATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";

//action type
export interface ICreateCommentType {
  type: typeof CREATE_COMMENT;
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

export type  ICommentAtType= ICreateCommentType | IGetCommentsType
