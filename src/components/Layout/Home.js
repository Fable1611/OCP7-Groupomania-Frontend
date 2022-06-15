import BlogList from "../Blog/BlogList";
import useFetch from "../../hooks/useFetch";
import Navbar from "./Navbar";
// import BlogsEmpty from "../Blog/BlogsEmpty";
const Home = () => {
  const {
    error,
    isPending,
    // isEmpty,
    data: blogs,
  } = useFetch("http://localhost:5000/api/blogs/");

  return (
    <div className="home">
      {<Navbar />}
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
      {/* {isEmpty && <BlogsEmpty />} */}
    </div>
  );
};

export default Home;
