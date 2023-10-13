import React from "react";
import { ALERT } from "../../redux/types/alertType";
import { useDispatch } from "react-redux";
interface IProps {
  title: string;
  body: string | string[];
  bgColor: string;
}
const Toast = ({ title, body, bgColor }: IProps) => {
  const dispatch = useDispatch();
  const hdlClose = () => {
    dispatch({ type: "ALERT", payload: {} });
  };
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ top: "5px", right: "5px", zIndex: 50, minWidth: "200px" }}
    >
      <div className="toast-header">
     
        <strong className="me-auto">{title}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={hdlClose}
        ></button>
      </div>
      <div className="toast-body">
        {typeof body === "string" ? (
          body
        ) : (
          <ul>
            {body.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Toast;
