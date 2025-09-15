document.querySelectorAll(".container").forEach(container => {
    let uploadCount = 0;

    const fileInput = container.querySelector(".fileInput");
    fileInput.addEventListener("change", function () {
    uploadCount += this.files.length; // add number of selected files

    if (uploadCount >= 6) {
        container.classList.add("filled");
        fileInput.disabled = true; // stop more uploads
    }
    });
});
document.querySelectorAll(".fileInput").forEach(input => {
  input.addEventListener("change", async function() {
    const formData = new FormData();
    for (let file of this.files) {
      formData.append("files", file);
    }

    // Send to backend
    const res = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    console.log("Uploaded:", data);
  });
});