const API_BASE_URL = "http://127.0.0.1:8000";  // Change if running on a server

async function summarizeText() {
    const text = document.getElementById("inputText").value;
    const response = await fetch(`${API_BASE_URL}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });
    const data = await response.json();
    document.getElementById("result").innerText = data.summary;
}

async function translateText() {
    const text = document.getElementById("inputText").value;
    const response = await fetch(`${API_BASE_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });
    const data = await response.json();
    document.getElementById("result").innerText = data.translated;
}

async function textToSpeech() {
    const text = document.getElementById("inputText").value;
    await fetch(`${API_BASE_URL}/text-to-speech`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });
    alert("Text spoken!");
}
