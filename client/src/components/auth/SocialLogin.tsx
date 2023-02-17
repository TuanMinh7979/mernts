import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { gglogin } from "../../redux/actions/authAction";
const SocialLogin = () => {
  //or typescript
  const dispatch = useDispatch();
  const myOnSuccess = (credentialResponse: any) => {
    console.log(credentialResponse);
    const credential = credentialResponse.credential;
    console.log("id token ", credential)
    dispatch(gglogin(credential));
  };

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          myOnSuccess(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default SocialLogin;
