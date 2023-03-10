import React, { useEffect, useState } from "react";
import { IComment } from "../../TypeScript";
import AvatarComment from "./AvatarComment";
import AvatarReply from "./AvatarReply";

import CommentList from "./CommentList";

interface IProps {
  comment: IComment;
}
const Comments: React.FC<IProps> = ({ comment }) => {
  const [showReply, setShowReply] = useState<IComment[]>([]);
  const [next, setNext] = useState(2);
  useEffect(() => {
    if (!comment.replyCM) return;
    setShowReply(comment.replyCM);
  }, [comment.replyCM]);

  // if(!comment) console.log("????????????????????????????????COMENT UNDEFINE")
  // if(!comment.user) console.log("????????????????????????????????user  UNDEFINE at comment", comment)
  return (
    <div
      className="my-3 d-flex"
      style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "initial" : "none",
      }}
    >
      {comment.user && (
        <>
          <AvatarComment user={comment.user}></AvatarComment>{" "}
          <CommentList
            comment={comment}
            showReply={showReply}
            setShowReply={setShowReply}
          >
            {showReply &&
              showReply.slice(0, next).map((el, index) => {
                return (
                  <div
                    style={{
                      opacity: el._id ? 1 : 0.5,
                      pointerEvents: el._id ? "initial" : "none",
                    }}
                  >
                    <AvatarReply
                      user={el.user}
                      reply_user={el.reply_user}
                    ></AvatarReply>
                    <CommentList
                      comment={el}
                      showReply={showReply}
                      setShowReply={setShowReply}
                      children=""
                    />
                  </div>
                );
              })}

            <div style={{ cursor: "pointer" }} className="">
              {showReply.length - next > 0 ? (
                <small onClick={() => setNext(next + 5)}>
                  See more comment...
                </small>
              ) : (
                showReply.length > 2 && (
                  <small onClick={() => setNext(2)}>Hide comment...</small>
                )
              )}
            </div>
          </CommentList>
        </>
      )}
    </div>
  );
};

export default Comments;
