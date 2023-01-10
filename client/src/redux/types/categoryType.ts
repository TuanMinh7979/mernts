import { IUser } from "../../TypeScript";
import { ICategory } from "../../TypeScript";
export const CREATE_CATE = "CREATE_CATE";
export const GET_CATES = "GET_CATES";


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

export type ICategoryType = ICreate | IGet


