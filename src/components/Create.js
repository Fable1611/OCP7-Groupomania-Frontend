import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    fetch("http://localhost:5000/api/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then((res) => {
      console.log(res);
      history.push("/home");
    });
  };

  return (
    <div className="create">
      <h2>Créez un nouveau post</h2>
      <form onSubmit={handleSubmit}>
        <label>Votre Titre ✒ :</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Votre Texte 📝 :</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Votre Image 🖼 :</label>
        <textarea
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></textarea>

        <button>🚀 C'est parti ! </button>
      </form>
    </div>
  );
};

export default Create;
