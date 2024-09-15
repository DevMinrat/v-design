const introSlider = new Swiper(".intro-slider", {
  slidesPerView: "auto",
  spaceBetween: 0,

  breakpoints: {
    921: {
      spaceBetween: 0,
    },
    10: {
      spaceBetween: 20,
    },
  },
});

function toggleIntroSlider() {
  if (window.innerWidth > 920) {
    introSlider.disable();
  } else {
    introSlider.enable();
  }
}

toggleIntroSlider();

const processSlider = new Swiper(".cleaning-proc__slider-wrapper", {
  slidesPerView: "auto",
  spaceBetween: 20,
});

function toggleProcSlider() {
  if (window.innerWidth > 920) {
    processSlider.disable();
  } else {
    processSlider.enable();
  }
}

toggleProcSlider();

const teamSlider = new Swiper(".team-slider", {
  slidesPerView: "auto",
  spaceBetween: 40,

  breakpoints: {
    920: {
      spaceBetween: 40,
    },
    501: {
      spaceBetween: 20,
    },
    10: {
      spaceBetween: 15,
    },
  },
});

const compareSlider = new Swiper(".compare-slider", {
  slidesPerView: "auto",
  spaceBetween: 0,

  breakpoints: {
    921: {
      spaceBetween: 0,
    },

    10: {
      spaceBetween: 20,
    },
  },
});

function toggleCompareSlider() {
  if (window.innerWidth > 920) {
    compareSlider.disable();
  } else {
    compareSlider.enable();
  }
}

toggleCompareSlider();

const reviewsSlider = new Swiper(".reviews-slider", {
  slidesPerView: "auto",
  spaceBetween: 0,
  autoHeight: false,

  breakpoints: {
    921: {
      spaceBetween: 0,
    },

    10: {
      spaceBetween: 20,
    },
  },
});

function toggleReviewsSlider() {
  if (window.innerWidth > 920) {
    reviewsSlider.disable();
  } else {
    reviewsSlider.enable();
  }
}

toggleReviewsSlider();

const servicesSlider = new Swiper(".services__slider-swiper", {
  slidesPerView: "auto",
  spaceBetween: 0,

  breakpoints: {
    921: {
      spaceBetween: 0,
    },

    10: {
      spaceBetween: 20,
    },
  },
});

function toggleServicesSlider() {
  if (window.innerWidth > 920) {
    servicesSlider.disable();
  } else {
    servicesSlider.enable();
  }
}

toggleServicesSlider();

const psTextileSlider = new Swiper(".ps-textile", {
  slidesPerView: "auto",
  spaceBetween: 30,

  navigation: {
    nextEl: ".swiper-button-next--textile",
    prevEl: ".swiper-button-prev--textile",
  },

  breakpoints: {
    921: {
      spaceBetween: 30,
    },

    10: {
      spaceBetween: 20,
    },
  },
});
const psLeatherSlider = new Swiper(".ps-leather", {
  slidesPerView: "auto",
  spaceBetween: 30,

  navigation: {
    nextEl: ".swiper-button-next--leather",
    prevEl: ".swiper-button-prev--leather",
  },

  breakpoints: {
    921: {
      spaceBetween: 30,
    },

    10: {
      spaceBetween: 20,
    },
  },
});
const psDelicateSlider = new Swiper(".ps-delicate", {
  slidesPerView: "auto",
  spaceBetween: 30,

  navigation: {
    nextEl: ".swiper-button-next--delicate",
    prevEl: ".swiper-button-prev--delicate",
  },

  breakpoints: {
    921: {
      spaceBetween: 30,
    },

    10: {
      spaceBetween: 20,
    },
  },
});

const psMattSlider = new Swiper(".price-slider-matt", {
  slidesPerView: "auto",
  spaceBetween: 30,

  breakpoints: {
    921: {
      spaceBetween: 30,
    },

    10: {
      spaceBetween: 20,
    },
  },
});

const psCurtSlider = new Swiper(".price-slider-curt", {
  slidesPerView: "auto",
  spaceBetween: 30,

  breakpoints: {
    921: {
      spaceBetween: 30,
    },

    10: {
      spaceBetween: 20,
    },
  },
});

window.addEventListener("resize", () => {
  toggleIntroSlider();
  toggleProcSlider();
  toggleCompareSlider();
  toggleReviewsSlider();
  toggleServicesSlider();
});
