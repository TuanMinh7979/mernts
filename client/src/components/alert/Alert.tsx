import React from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { RootStore } from "../../TypeScript";
import Toast from "./Toast";
const Alert = () => {
  const { alertState } = useSelector((state: RootStore) => state);
  console.log("-------Alert state(reducerreturn ) now is: ", alertState);
  //MAGIC HEAR//
  return (
    <div>
      {alertState.loading && <Loading />}
      {alertState.error && (
        <Toast title="Error" body={alertState.error} bgColor="bg-danger" />
      )}
      {alertState.success && (
        <Toast
          title="Success"
          body={alertState.success}
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Alert;
