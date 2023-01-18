import { IBlog } from "../../TypeScript";

export const GET_HOME_BLOGS = "GET_HOME_BLOGS";

//for state
export interface IHomeBlogs {
  _id: string;
  name: string;
  count: number;
  blogs: IBlog[];
}

//for action type
export interface IGetHomeBlogsType {
    type: typeof GET_HOME_BLOGS,
    payload: IHomeBlogs[]
  }