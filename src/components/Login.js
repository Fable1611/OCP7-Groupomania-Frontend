import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // Fonction de Validation Frontend du mot de passe
  function performValidation() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = { email, password };

    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not post the data to the server");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

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

        <button id="mellon" disabled={!performValidation()}>
          Mellon! 🧙‍♂️
        </button>
      </form>
      <p>
        {" "}
        Pas encore de compte ?{" "}
        <Link to="/signup">C'est pourtant obligatoire.</Link>{" "}
      </p>
    </div>
  );
}
