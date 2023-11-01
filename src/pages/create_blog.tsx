import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../components/global/NotFound";
import { RootStore } from "../TypeScript";
import CreateForm from "../components/card/CreateForm";
import CardHoriz from "../components/card/CardHoriz";
import Quill from "../components/editor/Quill";
import { shallowEqual } from "react-redux";

import { validCreateBlog } from "../utils/Valid";
import { createBlog } from "../redux/actions/blogAction";
import { getAPI } from "../utils/FetchData";
import { updateBlog } from "../redux/actions/blogAction";
import { showClientError } from "../utils/Utils";
interface IProps {
  id?: string;
}
const CreateBlog: React.FC<IProps> = ({ id }) => {
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
  const [text, setText] = useState("");

  const divRef = useRef<HTMLDivElement>(null);

  const { authState, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [oldData, setOldData] = useState(initState);

  useEffect(() => {
    if (!id) return;
    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data);
        setBody(res.data.content);
        setOldData(res.data);
      })
      .catch((err) => console.log(err));

    const initData = {
      user: "",
      title: "",
      content: "",
      description: "",
      thumbnail: "",
      category: "",
      createdAt: new Date().toISOString(),
    };
    return () => {
      setBlog(initData);
      setBody("");
      setOldData(initData);
    };
  }, [id]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return; //neu khong return => undefine setBlog(content)=> content.length ERR => blank page
    const text = div?.innerText as string;

    setText(text);
  }, [body]);
  const hdlSubmit = async () => {
    if (!authState.access_token) return;

    const check = validCreateBlog({ ...blog, content: text });
    if (check.errLen !== 0) {
      return showClientError(check.errMsg, dispatch);
    }

    let newData = { ...blog, content: body };

    if (id) {
      const checkEqual = shallowEqual(oldData, newData);
      if (checkEqual) {
        return showClientError("The data does not change", dispatch);
      } else {
        dispatch(updateBlog(newData, authState.access_token));
      }
    } else {
      dispatch(createBlog(newData, authState.access_token));
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
      <Quill setBody={setBody} body={body} />
      <div
        ref={divRef}
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>

      <small>{text.length}</small>

      <button onClick={hdlSubmit} className="btn btn-dark d-block mx-auto">
        {id ? "Update" : "Create Post"}
      </button>
      {/* <button onClick={toggleIdToCheckCleanUpFunction}>changeid</button> */}
    </div>
  );
};

export default CreateBlog;
