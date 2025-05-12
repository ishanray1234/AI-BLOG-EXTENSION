import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogTabs from "../components/BlogTabs";
import BlogList from "../components/BlogList";
import BlogInputForm from "../components/BlogInputForm";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

function HomePage({ setformData }) {
    const [blogs, setBlogs] = useState([]);
    const [selectedTag, setSelectedTag] = useState("All");
    const [search, setSearch] = useState("");

    // const [input, setInput] = useState("");
    const navigate = useNavigate();

    const CATEGORIES = [
        "CurrentAffairs", "Education", "Music", "Philosophy", "PoliticalScience",
        "Science", "History", "Law", "Games", "Books", "FoodandDrink", "DataSource",
        "WebTech", "Economics", "Medicine"
    ];

    // const handleSubmit = () => {
    //     setTitle(input);
    //     navigate("/blog");
    // };


    useEffect(() => {
        fetch("/data.csv")
            .then((res) => res.text())
            .then((text) => {
                Papa.parse(text, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const sliced = result.data.slice(0, 50);
                        setBlogs(sliced);
                    },
                });
            });
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        const matchesTag =
            selectedTag === "All" || blog[selectedTag] === "1" || blog[selectedTag] === "TRUE";
        const matchesSearch =
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.text.toLowerCase().includes(search.toLowerCase());
        return matchesTag && matchesSearch;
    });

    return (
        <div>
            <Navbar search={search} setSearch={setSearch} />
            <BlogInputForm setformData={(formData) => {
                setformData(formData);
                console.log("formData:");
                console.log(formData);
                navigate("/blog", { state: formData });
            }} />
            
            <BlogTabs tags={CATEGORIES} selected={selectedTag} setSelected={setSelectedTag} />
            <BlogList blogs={filteredBlogs} />
        </div>
    );
}

export default HomePage;
