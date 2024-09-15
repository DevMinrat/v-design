document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  let scrollPrev = 0;

  window.addEventListener("scroll", () => {
    let scrolled = document.documentElement.scrollTop;

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

  const hmBtn = document.querySelector(".hamburger-menu");
  const menu = document.querySelector(".menu");
  const menuCloseBtn = document.querySelector(".menu__close-btn");

  hmBtn.addEventListener("click", function () {
    this.classList.add("active");
    menu.classList.add("active");
  });

  menuCloseBtn.addEventListener("click", () => {
    menu.classList.remove("active");
    hmBtn.classList.remove("active");
  });

  // services

  const allServTrigger = document.querySelectorAll("[data-all-serv]");
  const allServModal = document.querySelector(".services__all");
  const allServClose = document.querySelector(".services-all__close-btn");

  if (allServModal) {
    allServTrigger.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        allServModal.classList.add("opened");
      });
    });
    allServClose.addEventListener("click", (e) => {
      e.preventDefault();
      allServModal.classList.remove("opened");
    });
  }

  // compare items

  const compItems = document.querySelectorAll(".compare__item-inner");

  compItems.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("rotaded");
    });
  });

  // faq item accordion

  const faqAccTitle = document.querySelectorAll(".faq__item-title"),
    faqAccText = document.querySelectorAll(".faq__item-descr");

  if (faqAccTitle) {
    for (let i = 0; i < faqAccTitle.length; i++) {
      faqAccText[0].style.maxHeight = faqAccText[0].scrollHeight + "px";

      faqAccTitle[i].addEventListener("click", function () {
        this.classList.toggle("active");

        let panel = faqAccText[i];

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  // cleaning process videos modal

  const cleanVideoInner = document.querySelector(".cleaning-proc__inner");
  const cleanVideoModal = document.querySelector(".cleaning-proc__video-modal");
  const cleanVideoIframe = document.querySelector(
    ".cleaning-proc__video-iframe"
  );
  const cleanVideoClose = document.querySelector(".cp-video__close-btn");
  const cleanVideoLoader = document.querySelector(".cp-video__loader");

  if (cleanVideoInner) {
    cleanVideoInner.addEventListener("click", (e) => {
      let target = e.target;

      if (target && target.classList.contains("cp__video")) {
        let video = target.dataset.video;

        document.body.style.overflow = "hidden";

        cleanVideoLoader.style.display = "block";
        cleanVideoIframe.classList.remove("loaded");
        cleanVideoIframe.src = video;
        cleanVideoModal.classList.remove("hide");
      }

      cleanVideoIframe.addEventListener("load", () => {
        cleanVideoIframe.classList.add("loaded");
        cleanVideoLoader.style.display = "none";
      });
    });

    cleanVideoClose.addEventListener("click", () => {
      cleanVideoModal.classList.add("hide");
      document.body.style.overflow = "";
      cleanVideoIframe.src = "";
    });
  }

  // order modal

  const modalReviewTrigger = document.querySelectorAll("[data-review]"),
    reviewModal = document.querySelector(".review-modal"),
    reviewCloseBtn = document.querySelector(
      ".review-modal__closeBtn[data-close]"
    );

  if (modalReviewTrigger.length > 0) {
    function openReviewModal() {
      reviewModal.classList.add("show");
      reviewModal.classList.remove("hide");
      document.body.style.overflow = "hidden";
    }

    function closeReviewModal() {
      reviewModal.classList.remove("show");
      reviewModal.classList.add("hide");
      document.body.style.overflow = "";
    }

    modalReviewTrigger.forEach(function (e) {
      e.addEventListener("click", openReviewModal);
    });
    reviewCloseBtn.addEventListener("click", closeReviewModal);
  }

  /// modal-success

  const modalSuccessCloseBtn = document.querySelector(
      ".modal-success__closeBtn[data-close]"
    ),
    modalSuccessModal = document.querySelector(".modal-success");

  if (modalSuccessCloseBtn) {
    function closeModalSuccessModal() {
      modalSuccessModal.classList.remove("show");
      modalSuccessModal.classList.add("hide");
      document.body.style.overflow = "";
    }

    modalSuccessCloseBtn.addEventListener("click", closeModalSuccessModal);
  }

  // cleaning with addl services calculator

  const squareRadios = document.querySelectorAll(".ic-content__square");
  const squareCustom = document.querySelector(".ic-content__square-custom");
  let addlServices = document.querySelectorAll(".ic-content__select-wrapper");
  const addlContainer = document.querySelector(".ic-content__addl");
  const addlAddBtn = document.querySelector(".ic-content__add-service");

  if (squareCustom) {
    squareCustom.addEventListener("input", function () {
      this.value = this.value.replace(/D/g, "");

      if (this.value.length > 0) {
        this.classList.add("active");

        squareRadios.forEach((el) => (el.checked = false));

        let price = this.value * 40;

        setSquare(this.value, price);
      } else {
        this.classList.remove("active");

        squareRadios[1].checked = true;
        setTotalPrice();
      }
    });

    squareRadios.forEach((el) => {
      el.addEventListener("click", () => {
        squareCustom.value = "";
        squareCustom.classList.remove("active");

        setSquare(el.value, el.dataset.price);
      });

      if (el.checked) {
        setSquare(el.value, el.dataset.price);
      }
    });

    addlContainer.addEventListener("click", function (e) {
      let target = e.target;

      if (target && target.classList.contains("ic-content__delete")) {
        let p = e.target.parentElement;
        addlServices = document.querySelectorAll(".ic-content__select-wrapper");
        let par = Array.from(addlServices);

        let idx = par.indexOf(p);

        target.parentElement.remove();
        deleteAddlItem(idx);
      }

      if (target && target.classList.contains("ic-content__select")) {
        const addlSelects = document.querySelectorAll(".ic-content__select");

        addlSelects.forEach((el, idx) => {
          el.addEventListener("change", function (e) {
            setAddlInfo(el, idx);
          });
        });
      }
    });

    addlAddBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let newAddl = document.createElement("div");
      newAddl.classList.add("ic-content__select-wrapper");
      newAddl.innerHTML = addlServices[0].innerHTML;

      addlContainer.append(newAddl);

      addAddlItem();
    });

    function setSquare(square, price) {
      const squareNumBox = document.querySelector(".order-item__num");
      squareNumBox.innerHTML = `${square} м<sup>2</sup>`;

      const squarePriceBox = document.querySelector(
        ".order-item__price-square"
      );
      squarePriceBox.innerText = `${price} руб`;

      setTotalPrice();
    }

    function addAddlItem() {
      let orderItem = document.createElement("div");
      orderItem.classList.add(
        "ic-content__order-item",
        "ic-content__order-item--addl"
      );
      orderItem.innerHTML = `
      <p class="order-item__name"></p>
      <p class="order-item__price"></p>`;

      document.querySelector(".ic-content__order-list").append(orderItem);
    }

    function setAddlInfo(elem, idx) {
      let addlItem = document.querySelectorAll(".ic-content__order-item--addl")[
        idx
      ];

      addlItem.querySelector(".order-item__name").innerText = elem.value;
      addlItem.querySelector(".order-item__price").innerText =
        elem.options[elem.selectedIndex].dataset.price + " руб";

      setTotalPrice();
    }

    function deleteAddlItem(idx) {
      let addlItem = document.querySelectorAll(".ic-content__order-item--addl")[
        idx
      ];

      addlItem.remove();
      setTotalPrice();
    }

    function setTotalPrice() {
      const totalContainer = document.querySelector(".ic-content__total-num");
      let prices = document.querySelectorAll(".order-item__price");

      let totalSum = 0;

      prices.forEach((el) => {
        if (el.innerText) {
          totalSum += parseFloat(el.innerText);
        }
      });

      totalContainer.innerText = `≈ ${totalSum} РУБ`;
    }
  }

  // how cleaning tabs

  const howBtns = document.querySelectorAll(".clean-how__nav-btn");
  const howTabs = document.querySelectorAll(".clean-how__tab");
  const howAllBtn = document.querySelectorAll(".clean-how__btn-all");
  const howAllModal = document.querySelector(".clean-how__all");
  const howModalClose = document.querySelector(".ch-all__close-btn");

  if (howAllBtn.length > 0) {
    howBtns.forEach((el) => {
      el.addEventListener("click", openTab);
    });

    function openTab(evt) {
      let slidename = evt.currentTarget.dataset.slide;

      howTabs.forEach((el) => {
        el.style.display = "none";
      });

      howBtns.forEach((el) => {
        el.classList.remove("active");
      });

      document.getElementById(slidename).style.display = "block";
      evt.currentTarget.classList.add("active");
    }

    howBtns[0].click();

    howAllBtn.forEach((el) => {
      el.addEventListener("click", () => {
        howAllModal.classList.add("active");
      });
    });

    howModalClose.addEventListener("click", () => {
      howAllModal.classList.remove("active");
    });
  }

  const furnPriceBtns = document.querySelectorAll(".price-section__tabs-btn");
  const furnPriceTabs = document.querySelectorAll(".price-slider-furn");

  if (furnPriceBtns.length > 0) {
    furnPriceBtns.forEach((el) => {
      el.addEventListener("click", openFurnTab);
    });

    function openFurnTab(evt) {
      let tabName = evt.currentTarget.dataset.slide;

      furnPriceTabs.forEach((el) => {
        el.style.display = "none";
      });

      furnPriceBtns.forEach((el) => {
        el.classList.remove("active");
      });

      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.classList.add("active");
    }

    furnPriceBtns[0].click();
  }
});
