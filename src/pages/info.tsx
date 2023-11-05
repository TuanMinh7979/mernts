import React from "react";
import CountDown from "../components/countdown/CountDown";
import { useSelector } from "react-redux";
import { RootStore } from "../TypeScript";

import { getAccessTokenExp } from "../utils/TokenUtils";
import Cookies from "js-cookie";
import { getRefreshTokenExp } from "../utils/TokenUtils";
const LoginInfo = () => {
  const { authState } = useSelector((state: RootStore) => state);
  // const rftk = Cookies.get("refreshtoken");

  return (
    <>
      {authState.access_token ? (
        <CountDown
          title={"Access Token Time expire in"}
          exp={getAccessTokenExp(authState.access_token)}
        ></CountDown>
      ) : (
        <p style={{ textAlign: "center" }}>Not exist Access Token </p>
      )}
      {authState?.user?.rfTokenExp ? (
        <CountDown
          title={"Refresh token time expire in"}
          exp={getRefreshTokenExp(authState?.user?.rfTokenExp)}
        ></CountDown>
      ) : (
        <p style={{ textAlign: "center" }}>Not exist Refresh Token </p>
      )}
    </>
  );
};

export default LoginInfo;
