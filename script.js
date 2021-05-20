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
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case 'add': return add(a,b);
        case 'subtract': return subtract(a,b);
        case 'multiply': return multiply(a,b);
        case 'divide': return divide(a,b)
        default: return 'oopsy'
    }
}



function addToDisplay() {
    if(operating) {
        display.textContent = 0;
        operating = false;
    }
    if(display.textContent == 0) display.textContent = '';

    if(this.textContent === '.' && display.textContent.includes('.')) return;
    display.textContent += this.textContent;
}

function setOperator(){
    operating = true;
    if(memory != '' && !eq){
        evaluate();
    }
    currentOperator = this.id;
    memory = Number(display.textContent);
    eq = false;
}

function clear() {
    display.textContent = 0;
    memory = '';
    operand = '';
    buttons.forEach((btn) => btn.disabled=false);
}

function evaluate() {
    operating = true;
    if(currentOperator === '') return;
    operand = Number(display.textContent);

    if (currentOperator === 'divide' && operand == 0) {
        divBy0();
        return;
    }   
    memory = operate(currentOperator, memory, operand);
    if (typeof(memory) == 'number') {
        memory = round(memory, 5)
    }
    display.textContent = memory;
}

function divBy0() {
    display.textContent = 'dont u dare';
    buttons.forEach((btn) => btn.disabled=true);
    clear.disabled = false;
}

function equals() {
    evaluate();
    memory = Number(display.textContent);
    eq = true;
}

function deleteLast() {
    if (display.textContent.length) {
        display.textContent = display.textContent.slice(0,display.textContent.length-1);
    }
    if (!display.textContent.length) {
        display.textContent = 0;
    }
    memory = Number(display.textContent);
}

function round(num, places) {
    return Math.round(num * 10 ** places) / 10 ** places; 
}

let memory='';
let operand;
let operating = false;
let eq = false;
let currentOperator = '';

const display = document.querySelector('#display');

const digits = document.querySelectorAll('.digit')
digits.forEach(digit => digit.addEventListener('click',addToDisplay));

const operators = document.querySelectorAll('.operator')
operators.forEach(operator => operator.addEventListener('click',setOperator));

const equal = document.querySelector('#equals')
equal.addEventListener('click', equals);

const buttons = document.querySelectorAll('button');

const clr = document.querySelector('#clear');
clr.addEventListener('click',clear)

const del = document.querySelector('#delete');
del.addEventListener('click',deleteLast)