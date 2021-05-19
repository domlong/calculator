function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return 'dont u dare';
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case 'add': return add(a,b);
        case 'subtract': return subtract(a,b);
        case 'multiply': return multiply(a,b);
        case 'divide': return divide(a,b);
        default: return 'oopsy'
    }
}

function addToDisplay() {
    if(operating) {
        display.textContent = 0;
        operating = false;
    }
    if(display.textContent == 0) display.textContent = '';
    display.textContent += this.textContent;
}

function setOperator(){
    operating = true;
    if(memory != ''){
        evaluate();
    }
    currentOperator = this.id;
    memory = Number(display.textContent);
}

function refresh() {
    display.textContent = 0;
    memory = '';
    operand = '';
    console.clear();
}

/* function updateDisplay(){
    display.textContent = screen;
} */

function evaluate() {
    operand = Number(display.textContent);
    memory = operate(currentOperator, memory, operand);
    display.textContent = memory;
    //currentOperator = '';
}

function equals() {
    evaluate();
}
function showGoodStuff() {
    console.log({'memory': memory, 'operator': currentOperator, 'operand': operand, 'clicked': this.textContent});
}

const display = document.querySelector('#display');
let memory='';
let operand;
let operating = false;
let currentOperator = '';

digits = document.querySelectorAll('.digit')
digits.forEach(digit => digit.addEventListener('click',addToDisplay));

operators = document.querySelectorAll('.operator')
operators.forEach(operator => operator.addEventListener('click',setOperator));

equal = document.querySelector('#equals')
equal.addEventListener('click', equals);

buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click',showGoodStuff));


clear = document.querySelector('#clear');
clear.addEventListener('click',refresh)