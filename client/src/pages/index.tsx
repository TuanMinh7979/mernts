import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CardVert from "../components/card/CardVert";
import Spinner from "../components/global/Spinner";
import { RootStore } from "../TypeScript";

const Home = () => {
  const { homeBlogs } = useSelector((state: RootStore) => state);

  if (!homeBlogs || !homeBlogs.length) return <Spinner />;
  return (
    <div>
      <h2>Home Page 123</h2>
      <div className="home_page">
        {homeBlogs.map((homeBlog) => (
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
