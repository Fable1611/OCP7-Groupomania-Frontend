import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

//Utilisation d'un outlet pour render les composants enfants de ce dernier. La Navbar est rendered à ce niveau-là pour être présente par défaut
const Layout = () => {
  return (
    <div className="content">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
