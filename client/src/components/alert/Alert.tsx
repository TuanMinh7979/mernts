import React from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { RootStore } from "../../TypeScript";
import Toast from "./Toast";
const Alert = () => {
  const { alertReducer } = useSelector((state: RootStore) => state);
  console.log("-------Alert state(reducerreturn ) now is: ", alertReducer);
  //MAGIC HEAR//
  return (
    <div>
      {alertReducer.loading && <Loading />}
      {alertReducer.error && (
        <Toast title="Error" body={alertReducer.error} bgColor="bg-danger" />
      )}
      {alertReducer.success && (
        <Toast
          title="Success"
          body={alertReducer.success}
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Alert;
