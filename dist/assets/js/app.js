"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".header");
  var scrollPrev = 0; // window.addEventListener("scroll", () => {
  //     let scrolled = document.documentElement.scrollTop;
  //
  //     if (scrolled > 50 && scrolled > scrollPrev) {
  //         header.classList.add("out");
  //     } else {
  //         header.classList.remove("out");
  //     }
  //
  //     if (scrolled <= 20) {
  //         header.classList.add("top");
  //     } else {
  //         header.classList.remove("top");
  //     }
  //
  //     scrollPrev = scrolled;
  // });
  // const hmBtn = document.querySelector(".hamburger-menu");
  // const menu = document.querySelector(".menu");
  // const menuCloseBtn = document.querySelector(".menu__close-btn");
  //
  // hmBtn.addEventListener("click", function () {
  //     this.classList.add("active");
  //     menu.classList.add("active");
  // });
  //
  // menuCloseBtn.addEventListener("click", () => {
  //     menu.classList.remove("active");
  //     hmBtn.classList.remove("active");
  // });

  var portf_items = document.querySelectorAll(".portfolio__item");
  var portf_inner = document.querySelector(".portfolio__inner");

  if (portf_items) {
    portf_inner.addEventListener("mouseover", function () {
      portf_inner.classList.add("hover");
    });
    portf_inner.addEventListener("mouseleave", function () {
      portf_inner.classList.remove("hover");
    });
    portf_items.forEach(function (el) {
      el.addEventListener("mouseover", function () {
        el.classList.add("hover");
      });
      el.addEventListener("mouseleave", function () {
        el.classList.remove("hover");
      });
    });
  }

  var serviceAccTitle = document.querySelectorAll(".services-item__acc-title");
  var serviceAccText = document.querySelectorAll(".services-item__acc-descr");

  if (serviceAccTitle) {
    serviceAccTitle.forEach(function (title, index) {
      title.addEventListener("click", function () {
        var isActive = title.classList.contains("active");
        serviceAccTitle.forEach(function (el) {
          return el.classList.remove("active");
        });
        serviceAccText.forEach(function (el) {
          return el.style.maxHeight = null;
        });

        if (!isActive) {
          title.classList.add("active");
          serviceAccText[index].style.maxHeight = serviceAccText[index].scrollHeight + "px";
        }
      });
    });
  }
});