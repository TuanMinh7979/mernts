import {
  GET_HOME_BLOGS,
  IGetHomeBlogsType,
  IHomeBlogs,
} from "../types/blogType";

const homeBlogsReducer = (
  state: IHomeBlogs[] | null = null,
  action: IGetHomeBlogsType
): IHomeBlogs[] | null => {
  switch (action.type) {
    case GET_HOME_BLOGS:
      return action.payload;

    default:
      return state;
  }
};

export default homeBlogsReducer;
