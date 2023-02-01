import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBlogByCategoryId } from "../../redux/actions/blogAction";
import { IParams, RootStore } from "../../TypeScript";
import { useNavigate } from "react-router-dom";

//MAGIC FUNDAMENTAL: everything chi dc hay nap lai class khi 1: reload
//ke ca url thay doi(ma k reload) thi cung khong nap lai class 
//array blogsCategory se duy tri trong RAM cho den khi reload
//change state(hay render != voi reload) moi thu se dc giu trong ram
//state là 1 phần bộ nhớ của app và luôn hiện hữu khi app mở, ARRAY IN RAM
//reload nói chung là tắt rồi bật lại app nên mất hết và phải nạp lại class
const BlogByCategory = () => {
  const navigate = useNavigate();

  const { categories, blogsCategory } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [categoryId, setCategoryId] = useState("");
  //after render

  useEffect(() => {
    const category = categories.find((item) => item._id === slug);
    if (category) setCategoryId(category._id);
  }, [slug, categories]);

  useEffect(() => {
    if (!categoryId) return;
    console.log("AFTER rerender vào đây...");
    if (blogsCategory.every((item) => item.id !== categoryId)) {
      console.log("Nếu chưa tồn tại thì dispatch kéo về");
      dispatch(getBlogByCategoryId(categoryId));
    }
  }, [categoryId]);
  console.log("instance class function");
  console.log("-----", blogsCategory);
  return (
    <div>
      current :{slug}
      <ul>
        <li>
          <Link to="/blogs/63bd024f138e97372b8600e9">
            <button type="button">Java</button>
          </Link>
        </li>
        <li>
          <Link to="/blogs/63bd1033138e97372b860151">
            <button type="button">Python</button>
          </Link>
        </li>
        <li>
          <Link to="/blogs/63bf68ea4ae5748fc1327058">
            <button type="button">Js</button>
          </Link>
        </li>
      </ul>
      <br />
      <div>{blogsCategory.toString()}</div>
      <button
        onClick={() => {
          console.log("Click change State dan den rerender");
          setCategoryId("63bd1033138e97372b860151");
        }}
      >
        Change state and look xem co nap lai class hay khong
      </button>
    </div>
  );
};

export default BlogByCategory;
