import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../TypeScript";

interface IProps {
  user: IUser;
  reply_user?: IUser;

}
const AvatarReply: React.FC<IProps> = (props) => {



  return (
    <div className="avatar_reply">
      <img src={props.user.avatar} alt="" />
      <div className="ms-1">
        <small className="">
          Reply to &nbsp;
          <Link to={`/profile/${props.reply_user?._id}`}>{props.reply_user?.name}</Link>
        </small>
      </div>
    </div>
  );
};

export default AvatarReply;
