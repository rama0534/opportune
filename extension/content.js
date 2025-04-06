(function () {
    const jobs = [];
  
    const listItems = document.querySelectorAll("ul.device-gray-100 > li.flex");
  
    listItems.forEach((li) => {
      const title = li.querySelector("h3")?.innerText.trim() || "Unknown Title";
      const companyLocation = li.querySelector("p")?.innerText.trim() || "Unknown Company";
      const date = li.querySelectorAll("div")[1]?.innerText.trim() || "Unknown Date";
  
      jobs.push({
        title,
        companyLocation,
        date,
      });
    });
  
    console.log("Extracted Jobs:", jobs);
  
    // Optional: Send to your Spring Boot backend
    fetch("http://localhost:8083/api/v1/info/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Jobs saved to backend:", data);
      })
      .catch((err) => {
        console.log("from error",JSON.stringify(jobs))
        console.error("Error saving jobs:", err);
      });
  })();
  