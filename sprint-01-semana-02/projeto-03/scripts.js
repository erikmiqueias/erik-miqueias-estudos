const body = document.body;
const button = document.querySelector("#button");
const word = document.querySelector("h1");

colorsList = ["red", "blue", "green", "yellow", "purple", "pink"];

button.addEventListener("click", () => {
  const color = Math.floor(Math.random(colorsList.length) * colorsList.length);
  const backgroundColor = color;
  const wordColor = color;

  body.style.backgroundColor = colorsList[color];
});
