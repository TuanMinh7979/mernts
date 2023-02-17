import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="1059620408687-o2fo5lukgh82djer8i5ftui2vrd54fsj.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
