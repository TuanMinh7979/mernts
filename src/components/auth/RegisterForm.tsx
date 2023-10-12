import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormSubmit, InputChange } from "../../TypeScript";
import { register } from "../../redux/actions/authAction";
const RegisterForm = () => {
  const initState = { name: "", account: "", password: "", cf_password: "" };

  const [userRegister, setUserRegister] = useState(initState);
  const { name, account, password , cf_password} = userRegister;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useDispatch();

  const hdlChangInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };
  const hdlSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };

  return (
    <form onSubmit={hdlSubmit}>
      <div className="form-group">
        <label htmlFor="account">Name </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={hdlChangInput}
        />
      </div>
      <div className="form-group">
        <label htmlFor="account">Account </label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={hdlChangInput}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">password </label>
        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={hdlChangInput}
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Confirm password </label>
        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={hdlChangInput}
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100"
       
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
