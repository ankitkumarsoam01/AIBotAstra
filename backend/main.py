from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import openai
import asyncio

app = FastAPI()

# Allow CORS for frontend running on Render or localhost (adjust origin as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/upload-voice-sample/")
async def upload_voice_sample(file: UploadFile = File(...)):
    # Save the voice sample file for similarity search
    contents = await file.read()
    with open("voice_sample.webm", "wb") as f:
        f.write(contents)
    return {"message": "Voice sample saved"}

@app.post("/process-interviewer-audio/")
async def process_interviewer_audio(file: UploadFile = File(...)):
    # Here you would implement:
    # - Voice filtering using similarity search with saved voice sample
    # - Pause detection
    # - Sending filtered audio to LLM and getting response

    # For demonstration, we will transcribe the audio using OpenAI Whisper API
    # and then generate a response using OpenAI ChatCompletion API

    # Save uploaded audio temporarily
    audio_path = "interviewer_audio.webm"
    contents = await file.read()
    with open(audio_path, "wb") as f:
        f.write(contents)

    # Transcribe audio using OpenAI Whisper
    try:
        with open(audio_path, "rb") as audio_file:
            transcript = await asyncio.to_thread(
                lambda: openai.Audio.transcribe("whisper-1", audio_file)
            )
    except Exception as e:
        return {"error": f"Transcription failed: {str(e)}"}

    # Generate response from LLM based on transcript text
    try:
        chat_response = await asyncio.to_thread(
            lambda: openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an interviewer assistant."},
                    {"role": "user", "content": transcript["text"]},
                ],
            )
        )
        llm_text = chat_response.choices[0].message.content
    except Exception as e:
        return {"error": f"LLM call failed: {str(e)}"}

    # Import voice filtering function
    from backend.voice_filtering import filter_user_voice

    filtered_audio_path = "filtered_interviewer_audio.wav"

    # Filter out user's voice from conversation audio
    try:
        filter_user_voice(audio_path, "voice_sample.webm", filtered_audio_path)
    except Exception as e:
        return {"error": f"Voice filtering failed: {str(e)}"}

    # Transcribe filtered audio using OpenAI Whisper
    try:
        with open(filtered_audio_path, "rb") as audio_file:
            transcript = await asyncio.to_thread(
                lambda: openai.Audio.transcribe("whisper-1", audio_file)
            )
    except Exception as e:
        return {"error": f"Transcription failed: {str(e)}"}

    # Generate response from LLM based on transcript text
    try:
        chat_response = await asyncio.to_thread(
            lambda: openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an interviewer assistant."},
                    {"role": "user", "content": transcript["text"]},
                ],
            )
        )
        llm_text = chat_response.choices[0].message.content
    except Exception as e:
        return {"error": f"LLM call failed: {str(e)}"}

    # Clean up audio files
    try:
        os.remove(audio_path)
        os.remove(filtered_audio_path)
    except Exception:
        pass

    return {"llm_response": llm_text}

@app.post("/reset/")
async def reset():
    # Reset any stored context or files if needed
    import os
    if os.path.exists("voice_sample.webm"):
        os.remove("voice_sample.webm")
    return {"message": "Context reset"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
