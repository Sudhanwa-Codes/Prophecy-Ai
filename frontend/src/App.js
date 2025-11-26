import React, { useState, useEffect } from 'react';
import './App.css';

// --- CONFIGURATION ---
const BASE_VOLUME = 0.3;
const CHAOS_VOLUME = 0.7;
const VOICE_DIM_VOLUME = 0.2;

// --- SCATTERED TEXT COMPONENT ---
const ScatteredText = ({ text, className = '' }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="scatter-char"
          style={{ 
            animationDelay: `${i * 0.02}s`,
            '--char-index': i 
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

// --- MUSIC CONTROL FUNCTIONS ---
const getBackgroundMusic = () => document.getElementById('bg-music');
const getMonitorFrame = () => document.querySelector('.monitor-frame');

const setMusicVolume = (volume) => {
  const music = getBackgroundMusic();
  if (music) {
    music.volume = volume;
  }
};

const controlMusicAmplify = () => {
  const music = getBackgroundMusic();
  if (music) {
    music.volume = CHAOS_VOLUME;
    if (music.paused) {
      music.play().catch(e => console.warn("Music play failed on amplify.", e));
    }
  }
};

const controlMusicStart = () => {
  const music = getBackgroundMusic();
  if (music && music.paused) {
    music.volume = BASE_VOLUME;
    music.play().catch(e => console.warn("Background music blocked by browser policy.", e));
  }
};

const controlMusicResume = () => {
  const music = getBackgroundMusic();
  if (music) {
    if (music.paused) {
      music.play().catch(e => console.warn("Music resumption failed (browser policy re-applied).", e));
    }
  }
};

// --- VOICE AND LAUGH FUNCTIONS ---
const speakResponse = (text, callback) => {
  setMusicVolume(VOICE_DIM_VOLUME);
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.6;
    utterance.pitch = 0.7;
    
    const voices = window.speechSynthesis.getVoices();
    const spookyVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('low') || voice.lang.startsWith('en-GB')
    );
    if (spookyVoice) {
      utterance.voice = spookyVoice;
    }
    
    utterance.onend = () => {
      if (callback) callback();
    };
    
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Web Speech API not supported.");
    if (callback) callback();
  }
};

const playSpookyLaugh = (callback) => {
  setMusicVolume(0);
  
  const monitorFrame = getMonitorFrame();
  if (monitorFrame) {
    monitorFrame.classList.add('screen-vibrate');
  }
  
  const skullGif = document.createElement('img');
  skullGif.src = '/laughing_skull.gif';
  skullGif.className = 'laughing-skull skull-appear';
  skullGif.alt = 'Laughing Skull';
  document.body.appendChild(skullGif);
  
  const audio = new Audio('/spooky_laugh.wav');
  audio.volume = 0.9;
  
  audio.onended = () => {
    if (monitorFrame) {
      monitorFrame.classList.remove('screen-vibrate');
    }
    
    if (skullGif) {
      skullGif.classList.remove('skull-appear');
      skullGif.classList.add('skull-disappear');
      
      skullGif.addEventListener('animationend', () => {
        if (skullGif.parentNode) {
          skullGif.parentNode.removeChild(skullGif);
        }
      }, { once: true });
    }
    
    setMusicVolume(BASE_VOLUME);
    if (callback) callback();
  };
  
  audio.play().catch(e => console.error("Could not play audio:", e));
};

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    controlMusicStart();
    
    const startMusicOnInteraction = () => {
      controlMusicStart();
      window.removeEventListener('click', startMusicOnInteraction);
      
      const input = document.getElementById('query-input');
      if (input) {
        input.addEventListener('focus', controlMusicStart, { once: true });
      }
    };
    
    window.addEventListener('click', startMusicOnInteraction);
    
    return () => {
      window.removeEventListener('click', startMusicOnInteraction);
    };
  }, []);

  const handleSeance = async () => {
    if (!query.trim()) return;

    controlMusicAmplify();
    setLoading(true);
    setResult(null);
    setError(null);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    try {
      const response = await fetch('http://localhost:5000/api/seance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_query: query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The nexus rejected the transmission.');
      }

      setResult(data);

      const resumeCallback = () => {
        controlMusicResume();
      };

      const laughCallback = () => {
        playSpookyLaugh(resumeCallback);
      };

      speakResponse(data.interpretation, laughCallback);
    } catch (err) {
      setError(err.message);
      setMusicVolume(BASE_VOLUME);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="monitor-frame">
      <div className={`App ${loading ? 'chaos-active' : ''}`}>
        <h1>
          <ScatteredText text="KIRO-WEEN: The Gopher Séance" />
        </h1>
        
        <p>
          <ScatteredText text="Consult the Digital Medium. Ask your question and await a cipher from the forgotten net..." />
        </p>

        <div className="query-box">
          <textarea
            id="query-input"
            placeholder="Hark! What truth do you seek from the digital void?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSeance} disabled={loading}>
            <ScatteredText text={loading ? 'Processing...' : 'Summon Cipher'} />
          </button>
        </div>

        <div className="result-box">
          {loading && (
            <p className="output-text">
              <ScatteredText text="The spirits are restless! Awaiting the nexus..." />
            </p>
          )}
          
          {error && (
            <p className="output-text interpretation">
              <ScatteredText text={`ERROR: ${error}`} />
            </p>
          )}
          
          {result && (
            <div className="result-section">
              <h2>
                <ScatteredText text="Cipher Received (Gopher Archive Search Result)" />
              </h2>
              <p className="output-text">
                <ScatteredText text={result.cryptic_response} />
              </p>

              <h2>
                <ScatteredText text="Medium's Interpretation (Steered AI)" />
              </h2>
              <p className="output-text interpretation">
                <ScatteredText text={result.interpretation} />
              </p>
            </div>
          )}
        </div>

        <p style={{ fontSize: '0.8em', color: '#005517', marginTop: '10px' }}>
          <ScatteredText text="Project built using Kiro Spec-Driven Development (Resurrection Category)." />
        </p>
      </div>
    </div>
  );
}

export default App;
