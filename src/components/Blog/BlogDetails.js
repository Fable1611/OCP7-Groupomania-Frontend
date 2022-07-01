import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";

//Compostant qui détaille toutes les informations du Blog et permet de le modifier ou de le supprimer

const BlogDetails = () => {
  const navigate = useNavigate();

  //stockage du token pour envoyer des headers dans la requete
  const token = localStorage.getItem("token");

  // recuperation du contexte pour les differentes requetes
  const appContext = useAuthContext();
  const userIdLoggedIn = appContext.userInfo.userId;
  const userRole = appContext.userInfo.roles;

  //recuperation des params pour le ID du fetcg
  const { id } = useParams();

  //les states de la page qui sont utilises dans les differentes fonctions et pour le rendering
  const [likeValue, setLikeValue] = useState();
  const [rights, setRights] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [blogData, setBlogData] = useState();

  //Fetch qui va chercher les donnes du blog pour la page
  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/blogs/" + id,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((data) => {
      setBlogData(data.data);
      console.log(data.data);
      setLikeValue(data.data.likes);
      setIsLiked(CheckIsLiked(data.data));
      setRights(CheckRights(data.data));
    });
  }, []);

  //Function retourne une valeur booleene pour savoir si l'utilisateur a deja like, ou non, ce blog
  const CheckIsLiked = (blogList) => {
    const likesTable = blogList.userLiked;

    if (likesTable.includes(userIdLoggedIn)) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  };

  //Function retourne une valeur booleene pour savoir si l'utilisateur a les droits de modifier ou supprimer ce blog car il est admin ou il l'a ecrit
  const CheckRights = (blogList) => {
    const userIdAPI = blogList.userId;

    if (userIdAPI === userIdLoggedIn || userRole == 1945) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  };

  //Fonction pour liker les blogs
  const handleLike = () => {
    //apiValue va envoyer 0 ou 1 pour la gestion des likes, cette valeur sera utilisée dans le Backend
    let apiValue;

    if (isLiked === false) {
      const likes = likeValue + 1;
      setLikeValue(likes);
      setIsLiked(true);
      apiValue = 1;
    } else {
      setIsLiked(false);
      const likes = likeValue - 1;
      setLikeValue(likes);
      apiValue = 0;
    }

    axios({
      url: "http://localhost:5000/api/blogs/like",
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: { userId: userIdLoggedIn, blogId: id, likeValue: apiValue },
    });
  };

  //Fonction pour stocker les elements dans le local storage afin de les updater
  const setData = (blog) => {
    let { _id, title, body, author } = blog;
    localStorage.setItem("id", _id);
    localStorage.setItem("title", title);
    localStorage.setItem("body", body);
    localStorage.setItem("author", author);
  };

  //Fonction pour supprimer des articles de la BDD
  const handleDelete = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/blogs/" + id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      console.log("Article supprime!");
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="blog-details">
      {blogData && (
        <article>
          <h2>{blogData.title}</h2>
          <p>Écrit par {blogData.author}</p>
          <div>
            <button
              onClick={handleLike}
              style={{
                backgroundColor: isLiked ? "green" : "#FD2D01",
                color: isLiked ? "white" : "white",
              }}
            >
              Je Like 👍 {likeValue}
            </button>
          </div>
          <div>{blogData.body}</div>

          <div>
            <img className="image-container" src={blogData.imageUrl}></img>
          </div>
          <button
            className="blog-details"
            onClick={handleDelete}
            disabled={!rights}
          >
            Supprimer
          </button>
          <Link to="/update">
            <button
              className="blog-details"
              onClick={() => setData(blogData)}
              disabled={!rights}
            >
              Modifier
            </button>
          </Link>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
