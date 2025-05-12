import React, { useState } from "react";
import "../styles/BlogInputForm.css";
// import { useNavigate } from "react-router-dom";

function BlogInputForm({ setformData }) {
    const [title, setTitle] = useState("");
    const [keywords, setKeywords] = useState("");
    const [background, setBackground] = useState("");
    const [style, setStyle] = useState("");
    const [wordCount, setWordCount] = useState(3000);

    // const navigate = useNavigate();
    const handleSubmit = () => {
        const data = {
            title,
            keywords: keywords.split(",").map(k => k.trim()),
            background,
            style,
            wordCount,
        };
        console.log("data:");
        console.log(data);
        setformData(data);
        // navigate("/blog");
    };

    return (
        <div className="blog-input-container">
            <h1 className="blog-input-heading">Blog Post Generator</h1>
            <p className="blog-input-subtext">
                Instantly create SEO-friendly blog posts with just a few keywords.
            </p>

            <div className="blog-form-card">
                <label className="blog-label">Blog Post Generator</label>
                <label className="blog-label_normal">The generated article is human-like, well-researched, long-form, and free from search engine penalties.</label>
                <label className="blog-label">Topic</label>
                <input
                    className="blog-input"
                    type="text"
                    placeholder="   Eg: Best AI Tools For Blogging"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className="blog-label">Keywords</label>
                <label className="blog-label_normal">The more keywords(comma separated) you provide, the better the article will be.</label>
                <input 
                    className="blog-input"
                    placeholder="   Type and separate keywords with commas" 
                    value={keywords} 
                    onChange={e => setKeywords(e.target.value)} />
                <label className="blog-label">Background Information</label>
                <label className="blog-label_normal">Our AI will search the web to retrieve the latest information if left empty.</label>
                <input 
                    className="blog-input"
                    placeholder="   Any information such as pricing, features, etc." 
                    value={background} 
                    onChange={e => setBackground(e.target.value)} />
                <label className="blog-label">Writing Style</label>
                <input 
                    className="blog-input"
                    placeholder="   Eg: Professional, Casual, etc." 
                    value={style} 
                    onChange={e => setStyle(e.target.value)} />
                <label className="blog-label">Word Count</label>
                <input 
                    className="blog-input"
                    type="number" 
                    placeholder="   Word Count" 
                    value={wordCount} 
                    onChange={e => setWordCount(Number(e.target.value))} />
                <button className="blog-button" onClick={handleSubmit}>
                    Generate Blog
                </button>
            </div>
            <div className="footer">
                <p className="footer-text">SCROLL DOWN FOR SAMPLE BLOGS</p>
            </div>
        </div>
    );
}

export default BlogInputForm;
