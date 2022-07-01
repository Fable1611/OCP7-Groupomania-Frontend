import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logowhite.png";
import useAuthContext from "../../hooks/useAuthContext";

const Navbar = () => {
  //importation du contexte
  const appContext = useAuthContext();
  const isAuthenticated = appContext.isAuthenticated;

  const navigate = useNavigate();

  // Fonction de Logout qui permet de reset le state de USER avec la valeur null, et nettoyer le local storage et de renvoyer l'utilisateur vers la page Login
  const logout = async () => {
    appContext.setUserInfo(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo de Groupomania" width="150px" />
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Nouveau Post</Link>

        <Link to="/signup">Signup</Link>
        <Link
          to="/login"
          id="login"
          className={isAuthenticated ? "hide" : "login"}
        >
          Login
        </Link>
        <button
          className={isAuthenticated ? "logout" : "hide"}
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
