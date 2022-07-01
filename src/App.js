import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Importation des composants de l'application
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Update from "./components/Content/Update";
import Home from "./components/Layout/Home";
import Create from "./components/Content/Create";
import BlogDetails from "./components/Blog/BlogDetails";
import NotFound from "./components/Layout/NotFound";
import Layout from "./components/Layout/Layout";

// Importation des du contexte pour l'authentification/autorisation
import AuthContext, { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/Auth/RequireAuth";

function App() {
  //Importation du token dans le local storage pour faire des appels à l'API
  const myToken = localStorage.getItem("token");

  //Creation des states qui vont permettre de contrôler l'asynchrone de la fonction et de valider si un User est connecté pour afficher le contenu approprié
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //S'il y a un token dans le local storage, alors un appel a l'API sera fait pour le valider, et si c'est le cas, le state de USER et LOADING seront MAJ
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

  //Si le state de Loading est false, le reste de l'application peut être rendered
  return (
    !isLoading && (
      //Valeurs de base du context provider qui seront utilisées dans toute l'application
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
