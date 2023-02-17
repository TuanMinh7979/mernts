import { Dispatch } from "redux";
import { IBlog } from "../../TypeScript";
import { getAPI, postAPI } from "../../utils/FetchData";
import { imageUpload } from "../../utils/ImageUpload";
import { ALERT, IAlert, IAlertType } from "../types/alertType";

import {
  GET_BLOGS_BY_CATID,
  GET_BLOGS_BY_USERID,
  GET_HOME_BLOGS,
  IGetBlogsCatType,
  IGetBlogsUserType,
  IGetHomeBlogsType,
} from "../types/blogType";
export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };

      const res = await postAPI("blog", newBlog, token);

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const getHomeBlogs = () => async (dispatch: Dispatch<IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const res = await getAPI("home/blogs");

    dispatch({ type: GET_HOME_BLOGS, payload: res.data });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
  }
};
export const getBlogByCategoryId =
  (catId: string, searchParams: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsCatType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      console.log(`CURRENT API EP : blogs/${catId}${searchParams}`);
      const res = await getAPI(`blogs/category/${catId}${searchParams}`);
      dispatch({
        type: GET_BLOGS_BY_CATID,
        payload: { ...res.data, id: catId, searchParams },
      });
      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const getBlogByUserId =
  (userId: string, searchParams?: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if(!searchParams) searchParams=""
      const res = await getAPI(`blogs/user/${userId}${searchParams}`);
      console.log("fetch Data blogUser", res);
      dispatch({
        type: GET_BLOGS_BY_USERID,
        payload: { ...res.data, id: userId },
      });
      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
