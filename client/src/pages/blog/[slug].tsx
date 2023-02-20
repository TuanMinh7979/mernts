import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showErrorMsg } from "../../components/alert/Alert";
import Loading from "../../components/alert/Loading";

import { getAPI } from "../../utils/FetchData";
import DisplayBlog from "./DisplayBlog";

const DetailBlog = () => {
  const { slug } = useParams();
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

  if (loading) return <Loading></Loading>;
  return (
    <div>
      {error && showErrorMsg(error)}
      <h2>Detail Blog </h2>

      {blog && <DisplayBlog blog={blog}></DisplayBlog>}

    
      
    </div>
  );
};

export default DetailBlog;
