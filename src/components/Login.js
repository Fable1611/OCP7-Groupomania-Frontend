import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then((data) => {
    if (!data.ok) {
      throw Error("Could not post the data to the server");
    }
    return data.json();
  });
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [loginStatus, setLoginStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = await loginUser({ email, password });
    if (!credentials) {
      setLoginStatus(false);
      console.log("Pas de data !");
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
      console.log("Merci beaucoup user :" + credentials.userId);
      history.push("/home");
    }
  };

  return (
    <div className="create">
      <h2>Bienvenue sur votre forum d'entreprise</h2>
      <form onSubmit={handleSubmit}>
        <label>Votre email:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Votre Mot de Passe:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button className="mellon">Mellon! 🧙‍♂️</button>
      </form>
      <p>
        {" "}
        Pas encore de compte ?{" "}
        <Link to="/signup">C'est pourtant obligatoire.</Link>{" "}
      </p>
      {loginStatus && <button className="mellon">BRAVO!</button>}
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
