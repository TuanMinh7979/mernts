import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IBlog, IUser } from "../../TypeScript";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../TypeScript";
import { deleteBlog } from "../../redux/actions/blogAction";
interface IProps {
  blog: IBlog;
}

const CardHoriz: React.FC<IProps> = ({ blog }) => {
  const { slug } = useParams();
  const { authState } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const hdlDel = () => {
    if (!authState.user || !authState.access_token) return;
    if (window.confirm("Do you want to delete this post")) {
      dispatch(deleteBlog(blog, authState.access_token));
    }
  };
  return (
    <div className="card mb-3" style={{ minWidth: "260px" }}>
      <div className="row g-0 p-2">
        <div
          className="col-md-4"
          style={{
            minHeight: "150px",
            maxHeight: "170px",
            overflow: "hidden",
          }}
        >
          {blog.thumbnail && (
            <>
              {typeof blog.thumbnail === "string" ? (
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.thumbnail}
                    className="w-100 h-100"
                    alt="thumbnail"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              ) : (
                <img
                  src={URL.createObjectURL(blog.thumbnail)}
                  className="w-100 h-100"
                  alt="thumbnail"
                  style={{ objectFit: "cover" }}
                />
              )}
            </>
          )}
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text">{blog.description}</p>
            {blog.title && (
              <div className="card-text d-flex justify-content-between align-items-center">
                {slug && (blog.user as IUser)._id === authState.user?._id && (
                  <div style={{ cursor: "pointer" }}>
                    <Link to={`/update_blog/${blog._id}`}>
                      <i className="fas fa-edit" />
                    </Link>
                    <i
                      className="fas fa-trash text-danger mx-3"
                      onClick={hdlDel}
                    ></i>
                  </div>
                )}

                <small className="text-muted">
                  {new Date(blog.createdAt).toLocaleString()}
                </small>
              </div>
            )}

            {/* <p className="card-text d-flex justify-content-between">
              <small>
                <Link to={`/update_blog/${blog._id}`}>Update</Link>
              </small>
              <small className="text-muted">
                {new Date(blog.createdAt).toLocaleString()}
              </small>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHoriz;
