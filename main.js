let counter = 0;
let time_value = 1000;

let binary = document.querySelector("#binary");
let base10 = document.querySelector("#base10");
let processed = document.querySelector("#processed");
let formula = document.querySelector("#formula");
let evalButton = document.querySelector("#evalFormula");

let formulaFunc = (n) => n;

const updateFormula = () => {
  let f = new Function('n', `return ${formula.value.trim()};`);
  formulaFunc = f;
  //let func_body = `function formulaFunc(n) { 
  //  return ; 
  //}`;
  //console.log(func_body)
  //eval(func_body);
}

const updateBits = () => {
    base10.innerText = counter;
    binary.innerText = counter.toString(2).padStart(32, '0'); 
    processed.innerText = formulaFunc(counter).toString(2).padStart(32, '0'); 

}

const updateCounter = () => {
  counter += 1;
  updateBits();
}

evalButton.addEventListener('click', updateFormula);

setInterval(updateCounter, time_value);
