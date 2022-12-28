import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginPass from "../components/auth/LoginPass";

const Login = () => {
  const [sms, setSms] = useState(false);
  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppecase text-center mb-4"></h3>
        <LoginPass />

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <Link to="/forot_password" className="col-6">
            Forgot password?
          </Link>

          <span className="col-6" onClick={() => setSms(!sms)}>
            {sms ? "sign in with sms" : "sign in with password"}
          </span>
        </small>

        <p>
          You don't have an account?
          <Link to="/register"> Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
