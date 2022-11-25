import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { App } from "./components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, PostProvider } from "./providers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
    <ToastContainer theme="dark" />
  </React.StrictMode>
);
