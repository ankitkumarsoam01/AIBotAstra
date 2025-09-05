import numpy as np
import librosa
import os

def load_audio(file_path, sr=16000):
    audio, _ = librosa.load(file_path, sr=sr)
    return audio

def extract_mfcc(audio, sr=16000, n_mfcc=13):
    mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=n_mfcc)
    return mfcc

def cosine_similarity(a, b):
    a_flat = a.flatten()
    b_flat = b.flatten()
    return np.dot(a_flat, b_flat) / (np.linalg.norm(a_flat) * np.linalg.norm(b_flat))

def is_user_voice(segment_mfcc, user_mfcc, threshold=0.8):
    similarity = cosine_similarity(segment_mfcc, user_mfcc)
    return similarity > threshold

def filter_user_voice(conversation_audio_path, user_sample_path, output_path):
    sr = 16000
    conversation_audio = load_audio(conversation_audio_path, sr)
    user_audio = load_audio(user_sample_path, sr)

    user_mfcc = extract_mfcc(user_audio, sr)

    # Split conversation audio into 1-second segments
    segment_length = sr  # 1 second
    filtered_audio = []

    for start in range(0, len(conversation_audio), segment_length):
        end = min(start + segment_length, len(conversation_audio))
        segment = conversation_audio[start:end]
        segment_mfcc = extract_mfcc(segment, sr)

        if not is_user_voice(segment_mfcc, user_mfcc):
            filtered_audio.extend(segment)

    filtered_audio = np.array(filtered_audio)

    # Save filtered audio
    import soundfile as sf
    sf.write(output_path, filtered_audio, sr)
