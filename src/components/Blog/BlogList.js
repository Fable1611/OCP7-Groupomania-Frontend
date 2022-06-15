import { Link } from "react-router-dom";
import BlogListItem from "./BlogListItem";

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
