
import { Dispatch } from "redux";
import { IAlertType, ALERT } from "../types/alertType";
import { IAuth, IAuthType, AUTH } from "../types/authType";

import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { patchAPI } from "../../utils/FetchData";
export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    console.log("avatar is", avatar);
    console.log("name is", name);
    console.log("auth is", auth);
    if (!auth.access_token || !auth.user) return;

    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (avatar) {
        const check = checkImage(avatar);
        if (!check) {
          const photo = await imageUpload(avatar);
          url = photo.url;
        } else {
          return dispatch({ type: ALERT, payload: { error: check } });
        }
      }

      if (!url) {
        url = auth.user.avatar;
      }
      const res = await patchAPI("user", { avatar: url }, auth.access_token);

      dispatch({
        type: "AUTH",
        payload: res.data.savedUser,
      });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (e: any) {
      dispatch({ type: ALERT, payload: { error: e.response.data.msg } });
    }
  };
