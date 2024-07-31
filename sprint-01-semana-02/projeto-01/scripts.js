const display = document.querySelector("#result");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const buttonImc = document.querySelector("#result-button");
const situation = document.querySelector("#situation");

function imcCalc(weight, height) {
  return Number(weight / (height * height));
}

buttonImc.addEventListener("click", () => {
  if (!weight.value || !height.value) return;

  const imc = imcCalc(weight.value, height.value);

  display.innerHTML = imc.toFixed(1);

  if (imc < 18.5) {
    situation.innerHTML = "Magreza";
  } else if (imc >= 18.5 && imc <= 24.9) {
    situation.innerHTML = "Normal";
  } else if (imc >= 25 && imc <= 29.9) {
    situation.innerHTML = "Obesidade Grau I";
  } else if (imc >= 30 && imc <= 39.9) {
    situation.innerHTML = "Obesidade Grau II";
  } else {
    situation.innerHTML = "Obesidade Grau III";
  }

  weight.value = "";
  height.value = "";
  //   calculadora de imc
});
