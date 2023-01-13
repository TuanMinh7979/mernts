import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../components/global/NotFound";
import { RootStore } from "../TypeScript";
import CreateForm from "../components/card/CreateForm";
import CardHoriz from "../components/card/CardHoriz";
import Quill from "../components/editor/Quill";
const CreateBlog = () => {
  const initState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };
  const [blog, setBlog] = useState(initState);

  const [body, setBody] = useState("");

  const { authState, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  if (!authState.access_token) return <NotFound />;
  return (
    <div className="my-4 create_blog">
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Create</h5>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>

        <div className="col-md-6">
          <h5>Preview</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>
      <Quill setBody={setBody} />
    </div>
  );
};

export default CreateBlog;
