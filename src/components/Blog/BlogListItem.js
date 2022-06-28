import react from "react";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";

const BlogListItem = ({ blog }) => {
  return (
    <div className="blog-preview">
      <Link to={`/blogs/${blog._id}`}>
        <h2>{blog.title}</h2>
        <h2>
          {blog.likes} <AiOutlineLike />
        </h2>
        <p> Écrit par {blog.author}</p>
      </Link>
    </div>
  );
};

export default BlogListItem;
