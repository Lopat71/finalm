$(".technique__button").click(function () {
  $(".technique__menu").toggleClass("shower");
});

// JavaScript код для изменения текста и поворота стрелки
const techniqueElement = document.querySelector(".technique__button");

techniqueElement.addEventListener("click", () => {
  const arrowElement = document.querySelector(".technique__arrow");

  // Переключаем класс rotate-180 у элемента стрелки перед изменением innerHTML
  arrowElement.classList.toggle("rotate-180");

  // Проверяем текущий текст кнопки и меняем его
  if (techniqueElement.textContent.trim() === "Показать все") {
    techniqueElement.innerHTML =
      '<img class="technique__arrow" src="img/SVG/Brends/expand.svg" alt=""/>Скрыть';
  } else {
    techniqueElement.innerHTML =
      '<img class="technique__arrow" src="img/SVG/Brends/expand.svg" alt=""/>Показать все';
  }

  // Обновляем ссылку на новый элемент arrow после изменения innerHTML
  const newArrowElement = document.querySelector(".technique__arrow");

  // Проверяем и переносим класс rotate-180 на новый элемент
  if (arrowElement.classList.contains("rotate-180")) {
    newArrowElement.classList.add("rotate-180");
  }
});
