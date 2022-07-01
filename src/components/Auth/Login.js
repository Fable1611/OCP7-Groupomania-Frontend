import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

import axios from "../../api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const appContext = useAuthContext();

  //Données pour la navigation et la redirection
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  //Creation des states password et User qui vont correspondre au formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Appel à l'API avec les données du formulaire
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);

      //Création d'un objet USER qui sera composé des informations retournées par l'API
      const user = {};
      user.accessToken = response?.data?.token;
      user.role = response.data.role;
      user.userId = response.data.userId;
      appContext.setUserInfo(user);

      //Envoi du Token dans le local storage pour réutilisation ultérieure
      localStorage.setItem("token", user.accessToken);

      setEmail("");
      setPassword("");

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing credentials");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="create">
      <h2>Bienvenue sur votre forum d'entreprise</h2>
      <h3>Veuillez vous identifier</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Votre email:</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Votre Mot de Passe:</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button className="mellon">Alohomora! 🧙‍♂️</button>
      </form>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <p>
        {" "}
        Pas encore de compte ?{" "}
        <Link to="/signup">C'est pourtant obligatoire 🤓.</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
