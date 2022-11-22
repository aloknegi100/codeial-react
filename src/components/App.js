import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login, Signup, Settings, UserProfile } from "../pages";
import { Loader, Navbar } from "./";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const auth = useAuth();
  const { Component } = props;
  const Navigate = useNavigate();
  useEffect(() => {
    if (!auth.user) {
      Navigate("/login");
    }
  });
  return <Component />;
}

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route
            path="/settings"
            element={<ProtectedRoute Component={Settings} />}
          ></Route>
          <Route
            path="/user/:userId"
            element={<ProtectedRoute Component={UserProfile} />}
          ></Route>
          <Route path="*" element={<h1>Not found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
