document.getElementById("generate").addEventListener("click", async () => {
    const formData = {
      title: document.getElementById("title").value,
      keywords: document.getElementById("keywords").value.split(","),
      background: document.getElementById("background").value,
      style: document.getElementById("style").value,
      wordCount: parseInt(document.getElementById("wordCount").value || "300"),
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
  
      const data = await response.json();
      document.getElementById("output").textContent = data.blog;
    } catch (error) {
      document.getElementById("output").textContent = "Error generating blog.";
      console.error(error);
    }
  });
  