import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogByUserId } from "../../redux/actions/blogAction";
import { IBlog, RootStore } from "../../TypeScript";
import Loading from "../alert/Loading";
import CardHoriz from "../card/CardHoriz";
import Pagination from "../global/Pagination";
const UserBlogs = () => {
  const { blogsUser } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const userId = useParams().slug;

  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState<number>(0);
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
  }, [userId, blogsUser]);
  const handlePagination = (num: number) => {
    const search = `?page=${num}&limit=5`;
    dispatch(getBlogByUserId(userId as string, search));
  };
  if (!blogs) return <Loading />;

  if (blogs.length === 0) return <h3 className="text-center">No Blogs</h3>;
  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <CardHoriz key={blog._id} blog={blog} />
        ))}
      </div>
      {total >= 1 && (
        <div>
          <Pagination total={total} callback={handlePagination} />
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
