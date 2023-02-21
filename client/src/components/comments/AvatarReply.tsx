import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../TypeScript";

interface IProps {
  user: IUser;
  reply_user?: IUser;
}
const AvatarReply: React.FC<IProps> = ({ user, reply_user }) => {
  return (
    <div className="avatar_reply">
      <img src={user.avatar} alt="" />
      <div className="ms-1">
        <small className="">
          Reply to
          <Link to={`/profile/${reply_user?._id}`}>{reply_user?.name}</Link>
        </small>
      </div>
    </div>
  );
};

export default AvatarReply;
