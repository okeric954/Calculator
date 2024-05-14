const calculator = document.querySelector('.calculator');
const display = document.querySelector('#display');
const keys = calculator.querySelector('.calculator__keys');

let firstValue = null;
let operator = null;
let previousKeyType = null;
let displayedNum = '0';

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;

        if (!action) {
            handleNumber(keyContent);
        } else {
            switch (action) {
                case 'clear':
                    clearDisplay();
                    break;
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    handleOperator(action);
                    break;
                case 'equals':
                    calculateResult();
                    break;
                case 'decimal':
                    handleDecimal();
                    break;
                case 'toggle-sign':
                    toggleSign();
                    break;
                case 'percentage':
                    calculatePercentage();
                    break;
            }
        }
    }
});

function handleNumber(keyContent) {
    if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = keyContent;
    } else {
        display.textContent += keyContent;
    }
    displayedNum = display.textContent;
    previousKeyType = 'number';
}

function clearDisplay() {
    display.textContent = '0';
    firstValue = null;
    operator = null;
    previousKeyType = 'clear';
}

function handleOperator(nextOperator) {
    if (firstValue !== null) {
        calculateResult();
    }
    firstValue = displayedNum;
    operator = nextOperator;
    previousKeyType = 'operator';
}

function calculateResult() {
    let result = null;
    const secondValue = displayedNum;
    if (firstValue !== null && operator !== null) {
        result = operate(parseFloat(firstValue), operator, parseFloat(secondValue));
        display.textContent = result;
        firstValue = result;
    }
    previousKeyType = 'calculate';
}

function handleDecimal() {
    if (!displayedNum.includes('.')) {
        display.textContent += '.';
        displayedNum += '.';
    }
    previousKeyType = 'decimal';
}

function toggleSign() {
    displayedNum = parseFloat(displayedNum) * -1;
    display.textContent = displayedNum;
}

function calculatePercentage() {
    displayedNum = parseFloat(displayedNum) / 100;
    display.textContent = displayedNum;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            if (num2 === 0) {
                return 'Error';
            }
            return num1 / num2;
        default:
            return null;
    }
}
