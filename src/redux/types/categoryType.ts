import { IUser } from "../../TypeScript";
import { ICategory } from "../../TypeScript";
export const CREATE_CATE = "CREATE_CATE";
export const GET_CATES = "GET_CATES";
export const UPDATE_CATE = "UPDATE_CATE";
export const DELETE_CATE = "DELETE_CATE";

// action
export interface ICreate {
  type: typeof CREATE_CATE;
  payload: ICategory;
}
//action
export interface IGet {
  type: typeof GET_CATES;
  payload: ICategory[];
}
export interface IUpdate {
  type: typeof UPDATE_CATE;
  payload: ICategory;
}
export interface IDelete {
  type: typeof DELETE_CATE;
  payload: string;
}

export type ICategoryType = ICreate | IGet | IUpdate | IDelete;
