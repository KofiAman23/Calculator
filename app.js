class Calculator {
    constructor(firstTextElement,secondTextElement){
    this.firstTextElement = firstTextElement
    this.secondTextElement = secondTextElement
    this.clear()
}
clear() {
    this.second = ''
    this.first = ''
    this.operation = undefined
}
delete() {
    this.second = this.second.toString().slice(0,-1)
}
appendNumber(number) {
    if (number ==='.' && this.second.includes('.')) return 
    this.second = this.second.toString() + number.toString()
}
chooseOperation(operation) {
    if(this.second ==='') return
    if(this.first !=='') {
        this.compute ()
    }
    this.operation = operation
    this.first = this.second
    this.second = ''
}
compute () {
    let computation
    const first = parseFloat(this.first)
    const second = parseFloat(this.second)
    if (isNaN(first) || isNaN(second)) return
    switch (this.operation) {
        case '+':
            computation = first + second
            break
        case '-':
            computation = first - second
            break
        case '*':
            computation = first * second
            break
        case '+':
            computation = first/second
            break
            default:
                return
    }
    this.second=computation
    this.operation = undefined
    this.first = ''
}
getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)){
        integerDisplay = ''
    }else{
        integerDisplay = integerDigits.toLocaleString('en',{

        maximumFractionDigits: 0})
    }
    if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    }else{
        return integerDisplay
    }
}

updateDisplay() {
    this.secondTextElement.innerText = 
    this.getDisplayNumber(this.second)
    if (this.operation != null) {
        this.firstTextElement.innerText =
        `${this.getDisplayNumber(this.first)} ${this.operation}`
    } else {
      this.firstTextElement.innerText = ''
    }
 }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const firstTextElement = document.querySelector('[data-first]')
const secondTextElement= document.querySelector('[data-second]')



const calculator = new Calculator(firstTextElement,secondTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',button=> {
    calculator.delete()
    calculator.updateDisplay()
})

