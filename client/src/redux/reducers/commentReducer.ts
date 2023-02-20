import {
  CREATE_COMMENT,
  ICommentAtType,
  ICommentState,
  ICreateCommentType,
} from "../types/commentType";

const initState = {
  data: [],
  total: 1,
};
const commentReducer = (
  state: ICommentState = initState,
  action: ICommentAtType
): ICommentState => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    default:
      return state;
  }
};

export default commentReducer;
