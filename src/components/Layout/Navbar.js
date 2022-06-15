import { Link } from "react-router-dom";
import logo from "../../img/logowhite.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo de Groupomania" width="150px" />
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/create">Nouveau Post</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
