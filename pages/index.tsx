import React, { useState, useEffect, useRef } from 'react';

const USERNAME = 'admin';
const PASSWORD = 'Ankit@123';

type LoginProps = {
  onLoginSuccess: () => void;
};

const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        <button type="submit" style={{ padding: '8px 16px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [llmResponse, setLlmResponse] = useState('');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [voiceSample, setVoiceSample] = useState<Blob | null>(null);
  const [sampling, setSampling] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);

  // Start recording voice sample on first login
  useEffect(() => {
    if (loggedIn && !voiceSample && !sampling) {
      setSampling(true);
      alert('Please record a short voice sample by pressing OK and speaking for 5 seconds.');
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];
        recorder.ondataavailable = e => {
          audioChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setVoiceSample(audioBlob);
          setSampling(false);
          stream.getTracks().forEach(track => track.stop());
          alert('Voice sample recorded and saved.');
        };
        recorder.start();
        setTimeout(() => {
          recorder.stop();
        }, 5000);
      });
    }
  }, [loggedIn, voiceSample, sampling]);

  // Start or stop recording conversation and process audio in chunks with pause detection
  const toggleRecording = () => {
    if (recording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setRecording(false);
      clearInterval(pauseCheckInterval.current);
      pauseCheckInterval.current = null;
    } else {
      // Start recording
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];
        recorder.ondataavailable = e => {
          audioChunksRef.current.push(e.data);
          // Process audio chunk immediately for real-time behavior
          processAudioChunk(e.data);
        };
        recorder.onstop = () => {
          // Process any remaining audio chunks
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            processInterviewerAudio(audioBlob);
            audioChunksRef.current = [];
          }
          stream.getTracks().forEach(track => track.stop());
        };
        recorder.start();

        // Start interval to check for 3-second pause
        pauseCheckInterval.current = setInterval(() => {
          if (Date.now() - lastAudioChunkTime.current > 3000 && audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            processInterviewerAudio(audioBlob);
            audioChunksRef.current = [];
          }
        }, 1000);

        setRecording(true);
      });
    }
  };

  // Track last audio chunk time for pause detection
  const lastAudioChunkTime = React.useRef(Date.now());
  const pauseCheckInterval = React.useRef<NodeJS.Timeout | null>(null);

  // Process audio chunk and update last audio chunk time
  const processAudioChunk = (chunk: Blob) => {
    lastAudioChunkTime.current = Date.now();
    // You can implement filtering here if needed before sending
    // For now, just accumulate chunks and send on pause
  };

  // Function to send voice sample to backend
  const uploadVoiceSample = async (sample: Blob) => {
    const formData = new FormData();
    formData.append('file', sample, 'voice_sample.webm');
    try {
      const res = await fetch('https://aibotastra-backend.onrender.com/upload-voice-sample/', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Failed to upload voice sample');
      }
      alert('Voice sample uploaded to backend.');
    } catch (error) {
      alert('Error uploading voice sample: ' + error.message);
    }
  };

  // Send voice sample to backend when recorded
  useEffect(() => {
    if (voiceSample) {
      uploadVoiceSample(voiceSample);
    }
  }, [voiceSample]);

  // Function to send interviewer audio to backend and get LLM response
  const processInterviewerAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'interviewer_audio.webm');
    try {
      const res = await fetch('https://aibotastra-backend.onrender.com/process-interviewer-audio/', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Failed to process interviewer audio');
      }
      const data = await res.json();
      setConversationContext(prev => [...prev, data.llm_response]);
      setLlmResponse(data.llm_response);
    } catch (error) {
      alert('Error processing interviewer audio: ' + error.message);
    }
  };

  // Reset conversation context
  const resetConversation = () => {
    setConversationContext([]);
    setLlmResponse('');
  };

  if (!loggedIn) {
    return <LoginPage onLoginSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>LLM Conversation</h2>
      <textarea
        readOnly
        value={conversationContext.join('\n\n')}
        style={{ width: '100%', height: 200, padding: 10, fontSize: 16 }}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={toggleRecording} style={{ marginRight: 10, padding: '8px 16px' }}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button onClick={resetConversation} style={{ padding: '8px 16px' }}>
          Reset Conversation
        </button>
      </div>
    </div>
  );
};

export default HomePage;
