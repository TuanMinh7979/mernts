import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../../components/alert/Loading";
import Comments from "../../components/comments";
import Input from "../../components/comments/Input";
import Pagination from "../../components/global/Pagination";
import Spinner from "../../components/global/Spinner";
import { createComment, getComments } from "../../redux/actions/commentAction";
import { IBlog, IComment, IUser, RootStore } from "../../TypeScript";

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { authState, comments } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState<IComment[]>([]);

  const hdlComment = (body: string) => {
    if (!authState.user || !authState.access_token) return;
    const data: IComment = {
      content: body,
      user: authState.user as IUser,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);

    dispatch(createComment(data, authState.access_token));
  };
  const fetchComments = useCallback(
    async (id: string, numPage = 1) => {
      setLoading(true);
      dispatch(getComments(id, numPage));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    setShowComments(comments.data);
  }, [comments.data]);

  useEffect(() => {
    if (!blog._id) return;
    const newPage = searchParams.get("page");
    fetchComments(blog._id, Number(newPage));
  }, [blog._id, fetchComments, searchParams]);

  const [loading, setLoading] = useState(false);

  const hdlPagination = (num: number) => {

    if (!blog._id) return;
    fetchComments(blog._id, num);
  };

  return (
    <div>
      <h2
        className="text-center my-3 text-capitalize fs-1"
        style={{ color: "#ff7a00" }}
      >
        {blog.title}
      </h2>

      <div className="text-end fst-italic" style={{ color: "teal" }}>
        <small>
          {typeof blog.user !== "string" && `By: ${blog.user.name}`}
        </small>

        <small className="ms-2">
          {new Date(blog.createdAt).toLocaleString()}
        </small>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />
      <hr className="my-1" />

      <h3 style={{ color: "#ff7a00" }}>---Comment---</h3>

      {authState.user ? (
        <Input callback={hdlComment} />
      ) : (
        <h5>
          Please <Link to={`/login?blog/${blog._id}`}>login</Link> before{" "}
        </h5>
      )}

      {loading ? (
        <Spinner></Spinner>
      ) : (
        showComments?.map((comment, index) => (
          <Comments key={index} comment={comment}></Comments>
        ))
      )}

      {comments.total > 0 && (
        <Pagination
          total={comments.total}
          callback={hdlPagination}
        ></Pagination>
      )}
    </div>
  );
};

export default DisplayBlog;
