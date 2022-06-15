import Navbar from "./components/Layout/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Update from "./components/Update/Update";
import Home from "./components/Layout/Home";
import Create from "./components/Create/Create";
import BlogDetails from "./components/Blog/BlogDetails";
import NotFound from "./components/Layout/NotFound";
import Layout from "./components/Layout/Layout";

import RequireAuth from "./components/Auth/RequireAuth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="blogs/:id" element={<BlogDetails />} />
            <Route path="update" element={<Update />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
