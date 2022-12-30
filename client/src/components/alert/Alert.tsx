import React from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { RootStore } from "../../TypeScript";
const Alert = () => {
  const { alertReducer } = useSelector((state: RootStore) => state);
  //MAGIC HEAR//
  return <div>{alertReducer.loading && <Loading />}</div>;
};

export default Alert;
