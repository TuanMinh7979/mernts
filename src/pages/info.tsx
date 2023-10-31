import React from "react";
import CountDown from "../components/countdown/CountDown";
import { useSelector } from "react-redux";
import { RootStore } from "../TypeScript";

import { getAccessTokenExp } from "../utils/TokenUtils";

const LoginInfo = () => {
  const { authState } = useSelector((state: RootStore) => state);
  console.log("??????????????", authState);

  return (
    <CountDown exp={getAccessTokenExp(authState?.access_token!)}></CountDown>
  );
};

export default LoginInfo;
