import { IComment } from "../../TypeScript";

export const CREATE_COMMENT = "CREATE_COMMENT";
//action type
export interface ICreateCommentType {
  type: typeof CREATE_COMMENT;
  payload: IComment;
}
//state
export interface ICommentState {
  data: IComment[];
  total: number;
}

export type  ICommentAtType= ICreateCommentType
