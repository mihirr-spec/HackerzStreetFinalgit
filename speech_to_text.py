import speech_recognition as sr
import ollama
import pyttsx3
import os
import subprocess
import sys

# ------------ STEP 0: Check if Ollama & Mistral are available ------------
def is_ollama_running_and_model_ready(model_name="mistral"):
    try:
        result = subprocess.run(["ollama", "list"], capture_output=True, text=True)
        if result.returncode != 0:
            print("❌ Ollama is not running. Start it with 'ollama serve'.")
            return False
        if model_name not in result.stdout:
            print(f"⚠️ Model '{model_name}' is not downloaded. Download it using: ollama pull {model_name}")
            return False
        return True
    except FileNotFoundError:
        print("❌ 'ollama' command not found. Please install Ollama CLI.")
        return False

# ------------ STEP 1: Convert Speech to Text ------------
def transcribe_audio(file_path, language="en-IN"):
    if not os.path.exists(file_path):
        print(f"❌ Audio file not found: {file_path}")
        return None

    recognizer = sr.Recognizer()
    with sr.AudioFile(file_path) as source:
        print("🎙️ Listening to audio...")
        audio_data = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio_data, language=language)
        print("📝 Transcription:", text)
        return text
    except sr.UnknownValueError:
        print("❌ Could not understand the audio.")
    except sr.RequestError as e:
        print(f"⚠️ API error: {e}")
    return None

# ------------ STEP 2: Generate a Response using Ollama (Mistral) ------------
def chat_with_ollama(prompt, model="mistral"):
    if not is_ollama_running_and_model_ready(model):
        sys.exit(1)

    print("🧠 Thinking...")
    response = ollama.chat(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful and friendly doctor assistant. Respond in a human-like tone."},
            {"role": "user", "content": prompt}
        ]
    )
    answer = response['message']['content']
    print("💬 Ollama says:", answer)
    return answer

# ------------ STEP 3: Speak the Response (TTS) ------------
def speak_text(text, rate=150):
    print("🔊 Speaking...")
    engine = pyttsx3.init()
    engine.setProperty('rate', rate)

    # Optional: Choose a specific voice
    voices = engine.getProperty('voices')
    for voice in voices:
        if "english" in voice.name.lower() and "india" in voice.name.lower():
            engine.setProperty('voice', voice.id)
            break

    engine.say(text)
    engine.runAndWait()

# ------------ STEP 4: Full Flow ------------
if __name__ == "__main__":
    print("🚀 Starting voice-to-voice assistant...")

    input_text = transcribe_audio("audio/input.wav", language="en-IN")

    if input_text:
        response_text = chat_with_ollama(input_text)
        speak_text(response_text)
