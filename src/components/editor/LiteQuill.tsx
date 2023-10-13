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
  body: string;
  setBody: (value: string) => void;
}
const LiteQuill: React.FC<IProps> = ({ body, setBody }) => {
  const modules = { toolbar: { container } };

  const hdlChange = (e: string) => {
    setBody(e);
  };



  return (

      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="something..."
        value={body}
        onChange={(e) => hdlChange(e)}
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
export default LiteQuill;
