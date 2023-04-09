const calc = document.getElementsByClassName("head-calc")
const result = document.getElementsByClassName("head-result")

const writeNum = num => {
    calc[0].innerHTML === "0" ? calc[0].innerHTML = num : calc[0].innerHTML += num
    filter()
    calculate()
}

const writeOperation = op => {

    switch (op) {
        case 1: 
            calc[0].innerHTML += ` % `
            break
        case 2:
            calc[0].innerHTML += ` / `
            break
        case 3:
            calc[0].innerHTML += ` x `
            break
        case 4:
            calc[0].innerHTML += ` - `

            break
        case 5:
            calc[0].innerHTML += ` + `
            break
        case 6:
            calc[0].innerHTML += '.'
            break
    }
    filter() 
    calculate() 
    
}

const erase = () => {
    calc[0].innerHTML = "0"
    result[0].innerHTML = ""
}

const filter = () => {
    // sistema remover espaço entre menos e número em negativos 
    // console.log(calc[0].innerHTML, /[+-x\/]\s\s[+x\/]/gi.test(calc[0].innerHTML))
    // console.log(calc[0].innerHTML.replace(/(\s[+\-*/]\s\-)(\s)(\d)$/gi, "$1$3"))
    calc[0].innerHTML = calc[0].innerHTML.replace(/(\s[+\-x\/]\s\s\-)(\s)(\d)$/gi, "$1$3")

    // verificar se há duas operações seguidas (erro)
    if (/[+-x\/]\s\s[+x\/]/gi.test(calc[0].innerHTML)) {
        result[0].innerHTML = "ERRO"
        result[0].style.color = 'red'
        return false 

    } else result[0].style.color = 'white'

}

const calculate = () => {
    console.log('calculando')
    var operation = calc[0].innerHTML
    const mult = /(\d+)\s[x]\s(\d+)/gi

    // operation.replace(mult, (parseFloat('$1')*parseFloat('$2')))
    var match = mult.exec(operation)
    if (match) {
        // console.log(match)
        console.log(operation)
        const subs = parseFloat(match[1])*parseFloat(match[2])
        // console.log(match[0], subs)
        operation.replace(match[0], subs)
        // console.log(calc[0].innerHTML)
        // console.log(operation)
        console.log(operation)
    }
}   


// sistema remover espaço entre menos e número em negativos 
// regex = /(\s[+\-*/]\s\-)(\s)(\d)$/gi
// alvo = '2 + - 3'
// regex.test(alvo)
//'2 + - 3'.replace(/(\s[+\-*/]\s\-)(\s)(\d)$/gi, "$1$3")
// '2 + -3'