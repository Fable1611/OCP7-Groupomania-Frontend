import { useState } from "react";
// import { useHistory } from "react-router-dom";

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();

  // Fonction de Validation Frontend du mot de passe
  function performValidation() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = { email, password };

    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) {
        throw Error("Could not post the data to the server");
      }
      // history.push("/login");
    });
  }

  return (
    <div className="create">
      <h2>Créez votre compte, c'est obligatoire 😇</h2>
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

        <button disabled={!performValidation()}>Je suis ton père! 🤐</button>
      </form>
    </div>
  );
}
