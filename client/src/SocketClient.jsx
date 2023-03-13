import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IComment } from "./TypeScript";
import { RootStore } from "./TypeScript";
import {
  CREATE_COMMENT,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLYCOMMENT,
  DELETE_COMMENT,
  DELETE_REPLY,
} from "./redux/types/commentType";
const SocketClient = () => {
  const { socketState } = useSelector((state) => state);
  const dispatch = useDispatch();

  //Create Comment
  useEffect(() => {
    if (!socketState) return;
    socketState.on("createComment", (data) => {
      dispatch({
        type: CREATE_COMMENT,
        payload: data,
      });
    });

    return () => {
      socketState.off("createComment");
    };
  }, [socketState, dispatch]);
  //reply comment
  useEffect(() => {
    if (!socketState) return;
    socketState.on("replyComment", (data) => {
      dispatch({
        type: REPLY_COMMENT,
        payload: data,
      });
    });

    return () => {
      socketState.off("replyComment");
    };
  }, [socketState, dispatch]);
  //update comment
  useEffect(() => {
    if (!socketState) return;
    socketState.on("updateComment", (data) => {
      dispatch({
        type: data.comment_root ? UPDATE_REPLYCOMMENT : UPDATE_COMMENT,
        payload: data,
      });
    });

    return () => {
      socketState.off("updateComment");
    };
  }, [socketState, dispatch]);
  //delete comment
  useEffect(() => {
    if (!socketState) return;
    socketState.on("deleteComment", (data) => {
      dispatch({
        type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
        payload: data,
      });
    });

    return () => {
      socketState.off("deleteComment");
    };
  }, [socketState, dispatch]);
  return <div>SocketClient</div>;
};

export default SocketClient;
