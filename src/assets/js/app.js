document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    let scrollPrev = 0;

    // window.addEventListener("scroll", () => {
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


    const portf_items = document.querySelectorAll(".portfolio__item");
    const portf_inner = document.querySelector(".portfolio__inner");

    if (portf_items) {
        portf_inner.addEventListener("mouseover", () => {
            portf_inner.classList.add("hover");
        });
        portf_inner.addEventListener("mouseleave", () => {
            portf_inner.classList.remove("hover");
        });

        portf_items.forEach(el => {
            el.addEventListener("mouseover", () => {
                el.classList.add("hover");
            });

            el.addEventListener("mouseleave", () => {
                el.classList.remove("hover");
            });
        });
    }

    const serviceAccTitle = document.querySelectorAll(".services-item__acc-title");
    const serviceAccText = document.querySelectorAll(".services-item__acc-descr");

    if (serviceAccTitle) {
        serviceAccTitle.forEach((title, index) => {
            title.addEventListener("click", () => {
                const isActive = title.classList.contains("active");

                serviceAccTitle.forEach((el) => el.classList.remove("active"));
                serviceAccText.forEach((el) => el.style.maxHeight = null);

                if (!isActive) {
                    title.classList.add("active");
                    serviceAccText[index].style.maxHeight = serviceAccText[index].scrollHeight + "px";
                }
            });
        });
    }
});
