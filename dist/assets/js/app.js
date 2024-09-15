"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".header");
  var scrollPrev = 0;
  window.addEventListener("scroll", function () {
    var scrolled = document.documentElement.scrollTop;

    if (scrolled > 50 && scrolled > scrollPrev) {
      header.classList.add("out");
    } else {
      header.classList.remove("out");
    }

    if (scrolled <= 20) {
      header.classList.add("top");
    } else {
      header.classList.remove("top");
    }

    scrollPrev = scrolled;
  });
  var hmBtn = document.querySelector(".hamburger-menu");
  var menu = document.querySelector(".menu");
  var menuCloseBtn = document.querySelector(".menu__close-btn");
  hmBtn.addEventListener("click", function () {
    this.classList.add("active");
    menu.classList.add("active");
  });
  menuCloseBtn.addEventListener("click", function () {
    menu.classList.remove("active");
    hmBtn.classList.remove("active");
  }); // services

  var allServTrigger = document.querySelectorAll("[data-all-serv]");
  var allServModal = document.querySelector(".services__all");
  var allServClose = document.querySelector(".services-all__close-btn");

  if (allServModal) {
    allServTrigger.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        allServModal.classList.add("opened");
      });
    });
    allServClose.addEventListener("click", function (e) {
      e.preventDefault();
      allServModal.classList.remove("opened");
    });
  } // compare items


  var compItems = document.querySelectorAll(".compare__item-inner");
  compItems.forEach(function (el) {
    el.addEventListener("click", function () {
      el.classList.toggle("rotaded");
    });
  }); // faq item accordion

  var faqAccTitle = document.querySelectorAll(".faq__item-title"),
      faqAccText = document.querySelectorAll(".faq__item-descr");

  if (faqAccTitle) {
    var _loop = function _loop(i) {
      faqAccText[0].style.maxHeight = faqAccText[0].scrollHeight + "px";
      faqAccTitle[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = faqAccText[i];

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    };

    for (var i = 0; i < faqAccTitle.length; i++) {
      _loop(i);
    }
  } // cleaning process videos modal


  var cleanVideoInner = document.querySelector(".cleaning-proc__inner");
  var cleanVideoModal = document.querySelector(".cleaning-proc__video-modal");
  var cleanVideoIframe = document.querySelector(".cleaning-proc__video-iframe");
  var cleanVideoClose = document.querySelector(".cp-video__close-btn");
  var cleanVideoLoader = document.querySelector(".cp-video__loader");

  if (cleanVideoInner) {
    cleanVideoInner.addEventListener("click", function (e) {
      var target = e.target;

      if (target && target.classList.contains("cp__video")) {
        var video = target.dataset.video;
        document.body.style.overflow = "hidden";
        cleanVideoLoader.style.display = "block";
        cleanVideoIframe.classList.remove("loaded");
        cleanVideoIframe.src = video;
        cleanVideoModal.classList.remove("hide");
      }

      cleanVideoIframe.addEventListener("load", function () {
        cleanVideoIframe.classList.add("loaded");
        cleanVideoLoader.style.display = "none";
      });
    });
    cleanVideoClose.addEventListener("click", function () {
      cleanVideoModal.classList.add("hide");
      document.body.style.overflow = "";
      cleanVideoIframe.src = "";
    });
  } // order modal


  var modalReviewTrigger = document.querySelectorAll("[data-review]"),
      reviewModal = document.querySelector(".review-modal"),
      reviewCloseBtn = document.querySelector(".review-modal__closeBtn[data-close]");

  if (modalReviewTrigger.length > 0) {
    var openReviewModal = function openReviewModal() {
      reviewModal.classList.add("show");
      reviewModal.classList.remove("hide");
      document.body.style.overflow = "hidden";
    };

    var closeReviewModal = function closeReviewModal() {
      reviewModal.classList.remove("show");
      reviewModal.classList.add("hide");
      document.body.style.overflow = "";
    };

    modalReviewTrigger.forEach(function (e) {
      e.addEventListener("click", openReviewModal);
    });
    reviewCloseBtn.addEventListener("click", closeReviewModal);
  } /// modal-success


  var modalSuccessCloseBtn = document.querySelector(".modal-success__closeBtn[data-close]"),
      modalSuccessModal = document.querySelector(".modal-success");

  if (modalSuccessCloseBtn) {
    var closeModalSuccessModal = function closeModalSuccessModal() {
      modalSuccessModal.classList.remove("show");
      modalSuccessModal.classList.add("hide");
      document.body.style.overflow = "";
    };

    modalSuccessCloseBtn.addEventListener("click", closeModalSuccessModal);
  } // cleaning with addl services calculator


  var squareRadios = document.querySelectorAll(".ic-content__square");
  var squareCustom = document.querySelector(".ic-content__square-custom");
  var addlServices = document.querySelectorAll(".ic-content__select-wrapper");
  var addlContainer = document.querySelector(".ic-content__addl");
  var addlAddBtn = document.querySelector(".ic-content__add-service");

  if (squareCustom) {
    var setSquare = function setSquare(square, price) {
      var squareNumBox = document.querySelector(".order-item__num");
      squareNumBox.innerHTML = "".concat(square, " \u043C<sup>2</sup>");
      var squarePriceBox = document.querySelector(".order-item__price-square");
      squarePriceBox.innerText = "".concat(price, " \u0440\u0443\u0431");
      setTotalPrice();
    };

    var addAddlItem = function addAddlItem() {
      var orderItem = document.createElement("div");
      orderItem.classList.add("ic-content__order-item", "ic-content__order-item--addl");
      orderItem.innerHTML = "\n      <p class=\"order-item__name\"></p>\n      <p class=\"order-item__price\"></p>";
      document.querySelector(".ic-content__order-list").append(orderItem);
    };

    var setAddlInfo = function setAddlInfo(elem, idx) {
      var addlItem = document.querySelectorAll(".ic-content__order-item--addl")[idx];
      addlItem.querySelector(".order-item__name").innerText = elem.value;
      addlItem.querySelector(".order-item__price").innerText = elem.options[elem.selectedIndex].dataset.price + " руб";
      setTotalPrice();
    };

    var deleteAddlItem = function deleteAddlItem(idx) {
      var addlItem = document.querySelectorAll(".ic-content__order-item--addl")[idx];
      addlItem.remove();
      setTotalPrice();
    };

    var setTotalPrice = function setTotalPrice() {
      var totalContainer = document.querySelector(".ic-content__total-num");
      var prices = document.querySelectorAll(".order-item__price");
      var totalSum = 0;
      prices.forEach(function (el) {
        if (el.innerText) {
          totalSum += parseFloat(el.innerText);
        }
      });
      totalContainer.innerText = "\u2248 ".concat(totalSum, " \u0420\u0423\u0411");
    };

    squareCustom.addEventListener("input", function () {
      this.value = this.value.replace(/D/g, "");

      if (this.value.length > 0) {
        this.classList.add("active");
        squareRadios.forEach(function (el) {
          return el.checked = false;
        });
        var price = this.value * 40;
        setSquare(this.value, price);
      } else {
        this.classList.remove("active");
        squareRadios[1].checked = true;
        setTotalPrice();
      }
    });
    squareRadios.forEach(function (el) {
      el.addEventListener("click", function () {
        squareCustom.value = "";
        squareCustom.classList.remove("active");
        setSquare(el.value, el.dataset.price);
      });

      if (el.checked) {
        setSquare(el.value, el.dataset.price);
      }
    });
    addlContainer.addEventListener("click", function (e) {
      var target = e.target;

      if (target && target.classList.contains("ic-content__delete")) {
        var p = e.target.parentElement;
        addlServices = document.querySelectorAll(".ic-content__select-wrapper");
        var par = Array.from(addlServices);
        var idx = par.indexOf(p);
        target.parentElement.remove();
        deleteAddlItem(idx);
      }

      if (target && target.classList.contains("ic-content__select")) {
        var addlSelects = document.querySelectorAll(".ic-content__select");
        addlSelects.forEach(function (el, idx) {
          el.addEventListener("change", function (e) {
            setAddlInfo(el, idx);
          });
        });
      }
    });
    addlAddBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var newAddl = document.createElement("div");
      newAddl.classList.add("ic-content__select-wrapper");
      newAddl.innerHTML = addlServices[0].innerHTML;
      addlContainer.append(newAddl);
      addAddlItem();
    });
  } // how cleaning tabs


  var howBtns = document.querySelectorAll(".clean-how__nav-btn");
  var howTabs = document.querySelectorAll(".clean-how__tab");
  var howAllBtn = document.querySelectorAll(".clean-how__btn-all");
  var howAllModal = document.querySelector(".clean-how__all");
  var howModalClose = document.querySelector(".ch-all__close-btn");

  if (howAllBtn.length > 0) {
    var openTab = function openTab(evt) {
      var slidename = evt.currentTarget.dataset.slide;
      howTabs.forEach(function (el) {
        el.style.display = "none";
      });
      howBtns.forEach(function (el) {
        el.classList.remove("active");
      });
      document.getElementById(slidename).style.display = "block";
      evt.currentTarget.classList.add("active");
    };

    howBtns.forEach(function (el) {
      el.addEventListener("click", openTab);
    });
    howBtns[0].click();
    howAllBtn.forEach(function (el) {
      el.addEventListener("click", function () {
        howAllModal.classList.add("active");
      });
    });
    howModalClose.addEventListener("click", function () {
      howAllModal.classList.remove("active");
    });
  }

  var furnPriceBtns = document.querySelectorAll(".price-section__tabs-btn");
  var furnPriceTabs = document.querySelectorAll(".price-slider-furn");

  if (furnPriceBtns.length > 0) {
    var openFurnTab = function openFurnTab(evt) {
      var tabName = evt.currentTarget.dataset.slide;
      furnPriceTabs.forEach(function (el) {
        el.style.display = "none";
      });
      furnPriceBtns.forEach(function (el) {
        el.classList.remove("active");
      });
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.classList.add("active");
    };

    furnPriceBtns.forEach(function (el) {
      el.addEventListener("click", openFurnTab);
    });
    furnPriceBtns[0].click();
  }
});