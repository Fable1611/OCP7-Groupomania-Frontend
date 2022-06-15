import BlogList from "../Blog/BlogList";
import useFetch from "../../hooks/useFetch";
const Home = () => {
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("http://localhost:5000/api/blogs/");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
