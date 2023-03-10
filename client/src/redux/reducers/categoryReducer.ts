import {
  CREATE_CATE,
  GET_CATES,
  UPDATE_CATE,
  DELETE_CATE,
} from "../types/categoryType";
import { ICategory } from "../../TypeScript";
import * as type from "../types/categoryType";
const categoryReducer = (
  state: ICategory[] = [],
  action: type.ICategoryType
): ICategory[] => {
  switch (action.type) {
    case CREATE_CATE:
      return [...state, action.payload];
    case GET_CATES:
      return action.payload;
    case UPDATE_CATE:
      return state.map((item) => {
        if (item._id === action.payload._id) return action.payload;
        return item;
      });
    case DELETE_CATE:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default categoryReducer;
