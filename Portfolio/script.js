import { acknowledgedmentDataset } from "./scripts/dataset.js";

const userName = document.querySelector(".user-name");
const careerOptions = document.querySelectorAll(".career-option");
const careerContent = document.querySelector(".career-details");

const separatedName = userName.textContent.trim().split("");
const createSpan = separatedName.map((letter) => {
  const invertedElement = `<span class="scale-name scale-name-inverted highlight">${letter}</span>`;

  const element = `<span class="scale-name">${letter}</span>`;

  return letter === "A" || letter === "l" || letter === "u" || letter === "m"
    ? invertedElement
    : element;
});
const joinSpan = createSpan.join("");
userName.innerHTML = joinSpan;

const scaleNames = document.querySelectorAll(".scale-name");
scaleNames.forEach((letters) => {
  letters.addEventListener("mouseover", () => {
    // play bubble sound
    const bubbleSound = document.querySelector(".bubble-audio");
    bubbleSound.currentTime = 0;
    bubbleSound.play();

    // speed the play
    bubbleSound.playbackRate = 5;
  });
});

careerOptions.forEach((options) => {
  options.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.currentTarget;

    // remove all active class
    careerOptions.forEach((option) => {
      option.classList.remove("selected");
    });

    // add active class
    target.classList.add("selected");
    const selectedCareer = e.currentTarget.dataset.career;

    // update the content
    const updateContent = acknowledgedmentDataset.find((item) => {
      return item.keyword === selectedCareer;
    });

    const { title, address, details } = updateContent;

    careerContent.innerHTML = `
      <h3 class="career-title appear">${title}</h3>
      <p class="career-address appear">${address}</p>
      <p class="career-paragraph appear">${details}</p>
      `;
  });
});
