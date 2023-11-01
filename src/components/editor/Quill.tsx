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
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { showClientError, showLoading, stopLoading } from "../../utils/Utils";
interface IProps {
  setBody: (value: string) => void;
  body?: string;
}
const Quill: React.FC<IProps> = ({ setBody, body }) => {
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

    input.click();
    input.onchange = async () => {
      const files = input.files;
      if (!files) {
        showClientError("File does not exist", dispatch);
        return;
      }

      const file = files[0];
      const check = checkImage(file);
      if (check) {
        return showClientError(check, dispatch);
      }
      showLoading(dispatch);
      const photo = await imageUpload(file);
      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
      }
      stopLoading(dispatch);
    };
  }, [dispatch]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", hdlChangeImage);
  }, [hdlChangeImage]);

  //cis

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      placeholder="something..."
      ref={quillRef}
      onChange={(e) => hdlChange(e)}
      value={body}
    ></ReactQuill>
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
