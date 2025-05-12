import React from "react";
import "../styles/BlogList.css";

function BlogList({ blogs }) {
    return (
        <div className="blog-list">
            {blogs.map((b, i) => (
                <div className="blog-card" key={i}>
                    <h3>{b.title}</h3>
                    <p><strong>Author:</strong> {b.author}</p>
                    <p><strong>Date:</strong> {b.date}</p>
                    <p>{b.text.substring(0, 200)}...</p>
                    <p><strong>Words:</strong> {b.wordcount} | <strong>Comments:</strong> {b["comment.count"]}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogList;