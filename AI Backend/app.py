from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import pyttsx3

app = FastAPI()

# Load AI models
summarizer = pipeline("summarization")
translator = pipeline("translation_en_to_fr")  # Translates English to French

# Request model
class TextRequest(BaseModel):
    text: str

@app.post("/summarize")
async def summarize_text(request: TextRequest):
    summary = summarizer(request.text, max_length=50, min_length=20, do_sample=False)
    return {"summary": summary[0]['summary_text']}

@app.post("/translate")
async def translate_text(request: TextRequest):
    translated = translator(request.text)
    return {"translated": translated[0]['translation_text']}

@app.post("/text-to-speech")
async def text_to_speech(request: TextRequest):
    engine = pyttsx3.init()
    engine.say(request.text)
    engine.runAndWait()
    return {"message": "Text spoken successfully"}

