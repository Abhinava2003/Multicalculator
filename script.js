let lastAnswer = 0;
let isDegree = true;

function appendValue(value) {
  const display = document.getElementById("display");
  display.value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function useAns() {
  const display = document.getElementById("display");
  display.value += lastAnswer;
}

function calculate() {
  const display = document.getElementById('display');
  if (!display) return;
  try {
    let expression = display.value.replace(/√/g, "Math.sqrt");
    expression = expression.replace(/π/g, "Math.PI");
    expression = expression.replace(/e/g, "Math.E");

    // Handle sin, cos, tan based on degree/radian
    expression = expression.replace(/sin\(([^)]+)\)/g, (_, a) =>
      `Math.sin(${isDegree ? '(' + a + ' * Math.PI / 180)' : a})`);
    expression = expression.replace(/cos\(([^)]+)\)/g, (_, a) =>
      `Math.cos(${isDegree ? '(' + a + ' * Math.PI / 180)' : a})`);
    expression = expression.replace(/tan\(([^)]+)\)/g, (_, a) =>
      `Math.tan(${isDegree ? '(' + a + ' * Math.PI / 180)' : a})`);

    expression = expression.replace(/log\(([^)]+)\)/g, "Math.log10($1)");
    expression = expression.replace(/ln\(([^)]+)\)/g, "Math.log($1)");
    expression = expression.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));
    expression = expression.replace(/\^/g, "**");

    let result = eval(expression);
    display.value = result;
    updateHistory(`${display.value} = ${result}`);
    lastAnswer = result;
  } catch (e) {
    alert("Invalid Expression");
  }
}

function factorial(n) {
  if (n < 0) return NaN;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

function toggleAngle() {
  isDegree = !isDegree;
  document.getElementById("angleLabel").innerText = isDegree ? "DEG" : "RAD";
}

function updateHistory(entry) {
  const history = document.getElementById("history");
  if (!history) return;
  const item = document.createElement("div");
  item.textContent = entry;
  history.prepend(item);
}
