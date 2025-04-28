const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const progressBar = document.getElementById('progress');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const textBox = document.getElementById('textContent');
const speedSelect = document.getElementById('speedSelect');
const showTranscriptBtn = document.getElementById('showTranscript');
const transcriptSection = document.getElementById('fullTranscript');

let lines = [
  { time: 0, text: "Pelo amor de Deus..." },
  { time: 1.7, text: "Não faz isso comigo não..." },
  { time: 3.5, text: "Não tira eu do grupo..." },
  { time: 5.5, text: "Não faz um grupo sem eu não..." },
  { time: 8.5, text: "(barulhos de choro)" },
  { time: 10.0, text: "Eu carrego..." },
  { time: 12.0, text: "(mais choro)" },
  { time: 13.5, text: "Eu amo esse grupo!" }
];

let currentLine = 0;

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
});

audio.addEventListener('loadedmetadata', () => {
  durationSpan.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeSpan.textContent = formatTime(audio.currentTime);

  if (currentLine < lines.length && audio.currentTime >= lines[currentLine].time) {
    textBox.textContent = lines[currentLine].text;
    currentLine++;
  }
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

speedSelect.addEventListener('change', () => {
  audio.playbackRate = parseFloat(speedSelect.value);
});

showTranscriptBtn.addEventListener('click', () => {
  const isHidden = transcriptSection.hasAttribute('hidden');
  if (isHidden) {
    transcriptSection.removeAttribute('hidden');
    showTranscriptBtn.setAttribute('aria-expanded', 'true');
    showTranscriptBtn.textContent = '📄 Ocultar transcrição';
  } else {
    transcriptSection.setAttribute('hidden', '');
    showTranscriptBtn.setAttribute('aria-expanded', 'false');
    showTranscriptBtn.textContent = '📄 Ver transcrição completa';
  }
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}