import React from "react";
import { useParams } from "react-router-dom";
import { IParams, RootStore } from "../../TypeScript";
import { useSelector } from "react-redux";

import UserBlogs from "../../components/profile/UserBlogs";
import UserInfo from "../../components/profile/UserInfo";
import OtherInfo from "../../components/profile/OtherInfo";


const Profile = () => {
  const { authState } = useSelector((state: RootStore) => state);
  const { slug } = useParams();

  return (
    <div className="row my-3">
      <div className="col-md-5 mb-3">
        {authState.user?._id === slug ? <UserInfo/> : <OtherInfo/>}
      </div>

      <div className="col-md-7">
        <h3><UserBlogs></UserBlogs></h3>
      </div>
    </div>
  );
};

export default Profile;
