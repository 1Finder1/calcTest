const buttons = document.querySelector('.actions')
const firstPartOutput = document.querySelector('#first_part')
const currentPartOutput = document.querySelector('#current_part')

const operationList = [
    '**',
    '/',
    '*',
    '+',
    '-',
]

const actionList = [
    ...operationList,
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '.',
    'del',
    '='
]

let firstPart = ''
let currentPart = ''
let operation = ''

let clearOnInput = false

function showExpression() {
    firstPartOutput.textContent = `${firstPart} ${operation}`
    currentPartOutput.textContent = currentPart

    firstPartOutput.scrollLeft = firstPartOutput.scrollWidth;
    currentPartOutput.scrollLeft = currentPartOutput.scrollWidth;
}

function clearAll() {
    firstPart = ''
    currentPart = ''
    operation = ''
}


function calc() {
    const expression = firstPart + operation + currentPart
    clearAll()
    currentPart = getResult(expression)
    return showExpression();
}


function handleAction(action, isOperation) {
    if (!action) return;

    if (clearOnInput) {
        clearAll()
        clearOnInput = false
    }

    if (isOperation) {
        if (operation && currentPart && firstPart) {
            calc()
        }

        if (action === '-' && !operation && !currentPart && !firstPart) {
            currentPart = '-' + currentPart
            return showExpression()
        }

        if (!currentPart && !firstPart) return showExpression()
        operation = action
        if (currentPart) {
            firstPart = currentPart
            currentPart = ''
        }

        return showExpression()
    }

    switch (action) {
        case "clear":
            clearAll()
            return showExpression();
        case 'del':
            currentPart = currentPart.slice(0, -1);
            return showExpression()
        case "empty":
            return;
        case "=":
            return calc()
        case '.':
            if (currentPart.includes('.')) return;
            if (!currentPart) currentPart = '0'
    }

    currentPart += action

    if (currentPart.startsWith('0') && currentPart[1] && currentPart[1] !== '.')
        currentPart = currentPart.slice(1,)

    showExpression()
}

function onClick(event) {
    if (event.target.tagName !== 'BUTTON') return;

    const action = event.target.dataset['action'];
    const isOperation = event.target.dataset['operation'] === 'true'

    handleAction(action, isOperation)
}


function onKeyboardClick(event) {
    console.log(event.key)
    const action = event.key.replace('^','**').replace('Backspace', 'del').replace('Enter', '=')

    if (!actionList.includes(action)) return

    const isOperation = operationList.includes(action)
    handleAction(action, isOperation)
}

function getResult(exp) {
    try {
        const fun = new Function(`return ${exp}`)
        const result = fun()

        if (result < 1/10**8) {
            return 'Маленькое число'
        }
        if (result > 10**8) {
            return 'Большое число'
        }

        return fun() + ''
    } catch (e) {
        console.log(e)
        clearOnInput = true
        return e.message
    }
}


buttons.addEventListener('click', onClick)
document.addEventListener('keydown', onKeyboardClick)
