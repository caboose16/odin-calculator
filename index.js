const calcDisplayInput = document.querySelector("#calc-display-input");
let isLocked = false;
let totalDisplayed = false;
let total = 0;
let lastOperator = "";
let operatorLastClick = false;

function onNumberPress(e) {
    if (isLocked)
        return;
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
    if (isLocked)
        return;
    calcDisplayInput.textContent = "0";
}

function onCClick() {
    reset();
}

function onDelClick() {
    if (isLocked)
        return;
    if (calcDisplayInput.innerText.length == 1)
        calcDisplayInput.textContent = "0";
    if (calcDisplayInput.textContent === "0")
        return;
    calcDisplayInput.textContent = calcDisplayInput.innerText.slice(0,-1);
}

function onPercentClick() {
    if (isLocked)
        return;
    let entry = Number(calcDisplayInput.textContent)
    calcDisplayInput.textContent = entry / 100;
}

function reset(params) {
    isLocked = false;
    totalDisplayed = true;
    total = 0;
    lastOperator = "";
    calcDisplayInput.textContent = "0"
}

function onOperatorPress(e) {
    if (isLocked)
        return;

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
    if (total == "undefined") {
        isLocked = true;
    }
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
            return b == 0 ? "undefined" : a / b;
        default:
            return a;
    }
}
