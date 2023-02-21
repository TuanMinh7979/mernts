import React, { useState } from "react";
import { IComment } from "../../TypeScript";
import AvatarComment from "./AvatarComment";
import AvatarReply from "./AvatarReply";

import CommentList from "./CommentList";

interface IProps {
  comment: IComment;
}
const Comments: React.FC<IProps> = ({ comment }) => {
  const [showReply, setShowReply] = useState<IComment[]>([]);

  return (
    <div
      className="my-3 d-flex"
      style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "initial" : "none",
      }}
    >
      {comment.user && <AvatarComment user={comment.user}></AvatarComment>}
      <CommentList
        comment={comment}
        showReply={showReply}
        setShowReply={setShowReply}
      >
        {showReply.map((comment, index) => (
          <div
            style={{
              opacity: comment._id ? 1 : 0.5,
              pointerEvents: comment._id ? "initial" : "none",
            }}
          >
          
            <AvatarReply
              user={comment.user}
              reply_user={comment.reply_user}
            ></AvatarReply>
            <CommentList
              comment={comment}
              showReply={showReply}
              setShowReply={setShowReply}
              children=""
            />
          </div>
        ))}
      </CommentList>
    </div>
  );
};

export default Comments;
