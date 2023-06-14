const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitNextValue = false;

const sendNumberValue = function(num){
    if(awaitNextValue){
        calculatorDisplay.textContent = num;
        awaitNextValue = false;
    }else{
        const displayValue = calculatorDisplay.textContent;    
        calculatorDisplay.textContent = displayValue === '0' ? num : displayValue + num;
    }    
}

const addDecimal = function(){
    if(awaitNextValue) return;

    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }    
}
const calculate = {
    '/': (a,b)=> a/b,
    '*': (a,b) => a*b,
    '+': (a,b) => a+b,
    '-': (a,b) => a-b,
    '=': (a,b) => b
}

const useOperator = function(operator){
    let currentValue = +(calculatorDisplay.textContent);
    if(operatorValue && awaitNextValue){
        operatorValue= operator;
        return;
    }
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculateValue = calculate[operatorValue](firstValue, currentValue);
        console.log(firstValue, operatorValue, currentValue, calculateValue);       
        calculatorDisplay.textContent = calculateValue;
        firstValue = calculateValue;
    }
    awaitNextValue = true;
    operatorValue = operator;
}

inputBtns.forEach((inputBtn)=>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal());        
    }   
});

clearBtn.addEventListener('click', ()=>{
    firstValue = 0;
    operatorValue = '';
    awaitNextValue = false;
    calculatorDisplay.textContent = '0'
});