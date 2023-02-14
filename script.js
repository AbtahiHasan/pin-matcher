// select elements 
const pinGenerateBtn = document.getElementById("generate-btn"),
    generatedPin = document.getElementById("generated-pin"),
    calculatorBtn = document.getElementById("calculator-btns"),
    typedPin = document.getElementById("typed-pin"),
    submitBtn = document.getElementById("submit-btn");
    
// action left

let actionLeft = document.getElementById("action-left"),
    tryCount = actionLeft.innerText,
    actionLeftConnt = document.getElementById("action-left-count");


// create 4 digit pin 
function pin() {
    const randomNumber = Math.round(Math.random() * 10000),
    pinLength = randomNumber.toString().length;  
    if(pinLength === 4){  
        return randomNumber;        
    } else {
        return pin();
    }
}

// print pin code
function pinGenerator() {
    const pinCode = pin();
    generatedPin.value = pinCode;
}

// when onclick in pinGenerateBtn when call pinGenerateBtn function
pinGenerateBtn.addEventListener("click", pinGenerator);

// calculator 
calculatorBtn.onclick = (event) => {
    const btnNumber = event.target.innerText,    
    prviusPin = typedPin.value;
    if(isNaN(btnNumber)) {
        if(btnNumber === "C") {
            typedPin.value = "";
        } 
        else if(btnNumber === "<") {
            let numbers = typedPin.value.split("");
            numbers.pop();
            let removeValue =  numbers.join("");
            typedPin.value = removeValue;
        }
    } else {
        typedPin.value = prviusPin + btnNumber;
    }
    
}


let timerStart;


// check pins when pin is submit 
submitBtn.onclick = () => {
    const generatedPinValue = generatedPin.value,
        typedPinValue = typedPin.value,
        error = document.getElementById("error"),
        success = document.getElementById("success");
    if(generatedPinValue === typedPinValue) {
        error.style.display = "none";
        success.style.display = "block";
    }else {
        success.style.display = "none";
        error.style.display = "block";
        tryCount--;
        actionLeft.innerText = tryCount;
        if(tryCount === 0) {
            submitBtn.setAttribute("disabled", "true");
            submitBtn.style.opacity = "0.4";
            submitBtn.style.pointerEvents = "none";
            let timer = document.getElementById("timer"),             
            timeValue = timer.innerText;
            timer.style.display = "block";
            actionLeftConnt.style.display = "none";
            timerStart = setInterval(function() {
                if(timeValue > 0){
                    timeValue--;   
                    timer.innerText = timeValue + "s";                 
                } else {
                    resetSubmitBnt();                 
                }               
                
            }, 1000)           
            
        }
    }
}

function resetSubmitBnt(timerStart) {
    clearInterval(timerStart);
    submitBtn.setAttribute("disabled", false);
    submitBtn.style.opacity = "1";
    submitBtn.style.pointerEvents = "auto";  
    timer.style.display = "none"; 
    actionLeftConnt.style.display = "block"; 
    actionLeft.innerText = 3;   
}