import { Dispatch } from "redux";
import { IAlertType, ALERT } from "../types/alertType";
import { IAuth, IAuthType, AUTH } from "../types/authType";

import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { patchAPI } from "../../utils/FetchData";
import { checkPassword } from "../../utils/Valid";

import { checkTokenExp } from "../../utils/TokenUtils";
import { showError } from "../../utils/TokenUtils";
export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    let token = auth.access_token;
    if (!token || !auth.user) return;

    let url = "";

    try {
      const access_token = await checkTokenExp(token, dispatch);
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
      const res = await patchAPI("user", { avatar: url, name }, access_token);

      //update current profile page -> after that use refresh token
      //refreshtoken call after nhan reload button

      //nen can dispatch ngay do chuyen trang thi k refresh token
      const newAuthState = {
        access_token: token,
        user: {
          ...auth.user,
          avatar: url ? url : (auth.user.avatar as string),
          name: name ? name : auth.user.name,
        },
      };

      dispatch({
        type: "AUTH",
        payload: newAuthState,
      });

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (e: any) {
      showError(e, dispatch);
    }
  };

export const resetPassword =
  (password: string, cf_password: string, token?: string) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    try {
      const access_token = await checkTokenExp(token as string, dispatch);
      dispatch({ type: ALERT, payload: { loading: true } });
      const msg = checkPassword(password, cf_password);
      if (msg) return dispatch({ type: ALERT, payload: { error: msg } });

      const res = await patchAPI("reset_password", { password }, access_token);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (e: any) {
      showError(e, dispatch);
    }
  };
