const calcDisplayInput = document.querySelector("#calc-display-input");
let totalDisplayed = false;
let total = 0;
let lastOperator = "";
let operatorLastClick = false;

function onNumberPress(e) {
    let num = e.textContent;

    if (num === "." && calcDisplayInput.innerText.includes(".")) {
        return;
    }

    if (totalDisplayed || operatorLastClick) {
        calcDisplayInput.textContent = "";
        totalDisplayed = false;
    }

    if (calcDisplayInput.textContent === "0") {
        calcDisplayInput.textContent = "";
    }
    calcDisplayInput.textContent += num;

    operatorLastClicked = false;
    totalDisplayed = false;
}

function onCeClick() {
    calcDisplayInput.textContent = "0";
}

function onCClick() {
    reset();
}

function reset(params) {
    totalDisplayed = true;
    total = 0;
    lastOperator = "";
    calcDisplayInput.textContent = "0"
}

function onOperatorPress(e) {
    let operator = e.textContent;
    if (operatorLastClicked) {
        lastOperator = operator;
        return;
    }

    operatorLastClicked = true;
    totalDisplayed = true;
    let entry = Number(calcDisplayInput.textContent);

    if (lastOperator == "") {
        total = Number(entry);
    }

    total = performCalc(total, entry, lastOperator);
    lastOperator = operator;
    calcDisplayInput.textContent = total;
}

function performCalc(a, b, operator){
    switch (operator) {
        case "−":
            return a - b;
        case "+":
            return a + b;
        case "×":
            return a * b;
        case "÷":
            return a / b;
        default:
            return a;
    }
}
