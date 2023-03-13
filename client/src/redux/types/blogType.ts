import { IBlog } from "../../TypeScript";

export const GET_HOME_BLOGS = "GET_HOME_BLOGS";
export const GET_BLOGS_BY_CATID = "GET_BLOGS_BY_CATID";
export const GET_BLOGS_BY_USERID = "GET_BLOGS_BY_USERID";
export const CREATE_BLOGS_USER_ID = "CREATE_BLOGS_USER_ID";
export const DELETE_BLOGS_USER_ID = "DELETE_BLOGS_USER_ID";

//for state
export interface IHomeBlogs {
  _id: string;
  name: string;
  count: number;
  blogs: IBlog[];
}
//for action type
export interface IGetHomeBlogsType {
  type: typeof GET_HOME_BLOGS;
  payload: IHomeBlogs[];
}

//for state
export interface IBlogsCategory {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}
//for action type
export interface IGetBlogsCatType {
  type: typeof GET_BLOGS_BY_CATID;
  payload: IBlogsCategory;
}

export interface IBlogsUser {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}
//for action type
export interface IGetBlogsUserType {
  type: typeof GET_BLOGS_BY_USERID;
  payload: IBlogsUser;
}
export interface ICreateBlogsUserType {
  type: typeof CREATE_BLOGS_USER_ID;
  payload: IBlog;
}
export interface IDeleteBlogsUserType {
  type: typeof DELETE_BLOGS_USER_ID;
  payload: IBlog;
}

export type IBlogUserType =
  | IGetBlogsUserType
  | ICreateBlogsUserType
  | IDeleteBlogsUserType;
