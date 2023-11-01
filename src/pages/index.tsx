import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CardVert from "../components/card/CardVert";
import Spinner from "../components/global/Spinner";
import { RootStore } from "../TypeScript";
import { getHomeBlogs } from "../redux/actions/blogAction";
import { useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //thay vi luu vao store ta se dispatch moi lan ung dung reload

    dispatch(getHomeBlogs());
  }, []);
  const { homeBlogs, toastState } = useSelector((state: RootStore) => state);
  if (toastState.loading && toastState.showSpinner) return <Spinner />;

  return (
    <div>
      <div className="home_page">
        {!toastState.loading && homeBlogs && homeBlogs.length === 0 && (
          <h3 className="text-center">No Blog </h3>
        )}
        {homeBlogs &&
          homeBlogs.map((homeBlog) => (
            <div key={homeBlog._id}>
              {homeBlog.count > 0 && (
                <>
                  <h3>
                    <Link to={`/blogs/${homeBlog.name.toLowerCase()}`}>
                      {homeBlog.name} <small>({homeBlog.count})</small>
                    </Link>
                  </h3>
                  <hr className="mt-1" />

                  <div className="home_blogs">
                    {homeBlog.blogs.map((blog) => (
                      <CardVert key={blog._id} blog={blog} />
                    ))}
                  </div>
                </>
              )}
              {homeBlog.count > 2 && (
                <Link
                  className="text-end d-block mt-2 mb-3"
                  to={`/blogs/${homeBlog.name}`}
                >
                  Read more &gt;&gt;
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
