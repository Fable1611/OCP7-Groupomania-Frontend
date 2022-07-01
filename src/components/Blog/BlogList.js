import { Link } from "react-router-dom";
import BlogListItem from "./BlogListItem";

//Composant Parent qui appelle ses enfants
const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogListItem blog={blog} key={blog._id} />
      ))}
    </div>
  );
};

export default BlogList;
