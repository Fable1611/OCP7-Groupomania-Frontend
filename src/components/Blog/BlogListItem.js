import react from "react";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { GrLike } from "react-icons/gr";

const BlogListItem = ({ blog }) => {
  return (
    <div className="blog-preview">
      <Link to={`/blogs/${blog._id}`}>
        <h2>{blog.title}</h2>
        <h2>
          <IconContext.Provider value={{ className: "AiLike" }}>
            <button>
              {blog.likes} <GrLike />
            </button>
          </IconContext.Provider>
        </h2>
        <p> Écrit par : {blog.author}</p>
      </Link>
    </div>
  );
};

export default BlogListItem;
