import { IBlog } from "../../TypeScript";

export const GET_HOME_BLOGS = "GET_HOME_BLOGS";
export const GET_BLOGS_BY_CATID = "GET_BLOGS_BY_CATID";

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
}
//for action type
export interface IGetBlogsCatType {
  type: typeof GET_BLOGS_BY_CATID;
  payload: IBlogsCategory;
}

