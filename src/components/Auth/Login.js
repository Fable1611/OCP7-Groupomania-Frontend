import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import axios from "../../api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

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
      const accessToken = response?.data?.token;
      const role = response.data.role;
      const userId = response.data.userId;

      setAuth({ email, accessToken, role });
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", userId);

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
