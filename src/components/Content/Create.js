import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuthContext from "../../hooks/useAuthContext";

const Create = () => {
  const navigate = useNavigate();

  //Récupération du contexte et du stoken, stockage des données du contexte localement
  const token = localStorage.getItem("token");
  const appContext = useAuthContext();
  const userId = appContext.userInfo.userId;

  //States qui seront stockés dans un FORMDATA pour être envoyé à l'API et stockés dans la Base de Données
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  //Fonction d'envoi des données à l'API, création du Formdata et Post.Redirection vers la page Home si succès.
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("author", author);
    formData.append("IMAGE", file);
    formData.append("userId", userId);
    formData.append("alt", title);

    axios({
      url: "http://localhost:5000/api/blogs/",
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: formData,
    }).then((res) => {
      console.log(res);
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="create">
      <h1>Créez un nouveau post</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" id="my-form">
        <label>Votre Titre ✒ :</label>
        <input
          type="text"
          aria-label="titre"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
        <label>Votre Texte 📝 :</label>
        <textarea
          required
          value={body}
          aria-label="texte"
          onChange={(e) => setBody(e.target.value)}
          name="body"
        ></textarea>
        <label>Votre Nom d'Auteur 🦹‍♂️:</label>
        <textarea
          required
          aria-label="auteur"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          name="author"
        ></textarea>

        <label>Une belle image svp ! 🎉</label>
        <input
          type="file"
          aria-label="image"
          accept="image/png, image/jpeg"
          name="IMAGE"
          id="image"
          onChange={(e) => handleFile(e)}
        ></input>

        <button>🚀 C'est parti ! </button>
      </form>
    </div>
  );
};

export default Create;
