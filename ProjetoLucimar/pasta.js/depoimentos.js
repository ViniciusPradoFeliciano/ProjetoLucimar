document.addEventListener("DOMContentLoaded", function () {

  let depoimentoIndex = 0;

  const track = document.querySelector(".depoimentos-track");
  const items = document.querySelectorAll(".depoimento-item");
  const btnNext = document.getElementById("nextDepo");
  const btnPrev = document.getElementById("prevDepo");

  // pega todos os players Plyr
  const players = Plyr.setup('.plyr-video');

  function resetAllVideos() {
  players.forEach(player => {
    player.pause();
    player.currentTime = 0; // volta para o início
  });
}

  function updateCarousel() {
    track.style.transform = `translateX(-${depoimentoIndex * 100}%)`;
  }

  btnNext.addEventListener("click", function () {
    resetAllVideos();
    depoimentoIndex++;
    if (depoimentoIndex >= items.length) {
      depoimentoIndex = 0;
    }
    updateCarousel();
  });

  btnPrev.addEventListener("click", function () {
    resetAllVideos();
    depoimentoIndex--;
    if (depoimentoIndex < 0) {
      depoimentoIndex = items.length - 1;
    }
    updateCarousel();
  });


 let startX = 0;
let endX = 0;
let isSwiping = false;

track.addEventListener("touchstart", function (e) {
  // evita swipe se tocar no player
  if (e.target.closest('.plyr')) return;

  startX = e.touches[0].clientX;
  isSwiping = true;
});

track.addEventListener("touchmove", function (e) {
  if (!isSwiping) return;
  endX = e.touches[0].clientX;
});

track.addEventListener("touchend", function () {
  if (!isSwiping) return;

  let diff = startX - endX;

  if (Math.abs(diff) > 50) {
    resetAllVideos();

    if (diff > 0) {
      // esquerda
      depoimentoIndex++;
      if (depoimentoIndex >= items.length) {
        depoimentoIndex = 0;
      }
    } else {
      // direita
      depoimentoIndex--;
      if (depoimentoIndex < 0) {
        depoimentoIndex = items.length - 1;
      }
    }

    updateCarousel();
  }

  // reset
  startX = 0;
  endX = 0;
  isSwiping = false;
});
});