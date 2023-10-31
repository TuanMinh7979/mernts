import React from "react";
import CountDown from "../components/countdown/CountDown";
import { useSelector } from "react-redux";
import { RootStore } from "../TypeScript";

import { getAccessTokenExp } from "../utils/TokenUtils";
import Cookies from "js-cookie";
import { getRefreshTokenExp } from "../utils/TokenUtils";
const LoginInfo = () => {
  const { authState } = useSelector((state: RootStore) => state);
  const rftk = Cookies.get("refreshtoken");

  return (
    <>
      {authState.access_token ? (
        <CountDown title={"Access Token Time expire in"}
          exp={getAccessTokenExp(authState.access_token)}
        ></CountDown>
      ) : (
        <>Not exist Access Token </>
      )}
      {rftk ? (
        <CountDown title={"Refresh token time expire in"} exp={getRefreshTokenExp(rftk)}></CountDown>
      ) : (
        <>Not exist Refresh Token </>
      )}
    </>
  );
};

export default LoginInfo;
