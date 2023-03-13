import { Dispatch } from "redux";
import { IBlog } from "../../TypeScript";
import {
  deleteAPI,
  getAPI,
  patchAPI,
  postAPI,
  putAPI,
} from "../../utils/FetchData";
import { imageUpload } from "../../utils/ImageUpload";
import { ALERT, IAlert, IAlertType } from "../types/alertType";

import {
  GET_BLOGS_BY_CATID,
  GET_BLOGS_BY_USERID,
  GET_HOME_BLOGS,
  ICreateBlogsUserType,
  IGetBlogsCatType,
  IGetBlogsUserType,
  IGetHomeBlogsType,
  CREATE_BLOGS_USER_ID,
  IDeleteBlogsUserType,
  DELETE_BLOGS_USER_ID,
} from "../types/blogType";
export const createBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
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
      console.log("from server", res);
      dispatch({
        type: CREATE_BLOGS_USER_ID,
        payload: res.data,
      });
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
      if (!searchParams) searchParams = "";
      const res = await getAPI(`blogs/user/${userId}${searchParams}`);

      dispatch({
        type: GET_BLOGS_BY_USERID,
        payload: { ...res.data, id: userId },
      });
      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const updateBlog =
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

      const res = await putAPI(`blog/${newBlog._id}`, newBlog, token);
      console.log(res);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const deleteBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteBlogsUserType>) => {
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await deleteAPI(`blog/${blog._id}`, token);

      dispatch({
        type: DELETE_BLOGS_USER_ID,
        payload: blog,
      });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
