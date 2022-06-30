import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthContext from "../../hooks/useAuthContext";

import axios from "axios";

const Create = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const appContext = useAuthContext();
  const userId = appContext.userInfo.userId;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("author", author);
    formData.append("IMAGE", file);
    formData.append("userId", userId);

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
      <h2>Créez un nouveau post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" id="my-form">
        <label>Votre Titre ✒ :</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
        <label>Votre Texte 📝 :</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name="body"
        ></textarea>
        <label>Votre Nom d'Auteur 🦹‍♂️:</label>
        <textarea
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          name="author"
        ></textarea>

        <label>Une belle image svp ! 🎉</label>
        <input
          type="file"
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
