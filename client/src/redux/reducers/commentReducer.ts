import {
  CREATE_COMMENT,
  GET_COMMENTS,
  ICommentAtType,
  ICommentState,
  ICreateCommentType,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLYCOMMENT,
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
    case GET_COMMENTS:
      return action.payload;
    case REPLY_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                replyCM: [...(item.replyCM as []), action.payload],
              }
            : item
        ),
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case UPDATE_REPLYCOMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                replyCM: item.replyCM?.map((rp) =>
                  rp._id === action.payload._id ? action.payload : rp
                ),
              }
            : item
        ),
      };

    default:
      return state;
  }
};

export default commentReducer;
