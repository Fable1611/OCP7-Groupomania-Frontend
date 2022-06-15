import { useState } from "react";
// import { useHistory } from "react-router-dom";

import axios from "axios";

const Create = () => {
  // const history = useHistory();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    console.log(e.target.files);
    console.log(e.target.value);
    setFile(e.target.files[0]);
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("author", author);
    formData.append("IMAGE", file);

    axios({
      url: "http://localhost:5000/api/blogs/",
      method: "POST",
      data: formData,
    }).then((res) => {
      console.log(res);
      // history.push("/home");
    });
  };

  return (
    <div className="create">
      <h2>Créez un nouveau post</h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data" id="my-form">
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
          value={imageUrl}
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
