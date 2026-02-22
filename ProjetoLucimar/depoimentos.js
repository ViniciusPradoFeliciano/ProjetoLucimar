/* ============================= */
/* PLYR INIT */
/* ============================= */

const players = Array.from(document.querySelectorAll('.plyr-video')).map(video => {
  const player = new Plyr(video, {
    volume: 0.3, // 🔥 volume inicial 30%
    controls: [
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'fullscreen'
    ]
  });

  // Força volume 30% mesmo se navegador tiver salvo outro
  player.volume = 0.3;

  return player;
});

/* ============================= */
/* SLIDER */
/* ============================= */

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

let current = 0;
let autoSlide;

/* ============================= */
/* AUTO SLIDE */
/* ============================= */

function startAutoSlide() {
  autoSlide = setInterval(() => {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }, 6000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

/* ============================= */
/* CRIAR DOTS */
/* ============================= */

slides.forEach((_, index) => {
  const dot = document.createElement("button");

  if (index === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    showSlide(index);
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots button");

/* ============================= */
/* TROCAR SLIDE */
/* ============================= */

function showSlide(index) {

  // 🔥 Pausa e reseta todos os vídeos
  players.forEach(player => {
    player.pause();
    player.currentTime = 0;
  });

  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  current = index;
}

/* ============================= */
/* EVENTOS DO VÍDEO */
/* ============================= */

players.forEach(player => {

  player.on('play', () => {
    stopAutoSlide(); // 🔥 Para auto-slide ao dar play
  });

  player.on('pause', () => {
    startAutoSlide(); // volta ao pausar
  });

  player.on('ended', () => {
    startAutoSlide(); // volta ao terminar
  });

});

/* ============================= */
/* INICIAR */
/* ============================= */

startAutoSlide();