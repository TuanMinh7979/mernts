import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProps {
  setBody: (value: string) => void;
}
const Quill: React.FC<IProps> = ({ setBody }) => {
  const modules = { toolbar: { container } };
  const quillRef = useRef<ReactQuill>(null);

  const hdlChange = (e: string) => {
    setBody(e);
  };

  const hdlChangeImage = () => {
    console.log("???????????????change image now");
  };

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", hdlChangeImage);
  }, [hdlChangeImage]);

  const [products, setProduct] = useState<any>([]);
  const changeProduct = () => {
    setProduct([...products, 1]);
  };
  useEffect(() => {
    console.log("use effect call ");
  }, [products]);
  useMemo(() => {
    console.log("use memo call ");
  }, [products]);

  console.log("compoenent render ")

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

      <button onClick={changeProduct}>Click me</button>
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
