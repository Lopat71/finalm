function checkWindowSize() {
  const main = document.getElementById("main");
  if (window.innerWidth >= 1120) {
    main.classList.add("no-opacity");
  } else {
    main.classList.remove("no-opacity");
  }
}

window.addEventListener("load", checkWindowSize);

window.addEventListener("resize", checkWindowSize);

document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.querySelector(".header__btnclick");
  const closeButton = document.querySelector(".aside__burgerclick");
  const aside = document.querySelector(".aside");
  const main = document.querySelector(".main");
  const callButton = document.querySelector(".title__btn");
  const callButtons = document.querySelector(".header__btn");
  const callSection = document.querySelector(".call");
  const callCloseButtons = document.querySelectorAll(".call__close");
  const headerCallButton = document.querySelector(".header__btn_hiddens");
  const chatButtons = document.querySelectorAll(".chat");
  const feedbackSection = document.querySelector(".feedback");
  const feedbackCloseButtons = document.querySelectorAll(".chat__close");

  function toggleAside() {
    aside.classList.toggle("active");
    updateOverlay();
  }

  function toggleCall() {
    callSection.classList.toggle("active");
    updateOverlay();
  }

  function toggleFeedback() {
    feedbackSection.classList.toggle("active");
    updateOverlay();
  }

  function closeAll() {
    aside.classList.remove("active");
    callSection.classList.remove("active");
    feedbackSection.classList.remove("active");
    updateOverlay();
  }

  function updateOverlay() {
    if (
      aside.classList.contains("active") ||
      callSection.classList.contains("active") ||
      feedbackSection.classList.contains("active")
    ) {
      main.classList.add("overlay");
    } else {
      main.classList.remove("overlay");
    }
  }

  openButton.addEventListener("click", toggleAside);
  closeButton.addEventListener("click", toggleAside);
  callButton.addEventListener("click", toggleCall);
  callButtons.addEventListener("click", toggleCall);
  headerCallButton.addEventListener("click", toggleCall);

  chatButtons.forEach((button) => {
    button.addEventListener("click", toggleFeedback);
  });

  feedbackCloseButtons.forEach((button) => {
    button.addEventListener("click", toggleFeedback);
  });

  callCloseButtons.forEach((button) => {
    button.addEventListener("click", toggleCall);
  });

  document.body.addEventListener("click", function (event) {
    if (event.target === document.body || event.target === main) {
      closeAll();
    }
  });

  window.addEventListener("resize", updateOverlay);
});
