import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

export default function Signup(props) {
  const navigate = useNavigate();

  //Regex qui vont définir la difficulté du Mot de Passe et le contenu de l'Email, ces données sont aussi protégées dans le backend avec un middleware
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //useEffet qui gère l'apparition de messages d'erreur ou de succèes en fonction des states déclenchés. Si le focus de l'utilisateur n'est plus sur un champs, alors l'erreur disparait.
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);

    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  //Fonction pour poster le nouvel User à l'API, et naviguer vers la page de login.
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
      } else {
        console.log("Nouvel Utilisateur Enregistre");
        navigate("/login", { replace: true });
      }
    });
  }

  //Les states comme ValidEmail viennent déclancher l'apparition de messages d'erreur ainsi que certaines classes.
  return (
    <div className="create">
      <p ref={errRef}>{errMsg}</p>

      <h2>Créez votre compte, c'est obligatoire 😇</h2>
      <form id="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Votre email: <FaCheck className={validEmail ? "valid" : "hide"} />
          <FaTimes className={validEmail || !email ? "hide" : "invalid"} />
        </label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          autoComplete="off"
          required
          value={email}
          onFocus={() => setEmailFocus(false)}
          onBlur={() => setEmailFocus(true)}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className={validEmail || !email ? "hide" : "invalid"}>
          <FaInfoCircle /> Veuillez rentrer un email valide 👮‍♂️
        </p>
        <label>
          Votre mot de passe:
          <FaCheck className={validPassword ? "valid" : "hide"} />
          <FaTimes
            className={validPassword || !password ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onFocus={() => setEmailFocus(false)}
          onBlur={() => setEmailFocus(true)}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <p className={validPassword || !password ? "hide" : "invalid"}>
          <FaInfoCircle /> Le mdp doit comporter : 6 characteres, 1 lettre
          majuscule et 1 chiffre 👮‍♂️
        </p>

        <button
          className={
            validPassword && validEmail ? "btn-signup" : "btn-signup-disabled"
          }
          disabled={!validEmail || !validPassword}
        >
          C'est parti ! 🤙
        </button>
      </form>
    </div>
  );
}
