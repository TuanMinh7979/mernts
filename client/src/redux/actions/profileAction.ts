import { IAuth } from "../types/authType";
import { Dispatch } from "redux";
import { IAlertType, ALERT } from "../types/alertType";
import { checkImage, imageUpload } from "../../utils/ImageUpload";

export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType>) => {
    console.log("avatar is", avatar);
    console.log("name is", name);
    console.log("auth is", auth);
    if (!auth.access_token || !auth.user) return;
    console.log("hewrerererererer");
    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (avatar) {
        const check = checkImage(avatar);
        if (!check) {
          const photo = await imageUpload(avatar);
          console.log(photo);
        } else {
          return dispatch({ type: ALERT, payload: { error: check } });
        }
      }
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (e: any) {
      dispatch({ type: ALERT, payload: { error: e.response.data.msg } });
    }
  };
