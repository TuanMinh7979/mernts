import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import Alert from "./components/alert/Alert";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Alert></Alert>
        <Header></Header>
        <Routes>
          <Route path="/" element={<PageRender />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:slug" element={<PageRender />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
