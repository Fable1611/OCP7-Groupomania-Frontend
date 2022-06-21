import { Link, useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();

  //Fonction pour recuperer des articles
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:5000/api/blogs/" + id);

  //Fonction pour stocker les elements dans le local storage afin de les updater
  const setData = (blog) => {
    let { _id, title, body, author } = blog;
    localStorage.setItem("id", _id);
    localStorage.setItem("title", title);
    localStorage.setItem("body", body);
    localStorage.setItem("author", author);
  };

  //Fonction pour supprimer des articles
  const handleDelete = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/blogs/" + id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      console.log("Article supprime!");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Écrit par {blog.author}</p>w<div>{blog.body}</div>
          <div>
            <AiOutlineLike />
            <p>{blog.likes}</p>
          </div>
          <div>
            <img className="image-container" src={blog.imageUrl}></img>
          </div>
          <button className="blog-details" onClick={handleDelete}>
            Supprimer
          </button>
          <Link to="/update">
            <button className="blog-details" onClick={() => setData(blog)}>
              Modifier
            </button>
          </Link>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
