// DOM Elements
const speechTab = document.getElementById('speech-tab');
const textTab = document.getElementById('text-tab');
const speechSection = document.getElementById('speech-to-text');
const textSection = document.getElementById('text-to-speech');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const textOutput = document.getElementById('text-output');
const statusMessage = document.getElementById('status-message');
const ttsInput = document.getElementById('tts-input');
let recognition;
//updating year
document.getElementById('currentyear').textContent = new Date().getFullYear();
// Tab Navigation
speechTab.addEventListener('click', () => {
  activateTab(speechTab, textTab, speechSection, textSection);
});

textTab.addEventListener('click', () => {
  activateTab(textTab, speechTab, textSection, speechSection);
});

function activateTab(activeTab, inactiveTab, showSection, hideSection) {
  activeTab.classList.add('active');
  inactiveTab.classList.remove('active');
  showSection.classList.remove('hidden');
  hideSection.classList.add('hidden');
}

// Speech Recognition Setup
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
} else {
  statusMessage.textContent = 'Your browser does not support Speech Recognition.';
  startBtn.disabled = true;
}

// Start Listening
startBtn.addEventListener('click', () => {
  recognition.start();
  statusMessage.textContent = 'Listening... Speak now.';
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

recognition.onresult = (event) => {
  let transcript = Array.from(event.results)
    .map(result => result[0].transcript)
    .join('');
  textOutput.value = transcript;
};

recognition.onerror = (event) => {
  statusMessage.textContent = `Error: ${event.error}`;
};

recognition.onend = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

// Stop Listening
stopBtn.addEventListener('click', () => {
  recognition.stop();
  statusMessage.textContent = 'Stopped listening.';
});

// Text-to-Speech
document.getElementById('speak-btn').addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(ttsInput.value);
  speechSynthesis.speak(utterance);
});
