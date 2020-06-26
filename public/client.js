document.getElementById("btn").addEventListener("click", async () => {
    let message = document.getElementById("website").value;
    
    const data = {message}

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch("/wiki", options);
    const json = await response.json();
    
    document.getElementById("paragraph").textContent = json;

    document.getElementById("website").value = "";
})