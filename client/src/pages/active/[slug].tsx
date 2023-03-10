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
    if (slug) {
      postAPI("active", { active_token: slug })
        .then((res) => {
     
          setSuccessMsg("thanh cong");
        })
        .catch((err) => {

          setErrMsg(err.response.data.msg);
        });
    }
  }, [slug]);

  return (
    <>
      <div>
        {successMsg ? showSuccessMsg(successMsg) : showErrorMsg(errMsg)}
      </div>
    </>
  );
};

export default Active;
