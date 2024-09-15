const quiz = document.querySelector(".quiz");
const quizVideo = document.querySelector(".quiz-intro__video-wrapper");
const quizIntroInfo = document.querySelector(".quiz-intro__content");
const quizIntroBtn = document.querySelector(".quiz-intro__btn");

if (quizIntroBtn) {
  quizIntroBtn.addEventListener("click", () => {
    quizVideo.style.transform = "translateX(-120%)";
    quizVideo.style.opacity = 0;

    quizIntroInfo.style.transform = "translateX(120%)";
    quizIntroInfo.style.opacity = 0;

    quiz.style.pointerEvents = "none";
  });

  let btnContinue = document.querySelector(".quiz-form__btn-next");
  let btnPrev = document.querySelector(".quiz-form__btn-prev");
  let slideIndex = 1;

  let giftsCheckbox = document.querySelectorAll(".qfc-gift");
  let maxCount = 2;
  let currentCount = 0;

  showSlides(slideIndex);
  setStep(slideIndex);

  btnContinue.addEventListener("click", function () {
    showSlides((slideIndex += 1));
  });
  btnPrev.addEventListener("click", function () {
    showSlides((slideIndex -= 1));
  });

  function showSlides(n) {
    let slides = document.querySelectorAll(".quiz-form__slide");

    switch (n) {
      case 1:
        btnPrev.classList.add("disabled");
        break;
      case slides.length:
        btnContinue.classList.add("disabled");
        break;
      default:
        btnPrev.classList.remove("disabled");
        btnContinue.classList.remove("disabled");
        break;
    }

    let checkedGifts = document.querySelectorAll(".qfc-gift:checked");

    if (n == slides.length - 1 && checkedGifts.length != maxCount) {
      btnContinue.classList.add("disabled");
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove("active-slide");
    }

    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("active-slide");

    setStep(slideIndex);
  }

  function setStep(n) {
    let currentStep = document.querySelector(".current-step");
    let totalSteps = document.querySelector(".steps-total");
    let slides = document.querySelectorAll(".quiz-form__slide");
    let questCount = document.querySelector("#question-count");

    currentStep.innerText = n;
    totalSteps.innerText = slides.length;
    questCount.innerText = slides.length;
  }

  // only 2 gifts

  function checkGifts(elem, slideIndex) {
    if (elem.checked) {
      currentCount += 1;
    } else {
      currentCount -= 1;
    }

    let gifts = document.querySelectorAll(".qfc-gift");

    if (currentCount === maxCount) {
      gifts.forEach((el) => {
        if (el.checked === false) {
          el.disabled = true;
        }
      });
    } else {
      gifts.forEach((el) => {
        el.disabled = false;
      });
    }

    showSlides(slideIndex);
  }

  // custom area
  const custAreaRadio = document.querySelector(".quiz-form__radio--area");
  const idkAreaRadio = document.querySelector("#area-idk");
  const custAreaInput = document.querySelector(".quiz-form__area");

  function setCustomArea(custRad, idkRadio, custInp) {
    if (custInp) {
      function checkAreaRadio() {
        if (custRad.checked == false) {
          custInp.disabled = true;
          custInp.value = "";
        } else {
          custInp.disabled = false;
        }
      }

      checkAreaRadio();

      custRad.addEventListener("change", checkAreaRadio);
      idkRadio.addEventListener("change", checkAreaRadio);
    }
  }

  setCustomArea(custAreaRadio, idkAreaRadio, custAreaInput);

  // set gifts and check count

  giftsCheckbox.forEach((el) => {
    el.addEventListener("change", () => {
      checkGifts(el, slideIndex);
      setGifts();
    });
  });

  function setGifts() {
    let checkedGifts = document.querySelectorAll(".qfc-gift:checked");
    let orderGifts = document.querySelectorAll(".quiz-form__gift-item p");

    checkedGifts.forEach((el, i) => {
      orderGifts[i].innerText = el.value;
    });
  }

  const quizSquare = document.querySelector(".quiz-form__slide-square");
  const quizSquareRadios = document.querySelectorAll(".qf-content__square");
  const quizSquareCustom = document.querySelector(".qf-content__square-custom");

  if (quizSquare) {
    quizSquareCustom.addEventListener("input", function () {
      this.value = this.value.replace(/D/g, "");

      if (this.value.length > 0) {
        this.classList.add("active");
        quizSquareRadios.forEach((el) => (el.checked = false));
      } else {
        this.classList.remove("active");
        quizSquareRadios[1].checked = true;
      }
    });

    quizSquareRadios.forEach((el) => {
      el.addEventListener("click", () => {
        quizSquareCustom.value = "";
        quizSquareCustom.classList.remove("active");
      });
    });
  }

  // cleaning choise

  let furnQuestions = `<div class="quiz-form__furn">
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">2. Какую мебель будем чистить?</p>
    <div class="quiz-form__slide-fields">
        <input class="quiz-form__radio" type="radio" name="type-furn" id="type-furn1" value="Диван" checked>
        <label for="type-furn1">Диван</label>
        <input class="quiz-form__radio" type="radio" name="type-furn" id="type-furn2" value="Кресло">
        <label for="type-furn2">Кресло</label>
        <input class="quiz-form__radio" type="radio" name="type-furn" id="type-furn3" value="Стулья">
        <label for="type-furn3">Стулья</label>
        <input class="quiz-form__radio" type="radio" name="type-furn" id="type-furn4"
            value="Изголовье кровати">
        <label for="type-furn4">Изголовье кровати</label>
    </div>
</div>
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">3. Из какого материала?</p>

    <div class="quiz-form__slide-fields">
        <input class="quiz-form__radio" type="radio" name="material-furn" id="material-furn1"
            value="Ткань" checked>
        <label for="material-furn1">Ткань</label>
        <input class="quiz-form__radio" type="radio" name="material-furn" id="material-furn2"
            value="Кожа">
        <label for="material-furn2">Кожа</label>
        <input class="quiz-form__radio" type="radio" name="material-furn" id="material-furn3"
            value="Деликатная ткань">
        <label for="material-furn3">Деликатная ткань</label>
        <input class="quiz-form__radio" type="radio" name="material-furn" id="material-furn4"
            value="Комбинированная">
        <label for="material-furn4">Комбинированная</label>
    </div>
</div>
</div>`;
  let carpetQuestions = `<div class="quiz-form__carpet">
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">2. Из какого материала Ваш ковер?</p>

    <div class="quiz-form__slide-fields">
        <input class="quiz-form__radio" type="radio" name="material-carpet" id="material-carpet1"
            value="Синтетический" checked>
        <label for="material-carpet1">Синтетический</label>
        <input class="quiz-form__radio" type="radio" name="material-carpet" id="material-carpet2"
            value="Шерсть/хлопок">
        <label for="material-carpet2">Шерсть/хлопок</label>
        <input class="quiz-form__radio" type="radio" name="material-carpet" id="material-carpet3"
            value="Шелковый">
        <label for="material-carpet3">Шелковый</label>
        <input class="quiz-form__radio" type="radio" name="material-carpet" id="material-carpet4"
            value="Вискоза">
        <label for="material-carpet4">Вискоза</label>
        <input class="quiz-form__radio" type="radio" name="material-carpet" id="material-carpet5"
            value="Не знаю">
        <label for="material-carpet5">Не знаю</label>
    </div>
</div>
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">3. Какой ворс у ковра?</p>

    <div class="quiz-form__slide-fields quiz-form__slide-fields--column">
        <input class="quiz-form__radio" type="radio" name="vors" id="vors1" value="Безворсовый" checked>
        <label for="vors1">Безворсовый</label>
        <input class="quiz-form__radio" type="radio" name="vors" id="vors2" value="С высоким ворсом">
        <label for="vors2">С высоким ворсом</label>
    </div>
</div>
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">4. Примерные размеры ковра в кв. метрах?</p>

    <div class="quiz-form__slide-fields quiz-form__slide-fields--column">
        <div class="quiz-form__area-wrapper">
            <input class="quiz-form__radio quiz-form__radio--area" type="radio" name="area-carpet"
                id="area-carpet-input">
            <label for="area-carpet-input"></label>

            <label for="area-carpet-cust">Длина*ширина</label>
            <input class="quiz-form__area" type="text" id="area-carpet-cust"
                placeholder="Введите параметры" required>
            <label for="area-carpet-cust">м<sup>2</sup></label>
        </div>
        <input class="quiz-form__radio" type="radio" name="area-carpet" id="area-idk"
            value="Не знаю" checked>
        <label for="area-idk">Не знаю</label>
    </div>
</div>
</div>`;
  let mattressQuestions = `<div class="quiz-form__mattress">
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">2. Знаете ли Вы размеры матраса?</p>

    <div class="quiz-form__slide-fields">
        <input class="quiz-form__radio" type="radio" name="size-mattress" id="size-mattress1"
            value="Детский (ширина60-80 см)">
        <label for="size-mattress1">Детский (ширина60-80 см)</label>
        <input class="quiz-form__radio" type="radio" name="size-mattress" id="size-mattress2"
            value="Односпальный (ширина 80-95см)">
        <label for="size-mattress2">Односпальный (ширина 80-95см)</label>
        <input class="quiz-form__radio" type="radio" name="size-mattress" id="size-mattress3"
            value="Полуторный (ширина 100-150см)">
        <label for="size-mattress3">Полуторный (ширина 100-150см)</label>
        <input class="quiz-form__radio" type="radio" name="size-mattress" id="size-mattress4"
            value="Двуспальный (ширина 150-220см)" checked>
        <label for="size-mattress4">Двуспальный (ширина 150-220см)</label>
    </div>
</div>
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">3. Чистить будем с одно или с двух сторон?</p>

    <div class="quiz-form__slide-fields quiz-form__slide-fields--column">
        <input class="quiz-form__radio" type="radio" name="side-mattress" id="side-mattress1"
            value="С двух сторон" checked>
        <label for="side-mattress1">С двух сторон</label>
        <input class="quiz-form__radio" type="radio" name="side-mattress" id="side-mattress2"
            value="С одной стороны">
        <label for="side-mattress2">С одной стороны</label>
    </div>
</div>
</div>`;
  let curtQuestion = `<div class="quiz-form__curt">
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">2. Какого типа шторы нужно почистить?</p>
    <div class="quiz-form__slide-fields">
        <input class="quiz-form__radio" type="radio" name="type-curt" id="type-curt1" value="Тюль"
            checked>
        <label for="type-curt1">Тюль</label>
        <input class="quiz-form__radio" type="radio" name="type-curt" id="type-curt2" value="Шторы">
        <label for="type-curt2">Шторы</label>
        <input class="quiz-form__radio" type="radio" name="type-curt" id="type-curt3"
            value="Ламбрекены">
        <label for="type-curt3">Ламбрекены</label>
        <input class="quiz-form__radio" type="radio" name="type-curt" id="type-curt4"
            value="Римские/Французские шторы">
        <label for="type-curt4">Римские/Французские шторы</label>
    </div>
</div>
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">3. Из какого материала?</p>

    <div class="quiz-form__slide-fields">
        <input class="quiz-form__radio" type="radio" name="material-curt" id="material-curt1"
            value="Натуральные" checked>
        <label for="material-curt1">Натуральные</label>
        <input class="quiz-form__radio" type="radio" name="material-curt" id="material-curt2"
            value="Синтетические">
        <label for="material-curt2">Синтетические</label>
    </div>
</div>
<div class="quiz-form__slide">
    <p class="quiz-form__slide-heading">3. Знаете ли вы размеры штор в кв.метрах ?</p>

    <div class="quiz-form__slide-fields quiz-form__slide-fields--column">
        <div class="quiz-form__area-wrapper">
            <input class="quiz-form__radio quiz-form__radio--area" type="radio" name="area-curt"
                id="area-curt-input">
            <label for="area-curt-input"></label>
            <label for="area-curt-cust">Длина*ширина</label>
            <input class="quiz-form__area" type="text" id="area-curt-cust"
                placeholder="Введите параметры" required>
            <label for="area-curt-cust">м<sup>2</sup></label>
        </div>
        <input class="quiz-form__radio" type="radio" name="area-curt" id="area-idk"
            value="не знаю" checked>
        <label for="area-idk">Не знаю</label>
    </div>
</div>
</div>`;

  const slidesBox = document.querySelector(".quiz-form__other-slides");
  const cleanTypes = document.querySelectorAll(".clean-type");

  if (slidesBox) {
    cleanTypes.forEach((el) => {
      el.addEventListener("click", () => setQuestion(el));
    });

    function setQuestion(el) {
      switch (el.value) {
        case "Мебель":
          slidesBox.innerHTML = furnQuestions;
          break;
        case "Ковер":
          slidesBox.innerHTML = carpetQuestions;
          break;
        case "Матрац":
          slidesBox.innerHTML = mattressQuestions;
          break;
        case "Шторы":
          slidesBox.innerHTML = curtQuestion;
          break;

        default:
          slidesBox.innerHTML = furnQuestions;
          break;
      }

      const custAreaRadio = document.querySelector(".quiz-form__radio--area");
      const idkAreaRadio = document.querySelector("#area-idk");
      const custAreaInput = document.querySelector(".quiz-form__area");

      slidesBox
        .querySelectorAll(".quiz-form__slide")
        .forEach((el) => (el.style.display = "none"));

      setStep(slideIndex);
      setCustomArea(custAreaRadio, idkAreaRadio, custAreaInput);
    }
  }
}
