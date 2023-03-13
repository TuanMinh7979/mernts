import {
  GET_BLOGS_BY_CATID,
  GET_BLOGS_BY_USERID,
  IBlogsCategory,
  IGetBlogsCatType,
  IGetBlogsUserType,
  IBlogUserType,
  IBlogsUser,
  CREATE_BLOGS_USER_ID,
  DELETE_BLOGS_USER_ID,
} from "../types/blogType";
import { IUser } from "../../TypeScript";
const blogsUserReducer = (
  state: IBlogsCategory[] = [],
  action: IBlogUserType
): IBlogsUser[] => {
  switch (action.type) {
    case GET_BLOGS_BY_USERID:
      //this is [[js current page data], [java current page],[python current page]]
      if (state.every((item) => item.id !== action.payload.id)) {
        //if chua co item trong array
        return [...state, action.payload];
      } else {
        //update js current page

        const rs = state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );

        return rs;
      }

    case CREATE_BLOGS_USER_ID:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
              blogs: [action.payload, ...item.blogs],
            }
          : item
      );

    case DELETE_BLOGS_USER_ID:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
              blogs: item.blogs.filter(
                (el) => el._id !== action.payload._id
              ),
            }
          : item
      );
    default:
      return state;
  }
};

export default blogsUserReducer;
