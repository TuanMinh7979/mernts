import { combineReducers } from "redux";
import authReducer from "./authReducers";
import alertReducer from "./alertReducers";
import categoryReducer from "./categoryReducer";
import homeBlogsReducer from "./homeBlogReducer";
import blogsCategoryReducers from "./blogsCategoryReducers";
import blogsUserReducer from "./blogsUserReducer";
import commentReducer from "./commentReducer";
import socketReducer from "./socketReducer";
export default combineReducers({
  authState: authReducer,
  alertState: alertReducer,
  categories: categoryReducer,
  homeBlogs: homeBlogsReducer,
  blogsCategory: blogsCategoryReducers,
  blogsUser: blogsUserReducer,
  comments: commentReducer,
  socketState: socketReducer
});
