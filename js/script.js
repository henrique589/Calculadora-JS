const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    addDigit(digit){
        //verifica se a operação atual já contém um ponto
        if(digit == "." && this.currentOperationText.innerText.includes(".")){
            return;
        }
        this.currentOperation = digit
        this.updateScreen()
    }
    //Processamento das operações da calculadora
    processOperation(operation){
        //Checar se o valor do operando atual é vazio
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            //Mudança de operação
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }
        //Pegar os valores dos operandos anterior e atual
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
            this.processDelOperation();
                break;
            case "CE":
            this.processClearCurrentOperation();
                break;
            case "C":
            this.processClearAllOperations();
                break;
            case "=":
            this.processEqualOperator();
                break;
            default:
                return;
        }
    }
    //Muda os valores do visor da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            //Se o valor foi igual a 0, então ele somente somará o valor da operação atual
            if(previous === 0){
                operationValue = current
            }

            //O operando anterior recebe o valor do operando atual
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""; 
        }
    }
    //Mudança de operação
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"]
        if(!mathOperations.includes(operation)){
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //Deleta o último dígito
    processDelOperation(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    //Limpa a operação atual
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }
    //Limpa todas as operações
    processClearAllOperations(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    //Mostar o resultade de uma operação
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        }else{
            calc.processOperation(value);
        }
    });
});