import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import { Alert } from "./components/alert/Alert";
import { useDispatch } from "react-redux";

import { refreshToken } from "./redux/actions/authAction";
import { getCates } from "./redux/actions/categoryAction";
import { getHomeBlogs } from "./redux/actions/blogAction";
import { io } from "socket.io-client";
import SocketClient from "./SocketClient";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //thay vi luu vao store ta se dispatch moi lan ung dung reload
    dispatch(getCates());
    dispatch(getHomeBlogs());
    dispatch(refreshToken());
  }, []);

  useEffect(() => {
    const socket = io();
    dispatch({ type: "SOCKET", payload: socket });
    return () => {
      socket.close();
    };
  }, [dispatch]);
  return (
    <>
      <Alert></Alert>
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
    </>
  );
}

export default App;
