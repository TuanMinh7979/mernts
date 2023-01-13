import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertType";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
interface IProps {
  setBody: (value: string) => void;
}
const Quill: React.FC<IProps> = ({ setBody }) => {
  const dispatch = useDispatch();
  const modules = { toolbar: { container } };
  const quillRef = useRef<ReactQuill>(null);

  const hdlChange = (e: string) => {
    setBody(e);
  };

  //after reload page and reload this function
  const hdlChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    console.log(input);
    input.click();
    input.onchange = async () => {
      const files = input.files;
      if (!files) {
        return dispatch({
          type: ALERT,
          payload: { error: "File does not exist" },
        });
      }

      const file = files[0];
      const check = checkImage(file);
      if (check) {
        return dispatch({
          type: ALERT,
          payload: { error: check },
        });
      }

      dispatch({ type: ALERT, payload: { loading: true } });
      const photo = await imageUpload(file);
      console.log(photo);
      const quill = quillRef.current;

      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
      }

      dispatch({ type: ALERT, payload: { loading: false } });
    };
  }, [dispatch]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", hdlChangeImage);
  }, [hdlChangeImage]);

  console.log("compoenent render ");

  //cis

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="something..."
        ref={quillRef}
        onChange={(e) => hdlChange(e)}
      ></ReactQuill>
      <button className="btn btn-dark d-block mx-auto">Create Post</button>
    </div>
  );
};

let container = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];
export default Quill;
