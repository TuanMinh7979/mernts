import { Dispatch } from "react";
import { IComment } from "../../TypeScript";
import { postAPI } from "../../utils/FetchData";
import { ALERT, IAlertType } from "../types/alertType";
import { CREATE_COMMENT, ICreateCommentType } from "../types/commentType";

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
      const res = await postAPI("comment", data, token);



      dispatch({
        type: CREATE_COMMENT,
        payload: { ...res.data, user: data.user },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
