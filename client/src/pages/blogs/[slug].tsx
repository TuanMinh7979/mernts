import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBlogByCategoryId } from "../../redux/actions/blogAction";
import { IBlog, IParams, RootStore } from "../../TypeScript";
import { useNavigate } from "react-router-dom";
import CardVert from "../../components/card/CardVert";
import NotFound from "../../components/global/NotFound";

import "../../styles/blog_category.css";
import Pagination from "../../components/global/Pagination";

//MAGIC FUNDAMENTAL: everything chi dc hay nap lai class khi 1: reload
//ke ca url thay doi(ma k reload) thi cung khong nap lai class
//array blogsCategory se duy tri trong RAM cho den khi reload
//change state(hay render != voi reload) moi thu se dc giu trong ram
//state là 1 phần bộ nhớ của app và luôn hiện hữu khi app mở, ARRAY IN RAM
//reload nói chung là tắt rồi bật lại app nên mất hết và phải nạp lại class

//change State thì chạy lại class(new instace) nhưng state sẽ đc giữ lại
//chi RE render khi setState("khac voi gia tri state truoc do")
const BlogByCategory = () => {
  const { categories, blogsCategory } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [total, setTotal] = useState(0);
  //after render

  useEffect(() => {
    const category = categories.find((item) => item.name === slug);
    console.log("SetCategory Id=> Rerender ");
    if (category) setCategoryId(category._id);
  }, [slug, categories]);

  useEffect(() => {
    if (!categoryId) return;

    if (blogsCategory.every((item) => item.id !== categoryId)) {
      console.log("Nếu chưa tồn tại thì dispatch kéo về");
      dispatch(getBlogByCategoryId(categoryId));
    } else {
      let data = blogsCategory.find((item) => item.id === categoryId);
      if (!data) return;
      if (data) {
        setBlogs(data.blogs);
        setTotal(data.total);
      }
    }
  }, [categoryId, blogsCategory]);
  console.log("instance class function");
  console.log("-----", blogsCategory);

  if (!blogs) return <NotFound />;
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs &&
          blogs.map((blog) => {
            return (
              <>
                <CardVert key={blog._id} blog={blog}></CardVert>
              </>
            );
          })}
      </div>

      {total > 1 && <Pagination total={total} />}
    </div>
  );
};

export default BlogByCategory;
