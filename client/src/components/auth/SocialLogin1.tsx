import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login-lite";

const SocialLogin1 = () => {


  //or typescript
  const onSuccess = (googleUser: GoogleLoginResponse) => {
    alert("sc")
    console.log(googleUser);
  };

  const onFailure = (err: any) => {
    alert("failed...")
    console.log(err);
  };

  return (
    <>
      <GoogleLogin
        client_id=""
        cookiepolicy="single_host_origin"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </>
  );
};

export default SocialLogin1;
