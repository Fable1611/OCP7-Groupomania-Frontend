import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import logo from "../../img/logowhite.png";

const Navbar = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async () => {
    setAuth({});
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
