import react from "react";
import { Link } from "react-router-dom";

const BlogEmpty = () => {
  return (
    <div>
      <h2>Quoi ? Il personne ne poste ? 😫</h2>
      <p>
        La direction vous rappelle qu'il est obligatoire de poster une fois par
        semaine sur ce magnifique réseau social d'entreprise ! 🛑😎
      </p>
      <Link to="/create">Je suis un bon employé et je poste...</Link>
    </div>
  );
};

export default BlogEmpty;
