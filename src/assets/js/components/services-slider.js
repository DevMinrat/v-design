const servItemLine = document.querySelector(".services__line-img");
const servItems = document.querySelectorAll(".services__item");
const servSlider = document.querySelector(".services-slider");

if (servSlider && window.innerWidth > 920) {
  let rotateCount = 0;
  let rAF;
  let isServSliderActive = true;
  let currentSlide = 0;

  function isPartiallyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();

    let top = elementBoundary.top;
    let bottom = elementBoundary.bottom;
    let height = elementBoundary.height;

    return top + height >= 0 && height + window.innerHeight >= bottom;
  }

  window.addEventListener("scroll", () => {
    if (
      isPartiallyVisible(servSlider) &&
      isServSliderActive &&
      window.innerWidth > 920
    ) {
      autoRotateLine();
      isServSliderActive = false;
    }
  });

  function autoRotateLine() {
    setTimeout(() => {
      currentSlide += 1;
      rotLine();
      changeSlide(currentSlide);

      rAF = requestAnimationFrame(autoRotateLine);

      if (rotateCount > 314) {
        cancelAnimationFrame(rAF);
      }
    }, 2500);
  }

  function rotLine() {
    rotateCount += 45;
    servItemLine.style.transform = `rotate(${rotateCount}deg)`;
  }

  function changeSlide(i) {
    servItems.forEach((el) => {
      el.style.display = "none";
      el.classList.remove("active");
    });

    servItems[i].style.display = "flex";
    setTimeout(() => {
      servItems[i].classList.add("active");
    }, 50);
  }

  changeSlide(currentSlide);
}
