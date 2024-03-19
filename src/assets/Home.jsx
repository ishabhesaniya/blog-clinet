// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import BlogDetails from './BlogDetails';
// import { useNavigate } from 'react-router-dom';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('userData');
  //   navigate('/');
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
       <div class="content">
        <h1>Blog</h1>
        <h1>Blog</h1>
        
       </div>
      {/* <button onClick={handleLogout} className='btn'>Logout</button> */}
      {selectedBlog ? (
        <BlogDetails blog={selectedBlog} />
      ) : (
        <div className="blog-container">
          {blogs.map(blog => (
            <div className="blog-card" key={blog._id} onClick={() => handleBlogClick(blog)}>
              {blog.image && <img src={blog.image} alt={blog.title} />}
              <h2>{blog.title}</h2>
              <p className='des'>{blog.description.slice(0,50)}</p>
              <p className='con'>{blog.content.slice(0,50)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
