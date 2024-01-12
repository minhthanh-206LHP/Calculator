let runningTotal = 0;
let buffer = "0";
let exp = "";
let prevOperator ;

const screen = document.querySelector('.screen');
const exp_screen = document.querySelector('.screen-smol')
function buttonClick (value) {
    if (isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    screen.innerText = buffer;
    exp_screen.innerText = exp;
    console.log(buffer);
    console.log(runningTotal);
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            exp = "";
            runningTotal = 0;
            break;
        case '=':
            if (prevOperator === null) {
                return
            }
            exp += buffer;
            flushOperation(parseInt(buffer));
            prevOperator = null;
            buffer = runningTotal.toString();

            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            }else {
                buffer = buffer.substring(0,buffer.length-1);
            }
            break;
        case '√':
            runningTotal = Math.sqrt(parseInt(buffer));
            buffer = runningTotal.toString();
            console.log('Its here xD');
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath (symbol) {
    if (buffer === '0') {
        return
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }else {
        flushOperation(intBuffer);
    }
    if (prevOperator === null) {
        exp = runningTotal.toString() + " " + symbol + " ";
    }else {
        exp += buffer + " " + symbol + " ";
    }
    prevOperator = symbol;
    
    buffer = '0';
}

function flushOperation (intBuffer) {
    if (prevOperator === '+') {
        runningTotal += intBuffer;
    }else if (prevOperator === '−') {
        runningTotal -= intBuffer;
    }else if (prevOperator === '×') {
        runningTotal *= intBuffer;
    }else if (prevOperator === '÷') {
        runningTotal /= intBuffer;
    }
    prevOperator = null;
}

function handleNumber (numberString) {
    if (prevOperator === null) {
        buffer = "0";
        exp = "";
    }
    if (buffer === "0") {
        buffer = numberString;
    }else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.cal-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();