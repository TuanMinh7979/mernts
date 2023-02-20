import React from "react";
import { IComment } from "../../TypeScript";
import AvatarComment from "./AvatarComment";

import CommentList from "./CommentList";

interface IProps {
  comment: IComment;
}
const Comments: React.FC<IProps> = ({ comment }) => {
  return (
    <div
      className="my-3 d-flex"
      style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "initial" : "none",
      }}
    >
      {comment.user && <AvatarComment user={comment.user}></AvatarComment>}
      <CommentList comment={comment}></CommentList>
    </div>
  );
};

export default Comments;
