from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import pyttsx3

# Initialize the FastAPI app
app = FastAPI()

# Load the pre-trained AI models
summarizer = pipeline("summarization")  # Model for text summarization
translator = pipeline("translation_en_to_fr")  # Model for English to French translation

# Pydantic model for validating the request body
class TextRequest(BaseModel):
    """
    A request model that expects a text input from the user.

    Attributes:
    - text (str): The input text to be processed (either summarized, translated, or converted to speech).
    """
    text: str

# Endpoint to summarize the input text
@app.post("/summarize")
async def summarize_text(request: TextRequest):
    """
    Endpoint to summarize the input text.

    Args:
    - request (TextRequest): The input text to be summarized.

    Returns:
    - dict: A dictionary containing the summarized text.
    """
    try:
        # Summarize the input text using the summarizer model
        summary = summarizer(request.text, max_length=50, min_length=20, do_sample=False)
        return {"summary": summary[0]['summary_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to translate the input text to French
@app.post("/translate")
async def translate_text(request: TextRequest):
    """
    Endpoint to translate the input text from English to French.

    Args:
    - request (TextRequest): The input text to be translated.

    Returns:
    - dict: A dictionary containing the translated text.
    """
    try:
        # Translate the input text using the translation model
        translated = translator(request.text)
        return {"translated": translated[0]['translation_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to convert the input text to speech
@app.post("/text-to-speech")
async def text_to_speech(request: TextRequest):
    """
    Endpoint to convert the input text to speech.

    Args:
    - request (TextRequest): The input text to be spoken.

    Returns:
    - dict: A dictionary indicating that the text has been spoken successfully.
    """
    try:
        # Initialize the text-to-speech engine
        engine = pyttsx3.init()
        # Convert the input text to speech
        engine.say(request.text)
        engine.runAndWait()
        return {"message": "Text spoken successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

