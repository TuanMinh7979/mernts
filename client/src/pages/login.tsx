import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginPass from "../components/auth/LoginPass";
import LoginSMS from "../components/auth/LoginSMS";
import { useSelector } from "react-redux";
import { RootStore } from "../TypeScript";
import SocialLogin from "../components/auth/SocialLogin";

const Login = () => {
  const [sms, setSms] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useSelector((state: RootStore) => state);
  console.log(location);
  useEffect(() => {
    if (authState.access_token) {
      const searchStr = location.search;
      let url = "/";
      if (searchStr) {
        url = location.search.replace("?", "/");
      }
      navigate(url);
    }
  }, [authState.access_token]);
  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppecase text-center mb-4">LOGIN</h3>
        <SocialLogin></SocialLogin>
        {sms ? <LoginSMS /> : <LoginPass />}

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <Link to="/forot_password" className="col-6">
            Forgot password?
          </Link>

          <span className="col-6" onClick={() => setSms(!sms)}>
            {sms ? "sign in with password" : "sign in with sms"}
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
