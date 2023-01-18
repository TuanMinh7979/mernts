import { Dispatch } from "redux";
import { IBlog } from "../../TypeScript";
import { getAPI, postAPI } from "../../utils/FetchData";
import { imageUpload } from "../../utils/ImageUpload";
import { ALERT, IAlert, IAlertType } from "../types/alertType";

import { GET_HOME_BLOGS, IGetHomeBlogsType } from "../types/blogType";
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

      console.log(res);

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };
export const getHomeBlogs = () => async (dispatch: Dispatch<IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const res = await getAPI("home/blogs");

    console.log(res);
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
  }
};
