import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "../../components/comments";
import Input from "../../components/comments/Input";
import { createComment } from "../../redux/actions/commentAction";
import { IBlog, IComment, IUser, RootStore } from "../../TypeScript";

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const { authState, comments } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (comments.data.length === 0) return;

    setShowComments(comments.data);
  }, [comments.data]);

  const hdlComment = (body: string) => {
    if (!authState.user || !authState.access_token) return;
    const data: IComment = {
      content: body,
      user: authState.user as IUser,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      createdAt: new Date().toISOString(),
    };
    console.log(showComments);
    setShowComments([...showComments, data]);

    dispatch(createComment(data, authState.access_token));
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

      {showComments?.map((comment, index) => (
        <Comments key={index} comment={comment}></Comments>
      ))}
    </div>
  );
};

export default DisplayBlog;
