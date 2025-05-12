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
  { time: 0, text: "Você já parou para pensar como aquelas artes incríveis que você vê nos livros, revistas, pôsteres e até nos seus posts favoritos no Instagram surgiram?" },
  { time: 7, text: "Acredite, a produção gráfica tem uma história longa, cheia de reviravoltas e algumas ideias bem malucas ao longo do caminho." },
  { time: 14, text: "Imagina viver numa época em que cada livro tinha que ser escrito à mão, letra por letra." },
  { time: 19, text: "Pois é, era isso ou nada. Aí veio um alemão chamado Gutenberg e mudou o jogo com uma invenção que basicamente foi o 'Ctrl+C, Ctrl+V' da época: a prensa móvel." },
  { time: 29, text: "A partir daí, a comunicação visual nunca mais foi a mesma." },
  { time: 33, text: "Neste livro, vamos embarcar numa viagem desde os tempos das cavernas..." },
  { time: 39, text: "onde nossos ancestrais rabiscavam as primeiras formas de arte, até a era digital," },
  { time: 45, text: "onde você pode criar um design no seu celular e imprimir em qualquer coisa — de camisetas a capas de celular." },
  { time: 53, text: "Vamos falar de tintas, tipos, revoluções tecnológicas e até da ascensão da inteligência artificial na arte." },
  { time: 61, text: "Então, prepare-se para conhecer a história da produção gráfica como você nunca viu antes: sem aquele papo chato de sala de aula mas com muita curiosidade." }
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
    textBox.classList.add('fade-in');
    setTimeout(() => {
      textBox.classList.remove('fade-in');
    }, 2500);
    textBox.textContent = lines[currentLine].text;
    currentLine++;
  }
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

speedSelect.addEventListener('change', () => {
  audio.playbackRate = parseFloat(speedSelect.value);
  speedSelect.setAttribute('aria-label', `Velocidade: ${speedSelect.value}x`);
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}
