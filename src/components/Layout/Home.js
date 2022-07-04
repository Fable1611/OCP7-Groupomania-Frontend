import BlogList from "../Blog/BlogList";
import useFetch from "../../hooks/useFetch";
const Home = () => {
  //Utilisation du Hook UseFetch pour récupérer les données et les déstructurer : le composant BlogList est appelé quand les données arrivent
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("http://localhost:5000/api/blogs/");

  return (
    <div className="home">
      <h1>Liste des Blogs</h1>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
