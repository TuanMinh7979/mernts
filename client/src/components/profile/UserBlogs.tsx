import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogByUserId } from "../../redux/actions/blogAction";
import { IBlog, RootStore } from "../../TypeScript";
import Loading from "../alert/Loading";
import CardHoriz from "../card/CardHoriz";

const UserBlogs = () => {
  const { blogsUser } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const userId = useParams().slug;

  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState<Number>(0);
  useEffect(() => {
    if (!userId) return;

    if (blogsUser.every((item) => item.id !== userId)) {
      dispatch(getBlogByUserId(userId));
    } else {
      const data = blogsUser.find((item) => item.id === userId);
      if (!data) return;

      setBlogs(data.blogs);
      setTotal(data.total);
    }
  }, [userId,blogsUser]);

  if (!blogs) return <Loading />;
  return (
    <div>
      <div className="container">
        {blogs.map((blog) => (
          <CardHoriz key={blog._id} blog={blog}></CardHoriz>
        ))}
      </div>
    </div>
  );
};

export default UserBlogs;
