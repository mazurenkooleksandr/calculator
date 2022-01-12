const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const actions = ["-", "+", "x", "/"];
const outScreen = document.querySelector(".calc-screen p");
let x = "";
let y = "";
let sign = "";
let finish = false;

function clearAll() {
  x = "";
  y = "";
  sign = "";
  finish = false;
  outScreen.textContent = 0;
}

function checkButtons(event) {
  const key = event.target.textContent;
  if (!event.target.classList.contains("btn")) return;
  if (event.target.classList.contains("ac")) return;

  outScreen.textContent = "";

  if (digits.includes(key)) {
    if (y === "" && sign === "") {
      x += key;
      outScreen.textContent = x;
    } else if (x !== "" && y !== "" && finish) {
      y = key;
      finish = false;
      outScreen.textContent = y;
    } else if (x !== "" && sign !== "" && !finish) {
      y += key;
      outScreen.textContent = y;
    } else {
      x += key;
      outScreen.textContent = x;
    }
    return;
  }

  if (actions.includes(key)) {
    sign = key;
    outScreen.textContent = sign;
  }

  console.log("x: " + x, "y: " + y, "s: " + sign, "finish:" + finish);

  if (key === "=") {
    if (y === "") y = x;
    switch (sign) {
      case "+":
        x = +x + +y;
        break;
      case "-":
        x = x - y;
        break;
      case "x":
        x = x * y;
        break;
      case "/":
        if (y === "0") {
          outScreen.textContent = "Error";
          x = "";
          y = "";
          sing = "";
          return;
        }
        x = x / y;
        break;
      default:
        break;
    }
    finish = true;
    outScreen.textContent = Number(x);
  }
}

document.querySelector(".ac").addEventListener("click", clearAll);
document.querySelector(".buttons").addEventListener("click", checkButtons);
