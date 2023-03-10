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
const UserInfo = () => {
  const initState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: "",
  };
  const { authState } = useSelector((state: RootStore) => state);

  const dispatch = useDispatch();

  const [user, setUser] = useState<IUserProfile>(initState);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const { name, account, avatar, password, cf_password } = user;

  const hdlChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const hdlSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (avatar || name) {

      dispatch(updateUser(avatar as File, name, authState));
    }

    if (password && authState.access_token) {


      dispatch(resetPassword(password, cf_password, authState.access_token));
    }
  };

  const hdlChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setUser({ ...user, avatar: file });
    }
  };

  if (!authState.user) return <NotFound />;

  return (
    <form className="profile_info" onSubmit={hdlSubmit}>
      <div className="info_avatar">
        <img
          src={
            avatar ? URL.createObjectURL(avatar as File) : authState.user.avatar
          }
          alt="avatar"
        />
        <span>
          <i className="fas fa-camera" />
          <p>change</p>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file_up"
            onChange={hdlChangeFile}
          />
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="account">Account</label>
        <input
          type="text"
          className="form-control"
          defaultValue={authState.user.account}
          id="account"
          name="account"
          onChange={hdlChangeInput}
          disabled={true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">name</label>
        <input
          type="text"
          className="form-control"
          defaultValue={authState.user.name}
          id="name"
          name="name"
          onChange={hdlChangeInput}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">password</label>
        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            value={authState.user.password}
            id="password"
            name="password"
            onChange={hdlChangeInput}
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf_password">Confirm password</label>
        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            value={authState.user.password}
            id="cf_password"
            name="cf_password"
            onChange={hdlChangeInput}
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button className="btn btn-info w-100" type="submit">
        SAVE
      </button>
    </form>
  );
};

export default UserInfo;
