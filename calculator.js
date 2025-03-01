const buttons = document.querySelector('.actions')
const output = document.querySelector('.output')

let expression = ''
let clearOnInput = false


function showExpression() {
    output.textContent = expression
}


function onClick(event) {
    if (event.target.tagName !== 'BUTTON') return;

    const action = event.target.dataset['action'];

    if (!action) return;

    if (clearOnInput) {
        clearOnInput = false
        expression = ''
    }

    switch (action) {
        case "clear":
            expression = ''
            return showExpression();
        case 'del':
            expression = expression.slice(0, -1);
            return showExpression()
        case "empty":
            return;
        case "=":
            expression = getResult(expression)
            return showExpression();
    }

    expression += action
    showExpression()
}


function getResult(exp) {
    clearOnInput = true;

    try {
        const fun = new Function(`return ${exp}`)
        return fun()
    } catch (e) {
        console.log(e)
        return 'Ошибка'
    }
}


buttons.addEventListener('click', onClick)
