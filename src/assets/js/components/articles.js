const articles = document.querySelectorAll(".articles-box__item");
const articlesBox = document.querySelector(".articles-box");

if (articles.length > 0 && window.innerWidth > 920) {
  const ctrlArt = new ScrollMagic.Controller();

  let artBoxHeight = articlesBox.clientHeight;
  let artHeight = parseInt(window.getComputedStyle(articles[0]).height);
  let artVisible = artBoxHeight / artHeight - 1;

  let artAnimation = TweenMax.to(".articles-box__content", 1, {
    transform: `translateY(${
      (articles.length - artVisible) * artHeight * -1
    }px)`,
    ease: Linear.easeNone,
  });

  let warp = new ScrollMagic.Scene({
    triggerElement: ".articles__intro",
    triggerHook: "onLeave",
    duration: "120%",
    offset: -20,
  })
    .setPin(".articles__intro")
    .setTween(artAnimation)
    .addTo(ctrlArt);
}
