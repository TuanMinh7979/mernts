import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../../components/alert/Alert";

import { RootStore } from "../../TypeScript";
import { getAPI } from "../../utils/FetchData";
import DisplayBlog from "./DisplayBlog";

const DetailBlog = () => {
  const { slug } = useParams();
  const { socketState } = useSelector((state: RootStore) => state);
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getAPI(`blog/${slug}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setLoading(false);
      });

    return () => setBlog(undefined);
  }, [slug]);

  //Join room
  useEffect(() => {
    if (!slug || !socketState) return;
    console.log("EMIT JOIN ROOM>>>>>>>>>>>>>>>>>>");

    socketState.emit("joinRoom", slug);
    return () => {
      socketState.emit("outRoom", slug);
    };
  }, [socketState, slug]);
  //Join room

  return (
    <div>
      {error && ErrorMessage(error)}

      {blog && <DisplayBlog blog={blog}></DisplayBlog>}
    </div>
  );
};

export default DetailBlog;
