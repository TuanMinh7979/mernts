import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions/profileAction";
import {
  RootStore,
  InputChange,
  IUserProfile,
  FormSubmit,
} from "../../TypeScript";
import { updateUser } from "../../redux/actions/profileAction";
import NotFound from "../global/NotFound";
import { getAPI } from "../../utils/FetchData";
import { useEffect } from "react";
interface IProps {
  id: string;
}
const OtherInfo = ({ id }: IProps) => {
  const initState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: "",
  };

  const [user, setUser] = useState<IUserProfile>(initState);
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getAPI(`user/${id}`);
        console.log(res);
        
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfo();
  }, []);

  if (!user) return <NotFound />;
  return (
    <div className="profile_info">
      <div className="info_avatar">
        <img src={user.avatar as string} />
        <span>
          <i className="fas fa-camera" />
          <p>change</p>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file_up"
            disabled
          />
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="account">Account</label>
        <input
          type="text"
          className="form-control"
          defaultValue={user.account}
          id="account"
          name="account"
          disabled={true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">name</label>
        <input
          type="text"
          className="form-control"
          defaultValue={user.name}
          id="name"
          name="name"
          disabled={true}
        />
      </div>
    </div>
  );
};

export default OtherInfo;
