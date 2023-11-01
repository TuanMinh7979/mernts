import { Dispatch } from "redux";
import { IBlog } from "../../TypeScript";
import { showError, showLoading, showSuccess } from "../../utils/Utils";
import {
  deleteAPI,
  getAPI,
  patchAPI,
  postAPI,
  putAPI,
} from "../../utils/FetchData";
import { imageUpload } from "../../utils/ImageUpload";

import { checkTokenExp } from "../../utils/TokenUtils";

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
  async (dispatch: Dispatch< ICreateBlogsUserType>) => {
    let url;
    try {
      const access_token = await checkTokenExp(token, dispatch);
      showLoading(dispatch);
      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };

      const res = await postAPI("blog", newBlog, access_token);

      dispatch({
        type: CREATE_BLOGS_USER_ID,
        payload: res.data,
      });
      showSuccess("Create blog sucesss", dispatch);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
export const getHomeBlogs = () => async (dispatch: Dispatch) => {
  try {

    const res = await getAPI("home/blogs");
    dispatch({ type: GET_HOME_BLOGS, payload: res.data });

  } catch (err: any) {
    // showError(err, dispatch);
  }
};
export const getBlogByCategoryId =
  (catId: string, searchParams: string) =>
  async (dispatch: Dispatch<IGetBlogsCatType>) => {
    try {
      const res = await getAPI(`blogs/category/${catId}${searchParams}`);
      dispatch({
        type: GET_BLOGS_BY_CATID,
        payload: { ...res.data, id: catId, searchParams },
      });

    } catch (err: any) {
      showError(err, dispatch);
    }
  };
export const getBlogByUserId =
  (userId: string, searchParams?: string) =>
  async (dispatch: Dispatch< IGetBlogsUserType>) => {
    try {
      if (!searchParams) searchParams = "";
      const res = await getAPI(`blogs/user/${userId}${searchParams}`);

      dispatch({
        type: GET_BLOGS_BY_USERID,
        payload: { ...res.data, id: userId },
      });
    } catch (err: any) {
      showError(err, dispatch);
    }
  };

export const updateBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch) => {
    let url;
    try {
      const access_token = await checkTokenExp(token, dispatch);
      showLoading(dispatch);

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };

      const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token);


      showSuccess(res.data.msg, dispatch);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
export const deleteBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<  IDeleteBlogsUserType>) => {
    let url;
    try {
      const access_token = await checkTokenExp(token, dispatch);
      showLoading(dispatch);

      const res = await deleteAPI(`blog/${blog._id}`, access_token);

      dispatch({
        type: DELETE_BLOGS_USER_ID,
        payload: blog,
      });

      showSuccess(res.data.msg, dispatch);
    } catch (err: any) {
      showError(err, dispatch);
    }
  };
