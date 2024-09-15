// motion direction

const DirectionReveal = function ({
  selector: selector = ".direction-reveal",
  itemSelector: itemSelector = ".direction-reveal__card",
  animationName: animationName = "swing",
  animationPostfixEnter: animationPostfixEnter = "enter",
  animationPostfixLeave: animationPostfixLeave = "leave",
  enableTouch: enableTouch = true,
  touchThreshold: touchThreshold = 250,
} = {}) {
  const containers = document.querySelectorAll(selector);
  let touchStart;

  const addEventListenerMulti = function (element, events, fn) {
    events.forEach((e) => element.addEventListener(e, fn));
  };

  const switchCase = (cases) => (defaultCase) => (key) =>
    key in cases ? cases[key] : defaultCase;

  const fireEvent = (item, eventName, eventDetail) => {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: eventDetail,
    });

    item.dispatchEvent(event);
  };

  const getDirection = function (e, item) {
    let w = item.offsetWidth;
    let h = item.offsetHeight;
    let position = getPosition(item);

    let x = (e.pageX - position.x - w / 2) * (w > h ? h / w : 1);
    let y = (e.pageY - position.y - h / 2) * (h > w ? w / h : 1);

    let d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

    return d;
  };

  const getPosition = function (el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
      xPos += el.offsetLeft + el.clientLeft;
      yPos += el.offsetTop + el.clientTop;

      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos,
    };
  };

  const translateDirection = switchCase({
    0: "top",
    1: "right",
    2: "bottom",
    3: "left",
  })("top");

  const updateDirection = function (e, action) {
    let currentItem = e.currentTarget;
    let direction = getDirection(e, currentItem);
    let directionString = translateDirection(direction);

    let currentCssClasses = currentItem.className.split(" ");
    let filteredCssClasses = currentCssClasses
      .filter((cssClass) => !cssClass.startsWith(animationName))
      .join(" ");
    currentItem.className = filteredCssClasses;
    currentItem.classList.add(`${animationName}--${action}-${directionString}`);

    let eventDetail = { action: action, direction: directionString };
    fireEvent(currentItem, "directionChange", eventDetail);
  };

  const bindEvents = function (containerItem) {
    const items = containerItem.querySelectorAll(itemSelector);

    items.forEach((item) => {
      addEventListenerMulti(item, ["mouseenter", "focus"], (e) => {
        updateDirection(e, animationPostfixEnter);
      });

      addEventListenerMulti(item, ["mouseleave", "blur"], (e) => {
        updateDirection(e, animationPostfixLeave);
      });

      if (enableTouch) {
        item.addEventListener(
          "touchstart",
          (e) => {
            touchStart = +new Date();
          },
          { passive: true }
        );

        item.addEventListener("touchend", (e) => {
          let touchTime = +new Date() - touchStart;

          if (
            touchTime < touchThreshold &&
            !item.className.includes(
              `${animationName}--${animationPostfixEnter}`
            )
          ) {
            e.preventDefault();

            resetVisible(e, items, updateDirection(e, animationPostfixEnter));
          }
        });
      }
    });
  };

  const resetVisible = function (e, items, callback) {
    items.forEach((item) => {
      let currentCssClasses = item.className;

      if (
        currentCssClasses.includes(
          `${animationName}--${animationPostfixEnter}`
        ) &&
        item !== e.currentTarget
      ) {
        item.className = currentCssClasses.replace(
          `${animationName}--${animationPostfixEnter}`,
          `${animationName}--${animationPostfixLeave}`
        );
      }
    });

    callback;
  };

  const init = function () {
    if (containers.length) {
      containers.forEach((containerItem) => {
        bindEvents(containerItem);
      });
    } else {
      return;
    }
  };

  if (document.documentElement.clientWidth > 920) {
    init();
  }
};

const directionRevealIntro = DirectionReveal({
  selector: ".direction-reveal--slide",
  animationName: "slide",
});
const directionRevealServ = DirectionReveal({
  selector: ".direction-reveal--serv",
  animationName: "slide",
});
