import React from "react";
import "../styles/BlogTabs.css";

function BlogTabs({ tags, selected, setSelected }) {
  return (
    <div className="tabs">
      <div
        className={`tab ${selected === "All" ? "active" : ""}`}
        onClick={() => setSelected("All")}
      >
        All
      </div>
      {
        tags.map((tag) => (
          <div
            key={tag}
            className={`tab ${selected === tag ? "active" : ""}`}
            onClick={() => setSelected(tag)
            }
          >
            {tag}
          </div >
        ))}
    </div >
  );
}

export default BlogTabs;