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
      console.log("REDUCER HERE", action.payload, " Rs state: ", [
        ...state,
        action.payload,
      ]);

      return [...state, action.payload];
    default:
      return state;
  }
};

export default blogsCategoryReducers;
