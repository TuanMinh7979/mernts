import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputChange, FormSubmit } from "../../TypeScript";
import { login } from "../../redux/actions/authAction";
const LoginPass = () => {
  const initState = { account: "", password: "" };

  const [userLogin, setUserLogin] = useState(initState);
  const { account, password } = userLogin;
  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();

  const hdlChangInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };
  const hdlSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(login(userLogin));
  };

  return (
    <form onSubmit={hdlSubmit}>
      <div className="form-group">
        <label htmlFor="account">Email/ Phone/ </label>
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

      <button
        type="submit"
        className="btn btn-dark w-100"
        disabled={account && password ? false : true}
      >
        Login
      </button>
    </form>
  );
};

export default LoginPass;
