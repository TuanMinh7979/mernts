import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IParams } from "../../TypeScript";
import { postAPI } from "../../utils/FetchData";
import { showErrorMsg, showSuccessMsg } from "../../components/alert/Alert";
const Active = () => {
  const { slug } = useParams();
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    console.log("post now---");
    postAPI("active", { active_token: slug })
      .then((res) => {
        console.log("success now");
        setSuccessMsg(res.data.msg);
      })
      .catch((err) => {
        console.log("error now");
        setErrMsg(err.response.data.msg);
      });
  }, []);
  console.log("RENDER now");
  return (
    <>
      <div>{errMsg && showErrorMsg(errMsg)}</div>
      <div>{successMsg && showSuccessMsg(successMsg)}</div>
    </>
  );
};

export default Active;
