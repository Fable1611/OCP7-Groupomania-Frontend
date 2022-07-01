import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Désolé</h2>
      <p>Cette page n'existe pas !</p>
      <Link to="/">Retour vers Home 🏡...</Link>
    </div>
  );
};

export default NotFound;
