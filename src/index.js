import React from "react";
import ReactDOM from "react-dom";
import AuthContext, { AuthProvider } from "./context/AuthProvider";
import "./index.css";
import App from "./App";
import { Helmet } from "react-helmet";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="Site des employés de Groupomania!"
      ></meta>
      <title>Groupomania Social Network</title>
    </Helmet>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
