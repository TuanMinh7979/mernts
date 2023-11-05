import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";

import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/alert/Loading";

import { io } from "socket.io-client";
import SocketClient from "./SocketClient";

import CustomToast from "./components/alert/CustomToast";
import { RootStore } from "./TypeScript";
import { showError, showSpinner, stopSpinner } from "./utils/Utils";
import { getAPI } from "./utils/FetchData";
import { GET_CATES } from "./redux/types/categoryType";
import { GET_HOME_BLOGS } from "./redux/types/blogType";
import { AUTH } from "./redux/types/authType";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchInit() {
      try {
        showSpinner(dispatch);
        const res = await getAPI("category");

        dispatch({ type: GET_CATES, payload: res.data.categories });
        const res1 = await getAPI("home/blogs");
        dispatch({ type: GET_HOME_BLOGS, payload: res1.data });
        const logged = localStorage.getItem("logged");
        //if not logged return

        if (logged) {
          const res2 = await getAPI("refresh_token");
          dispatch({ type: AUTH, payload: res2.data });
        }
        //if login get new token

        stopSpinner(dispatch);
      } catch (err: any) {
        showError(err, dispatch);
        stopSpinner(dispatch);
      }
    }
    //thay vi luu vao store ta se dispatch moi lan ung dung reload
    fetchInit();
  }, []);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_API_BASE_URL}`);
    dispatch({ type: "SOCKET", payload: socket });
    return () => {
      socket.close();
    };
  }, []);
  const { toastState } = useSelector((state: RootStore) => state);
  return (
    <>
      {toastState.loading && !toastState.showSpinner && <Loading />}
      {toastState && toastState.toasts && toastState.toasts.length > 0 && (
        <CustomToast
          position="top-right"
          toastList={toastState.toasts}
          autoDelete={true}
        />
      )}
      <SocketClient></SocketClient>

      <div className="container">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<PageRender />} />
            <Route path="/:page" element={<PageRender />} />
            <Route path="/:page/:slug" element={<PageRender />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </div>

      {/* <CountDown></CountDown> */}
    </>
  );
}

export default App;
