import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import { Alert } from "./components/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/alert/Loading";
import { refreshToken } from "./redux/actions/authAction";
import { getCates } from "./redux/actions/categoryAction";
import { getHomeBlogs } from "./redux/actions/blogAction";
import { io } from "socket.io-client";
import SocketClient from "./SocketClient";
import CountDown from "./components/countdown/CountDown";
import CustomToast from "./components/alert/CustomToast";
import { RootStore } from "./TypeScript";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //thay vi luu vao store ta se dispatch moi lan ung dung reload
    dispatch(getCates());
    dispatch(getHomeBlogs());
    dispatch(refreshToken());
  }, []);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_API_BASE_URL}`);
    dispatch({ type: "SOCKET", payload: socket });
    return () => {
      socket.close();
    };
  }, []);
  const {  toastState } = useSelector((state: RootStore) => state);
  return (
    <>
      <Alert></Alert>

      {toastState && toastState.length > 0 && (
        <CustomToast
          position="top-right"
          toastList={toastState}
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
