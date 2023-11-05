import PropTypes from "prop-types";
import { useEffect, useCallback, useRef, useState } from "react";

import "./CustomToast.css";

import { useDispatch } from "react-redux";
import { REMOVE_TOASTS } from "../../redux/types/toastType";

const CustomToast = (props: any) => {
  const { toastList, position, autoDelete, autoDeleteTime = 2000 } = props;
  const [list, setList] = useState(toastList);
  const listData: any = useRef([]);
  const dispatch = useDispatch();

  //   use useCallback function in useEffect for performance
  const deleteToast = useCallback(() => {
    listData.current = [...list];
    listData.current.splice(0, 1);
    setList([...listData.current]);
    if (!listData.current.length) {
      list.length = 0;
      dispatch({ type: REMOVE_TOASTS, payload: {} });
    }
  }, [list, dispatch]);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const tick = () => {
      deleteToast();
    };

    if (autoDelete && toastList.length && list.length) {
      const interval = setInterval(tick, autoDeleteTime);
      return () => clearInterval(interval);
    }
  }, [toastList, autoDelete, autoDeleteTime, list, deleteToast]);


  console.log(list);
  
  return (
    <div className={`toast-notification-container ${position}`}>
      {list.map((toast: any) => (
        <div
          data-testid="toast-notification"
          // key={Utils.generateString(10)}
          className={`toast-notification custom-toast ${position}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button className="cancel-button" onClick={() => deleteToast()}>
            X
          </button>
          <div
            className={`toast-notification-image ${
              toast?.description?.length <= 73 ? "toast-icon" : ""
            }`}
          >
            <img src={toast.icon} alt="" />
          </div>
          <div
            className={`toast-notification-message ${
              toast?.description?.length <= 73 ? "toast-message" : ""
            }`}
          >
            {typeof toast.description === "string" ? (
              toast.description
            ) : (
              <ul>
                {toast?.description?.map((text: string, index: number) => (
                  <li style={{ listStyleType: "none" }} key={index}>
                    {text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

CustomToast.propTypes = {
  toastList: PropTypes.array,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number,
};

export default CustomToast;
