import {
  GET_BLOGS_BY_CATID,
  GET_BLOGS_BY_USERID,
  IBlogsCategory,
  IGetBlogsCatType,
  IGetBlogsUserType,
} from "../types/blogType";

const blogsUserReducer = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsUserType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_BY_USERID:
      //this is [[js current page data], [java current page],[python current page]]
      if (state.every((item) => item.id !== action.payload.id)) {
        //if chua co item trong array
        console.log("DISPATCH 1 ", [...state, action.payload]);
        return [...state, action.payload];
      } else {
        //update js current page

        console.log("dispatch 2 payload ", action.payload);
        const rs = state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
       
        return rs;
      }
    default:
      return state;
  }
};

export default blogsUserReducer;
