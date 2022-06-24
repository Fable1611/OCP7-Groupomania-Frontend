import axios from "axios";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Update from "./components/Content/Update";
import Home from "./components/Layout/Home";
import Create from "./components/Content/Create";
import BlogDetails from "./components/Blog/BlogDetails";
import NotFound from "./components/Layout/NotFound";
import Layout from "./components/Layout/Layout";
import React, { useState, useEffect } from "react";

import AuthContext, { AuthProvider } from "./context/AuthProvider";

import RequireAuth from "./components/Auth/RequireAuth";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const myToken = localStorage.getItem("token");

  useEffect(() => {
    if (myToken) {
      axios({
        url: "http://localhost:5000/api/auth/authstatus",
        method: "POST",
        data: { token: myToken },
      })
        .then((res) => {
          const authStatusInfo = res.data;
          console.log(authStatusInfo);
          setUser(authStatusInfo);
          setLoading(false);
        })
        .catch((error) => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      console.log("Pas de Token");
      setLoading(false);
    }
  }, []);

  return (
    !isLoading && (
      <AuthContext.Provider
        value={{
          isAuthenticated: !!user,
          userInfo: user,
          setUserInfo: setUser,
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="create" element={<Create />} />
              <Route path="blogs/:id" element={<BlogDetails />} />
              <Route path="update" element={<Update />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    )
  );
}

export default App;
