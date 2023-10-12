import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginPass from "../components/auth/LoginPass";

import { useSelector } from "react-redux";
import { RootStore } from "../TypeScript";


const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useSelector((state: RootStore) => state);

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
        <LoginPass />

  

        <p className="mt-5">
          You don't have an account?
          <Link to="/register"> Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
