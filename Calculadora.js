const display = document.getElementById('display');

let current = '0';
let previous = null;
let operator = null;
let waitingForNew = false;

function updateDisplay(){
  display.textContent = current;
}

function inputDigit(d){
  if(waitingForNew){
    current = d === '.' ? '0.' : d;
    waitingForNew = false;
  } else {
    if(d === '.' && current.includes('.')) return;
    current = current === '0' && d !== '.' ? d : current + d;
  }
  updateDisplay();
}

function clearAll(){
  current = '0';
  previous = null;
  operator = null;
  waitingForNew = false;
  updateDisplay();
}

function handleOperator(nextOp){
  const inputValue = parseFloat(current);

  if(operator && waitingForNew){
    operator = nextOp;
    return;
  }

  if(previous === null){
    previous = inputValue;
  } else if(operator){
    const result = operate(previous, inputValue, operator);
    previous = result;
    current = String(result);
    updateDisplay();
  }

  operator = nextOp;
  waitingForNew = true;
}

function operate(a, b, op){
  switch(op){
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide':
      if(b === 0) return 'Error';
      return a / b;
  }
  return b;
}

function calculate(){
  if(operator == null || waitingForNew) return;
  const result = operate(previous, parseFloat(current), operator);
  current = String(result);
  previous = null;
  operator = null;
  waitingForNew = true;
  updateDisplay();
}

document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const num = btn.dataset.num;
    const action = btn.dataset.action;

    if(num !== undefined){
      inputDigit(num);
      return;
    }

    switch(action){
      case 'clear': clearAll(); break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        handleOperator(action); break;
      case 'equals': calculate(); break;
    }
  });
});

// Inicializa
updateDisplay();