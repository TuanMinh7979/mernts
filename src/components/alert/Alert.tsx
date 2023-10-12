import React from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { RootStore } from "../../TypeScript";
import Toast from "./Toast";
export const Alert = () => {
  const { alertState } = useSelector((state: RootStore) => state);
  //MAGIC HEAR//
  return (
    <div>

      {alertState.loading && <Loading />}
      {alertState.error && (
        <Toast title="Error" body={alertState.error} bgColor="bg-danger" />
      )}
      {alertState.success && (
        <Toast title="Success" body={alertState.success} bgColor="bg-success" />
      )}
  
      {alertState.clientErr && (
        <Toast title="CLIENT ERR" body={alertState.clientErr} bgColor="bg-secondary" />
      )}
    </div>
  );
};

export const showSuccessMsg = (msg: string) => {
  return <div className="successMsg">{msg}</div>;
};

export const showErrorMsg = (msg: string) => {
  return <div className="errMsg">{msg}</div>;
};
