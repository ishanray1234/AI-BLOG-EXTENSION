import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BlogOutput.css";

function BlogOutput({ formData }) {
  const [blog, setBlog] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if formData is available
    console.log("formData in BlogOutput:", formData);
    if (!formData?.title) {
      navigate("/");
      return;
    }

    const fetchBlog = async () => {
      const res = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
    
      const data = await res.json();
      setBlog(data.blog);
    };

    fetchBlog();
  }, [formData, navigate]);

  return (
    <div className="blog-output-container">
      <h2 className="blog-output-heading">Generated Blog</h2>
      {blog ? (
        <pre className="blog-output-text">{blog}</pre>
      ) : (
        <p className="blog-loading-text">Generating blog content...</p>
      )}
    </div>
  );
}

export default BlogOutput;
