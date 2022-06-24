import { Link, useNavigate } from "react-router-dom";

import logo from "../../img/logowhite.png";

import useAuthContext from "../../hooks/useAuthContext";

const Navbar = () => {
  const appContext = useAuthContext();
  const navigate = useNavigate();

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
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <button className="logout" onClick={logout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
