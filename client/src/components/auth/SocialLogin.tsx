import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login-lite";
const SocialLogin = () => {


  //or typescript
  const onSuccess = (googleUser: GoogleLoginResponse) => {
    console.log(googleUser);
  };

  const onFailure = (err: any) => {
    console.log(err);
  };

  return (
    <>
      <GoogleLogin
        client_id="your-google-client-id"
        cookiepolicy="single_host_origin"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </>
  );
};

export default SocialLogin;
