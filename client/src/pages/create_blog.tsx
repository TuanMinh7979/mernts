import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../components/global/NotFound";
import { RootStore } from "../TypeScript";
import CreateForm from "../components/card/CreateForm";
import CardHoriz from "../components/card/CardHoriz";
import Quill from "../components/editor/Quill";

import { validCreateBlog } from "../utils/Valid";
import { ALERT } from "../redux/types/alertType";
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

  const divRef = useRef<HTMLDivElement>(null);

  const { authState, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  console.log("RENDER ");
  useEffect(() => {
    console.log("luôn luôn gọi lần đầu kể cả có dependencies hay không");
    const div = divRef.current;
    if (!div) return; //neu khong return => undefine setBlog(content)=> content.length ERR => blank page
    const content = div?.innerText as string;
    console.log(content, "INNER TEXT --- BODY", body);
    setBlog({ ...blog, content });
  }, [body]);
  const hdlSubmit = async () => {
    if (!authState.access_token) return;

    // const div = divRef.current;
    // const content = div?.innerText as string;
    // console.log(content, "INNER TEXT --- BODY", body);
    // setBlog({ ...blog, content });

    const check = validCreateBlog({ ...blog });
    if (check.errLen !== 0) {
      return dispatch({ type: ALERT, payload: { error: check.errMsg } });
    }
  };
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
      <div
        ref={divRef}
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>

      <small>{blog.content}</small>
      <small>{blog.content.length}</small>

      <button onClick={hdlSubmit} className="btn btn-dark d-block mx-auto">
        Create Post
      </button>
    </div>
  );
};

export default CreateBlog;
