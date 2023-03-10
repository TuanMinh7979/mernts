import {
  GET_BLOGS_BY_CATID,
  IBlogsCategory,
  IGetBlogsCatType,
} from "../types/blogType";

const blogsCategoryReducers = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsCatType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_BY_CATID:
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
    default:
      return state;
  }
};

export default blogsCategoryReducers;
