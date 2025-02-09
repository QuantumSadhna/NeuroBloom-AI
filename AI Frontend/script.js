// Base URL of the FastAPI server, change if hosted on a remote server
const API_BASE_URL = "http://127.0.0.1:8000";  // Change if running on a server

/**
 * Function to summarize the input text by calling the FastAPI summarize endpoint.
 */
async function summarizeText() {
    // Get the input text from the textarea element
    const text = document.getElementById("inputText").value;

    try {
        // Sending a POST request to the summarize endpoint
        const response = await fetch(`${API_BASE_URL}/summarize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })  // Send the text as JSON
        });

        // Parse the JSON response from the server
        const data = await response.json();

        // Display the summarized text in the result paragraph
        document.getElementById("result").innerText = data.summary;
    } catch (error) {
        console.error("Error summarizing text:", error);
    }
}

/**
 * Function to translate the input text by calling the FastAPI translate endpoint.
 */
async function translateText() {
    // Get the input text from the textarea element
    const text = document.getElementById("inputText").value;

    try {
        // Sending a POST request to the translate endpoint
        const response = await fetch(`${API_BASE_URL}/translate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })  // Send the text as JSON
        });

        // Parse the JSON response from the server
        const data = await response.json();

        // Display the translated text in the result paragraph
        document.getElementById("result").innerText = data.translated;
    } catch (error) {
        console.error("Error translating text:", error);
    }
}

/**
 * Function to convert the input text to speech by calling the FastAPI text-to-speech endpoint.
 */
async function textToSpeech() {
    // Get the input text from the textarea element
    const text = document.getElementById("inputText").value;

    try {
        // Sending a POST request to the text-to-speech endpoint
        await fetch(`${API_BASE_URL}/text-to-speech`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })  // Send the text as JSON
        });

        // Alert the user that the text has been spoken
        alert("Text spoken!");
    } catch (error) {
        console.error("Error converting text to speech:", error);
    }
}
