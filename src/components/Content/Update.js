import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import axios from "axios";

const Update = () => {
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setAuthor(localStorage.getItem("author"));
    setBody(localStorage.getItem("body"));
    setTitle(localStorage.getItem("title"));
  }, []);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    console.log(id);
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("id", id);
    formData.append("body", body);
    formData.append("author", author);
    formData.append("IMAGE", file);

    axios({
      url: "http://localhost:5000/api/blogs/" + id,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      data: formData,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="create">
      <h2>Modifiez cet article, si vous l'osez :</h2>
      <form onSubmit={handleUpdate} encType="multipart/form-data" id="my-form">
        <label>Votre Nouveau Titre :</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
        <label>Votre Nouveau Texte :</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name="body"
        ></textarea>
        <label>Vous changez de nom ?</label>
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

export default Update;
