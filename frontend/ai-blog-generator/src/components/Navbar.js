import React from "react";
import "../styles/Navbar.css";

function Navbar({ search, setSearch }) {
    return (
        <div className="navbar">
            <div className="brand">AI Blog Generator</div>
            <input
                className="search-bar"
                placeholder="Search AI blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

export default Navbar;