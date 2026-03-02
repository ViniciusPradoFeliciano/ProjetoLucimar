document.addEventListener("DOMContentLoaded", function () {

  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".nivel-card");
  const dots = document.querySelectorAll(".dot");

  let currentNivel = 0;

  function updateNivel() {
    track.style.transform = `translateX(-${currentNivel * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentNivel].classList.add("active");
  }

  window.nextNivel = function () {
    currentNivel = (currentNivel + 1) % cards.length;
    updateNivel();
  };

  window.prevNivel = function () {
    currentNivel = (currentNivel - 1 + cards.length) % cards.length;
    updateNivel();
  };

  window.goToNivel = function (index) {
    currentNivel = index;
    updateNivel();
  };

});
