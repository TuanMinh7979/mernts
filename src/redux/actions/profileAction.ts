import { Dispatch } from "redux";

import { IAuth, IAuthType, AUTH } from "../types/authType";

import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { patchAPI } from "../../utils/FetchData";
import { checkPassword } from "../../utils/Valid";

import { checkTokenExp } from "../../utils/TokenUtils";
import {
  showClientError,
  showError,
  showLoading,
  showSuccess,
} from "../../utils/Utils";
import { error } from "console";
export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAuthType>) => {
    let token = auth.access_token;
    if (!token || !auth.user) return;

    let url = "";

    try {
      const access_token = await checkTokenExp(token, dispatch);
      showLoading(dispatch);
      if (avatar) {
        const check = checkImage(avatar);
        if (!check) {
          const photo = await imageUpload(avatar);
          url = photo.url;
        } else {
          showClientError(check, dispatch);
          return;
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

      showSuccess(res.data.msg, dispatch);
    } catch (e: any) {
      showError(e, dispatch);
    }
  };

export const resetPassword =
  (password: string, cf_password: string, token?: string) =>
  async (dispatch: Dispatch<  IAuthType>) => {
    try {
      const access_token = await checkTokenExp(token as string, dispatch);
      showLoading(dispatch);
      const msg = checkPassword(password, cf_password);
      if (msg) {
        return showClientError(msg, dispatch);
      }

      const res = await patchAPI("reset_password", { password }, access_token);

      showSuccess(res.data.msg, dispatch);
    } catch (e: any) {
      showError(e, dispatch);
    }
  };
