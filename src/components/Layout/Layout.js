import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="content">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
