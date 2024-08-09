$(".brend__button").click(function () {
  $(".brend__menu").toggleClass("show");
});

// JavaScript код для изменения текста и поворота стрелки
const buttonElement = document.querySelector(".brend__button");

buttonElement.addEventListener("click", () => {
  const arrowElement = document.querySelector(".brend__arrow");

  // Переключаем класс rotate-180 у элемента стрелки перед изменением innerHTML
  arrowElement.classList.toggle("rotate-180");

  // Проверяем текущий текст кнопки и меняем его
  if (buttonElement.textContent.trim() === "Показать все") {
    buttonElement.innerHTML =
      '<img class="brend__arrow" src="img/SVG/Brends/expand.svg" alt=""/>Скрыть';
  } else {
    buttonElement.innerHTML =
      '<img class="brend__arrow" src="img/SVG/Brends/expand.svg" alt=""/>Показать все';
  }

  // Обновляем ссылку на новый элемент arrow после изменения innerHTML
  const newArrowElement = document.querySelector(".brend__arrow");

  // Проверяем и переносим класс rotate-180 на новый элемент
  if (arrowElement.classList.contains("rotate-180")) {
    newArrowElement.classList.add("rotate-180");
  }
});
