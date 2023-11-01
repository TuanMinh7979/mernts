import { combineReducers } from "redux";
import authReducer from "./authReducers";

import categoryReducer from "./categoryReducer";
import homeBlogsReducer from "./homeBlogReducer";
import blogsCategoryReducers from "./blogsCategoryReducers";
import blogsUserReducer from "./blogsUserReducer";
import commentReducer from "./commentReducer";
import socketReducer from "./socketReducer";
import toastReducer from "./toastReducer";

export default combineReducers({
  authState: authReducer,
  categories: categoryReducer,
  homeBlogs: homeBlogsReducer,
  blogsCategory: blogsCategoryReducers,
  blogsUser: blogsUserReducer,
  comments: commentReducer,
  socketState: socketReducer,
  toastState: toastReducer,
});
