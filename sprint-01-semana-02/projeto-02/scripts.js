const celsius = document.querySelector("#celsius");
const farenheit = document.querySelector("#farenheit");
const button = document.querySelector("#button");

const calcularF = (celsius) => {
  return Number(celsius * 1.8 + 32);
};

button.addEventListener("click", () => {
  if (!celsius.value) return;

  const calc = calcularF(celsius.value);

  farenheit.innerHTML = String(`F° ${calc}`);

  celsius.value = "";
});
