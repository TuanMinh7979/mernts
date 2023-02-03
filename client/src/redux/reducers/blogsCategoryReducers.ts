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
        console.log("DISPATCH 1 ", [...state, action.payload]);
        return [...state, action.payload];
      } else {
        //update js current page

        console.log("dispatch 2 payload ", action.payload);
        const rs = state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
        console.log("DISPATCH 2 ", rs);
        return rs;
      }
    default:
      return state;
  }
};

export default blogsCategoryReducers;
