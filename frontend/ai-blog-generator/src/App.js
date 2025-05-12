import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogOutput from "./pages/BlogOutput";

function App() {
  const [formData, setformData] = React.useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setformData={setformData}/>} />
        {/* <Route path="/generate" element={<TitleInput setTitle={setTitle} />} /> */}
        <Route path="/blog" element={<BlogOutput formData={formData} />} />
      </Routes>
    </Router>
  );
}

export default App;
