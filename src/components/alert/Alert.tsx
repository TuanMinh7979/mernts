import React from "react";

export const SuccessMessage = (msg: string) => {
  return <div className="successMsg">{msg}</div>;
};

export const ErrorMessage = (msg: string) => {
  return <div className="errMsg">{msg}</div>;
};
