const calc = document.getElementsByClassName("head-calc")
const result = document.getElementsByClassName("head-result")

const writeNum = num => {
    calc[0].innerHTML === "0" ? calc[0].innerHTML = num : calc[0].innerHTML += num
    filter()
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
    
}

const erase = () => {
    calc[0].innerHTML = "0"
    result[0].innerHTML = ""
}

const eraseLast = () => {
    calc[0].innerHTML = calc[0].innerHTML.trim().slice(0, -1).trim()
    filter()
}   

const filter = () => {
    // sistema remover espaço entre menos e número em negativos 
    calc[0].innerHTML = calc[0].innerHTML
        .replace(/(\s[+\-x\/]\s\s?\-)(\s)(\d)$/gi, "$1$3")

    // verifica se um . foi digitado sozinho (sem um digito na frente) - correspondente a 0.? 
    calc[0].innerHTML = calc[0].innerHTML
        .replace(/\s(\.)/gi, " 0.")

    // verifica se a conta for apagada - reseta o display
    if (calc[0].innerHTML === "") {
        calc[0].innerHTML = "0"
        result[0].innerHTML = ""
    }

    // verificar se há duas operações seguidas (erro)
    if (/[+-x\/]\s\s[+x\/]/gi.test(calc[0].innerHTML)) {
        setError("ERRO!")
        return false 

    } else removeError()
    
    // verifica se faltam espaços entre operações e numeros 
    calc[0].innerHTML = calc[0].innerHTML
        .replace(/([+x\/])(\d)/gi, "$1 $2")

    // Verifica se faltam operações na conta 
    const FORMAT_ERROR = /[)]\d/g.test(calc[0].innerHTML) ||
                         /\d[(]/g.test(calc[0].innerHTML) 

    console.log("formatação:", FORMAT_ERROR, calc[0].innerHTML)
    FORMAT_ERROR ? setError("ERRO DE FORMATAÇÃO!") : null


    calculate()
}

const setError = msg => {
    result[0].innerHTML = msg
    result[0].style.color = 'red'
}
const removeError = () => {
    result[0].style.color = 'white'
}

const calculate = () => {
    var operation = calc[0].innerHTML

    const mult_div = /([-\d\.]+)\s([x\/])\s\s?([-\d\.]+)/i

    var match_md = mult_div.exec(operation)
    while (match_md != null) {
        const result = match_md[2] === 'x' ? 
            parseFloat(match_md[1]) * parseFloat(match_md[3]) : 
            parseFloat(match_md[1]) / parseFloat(match_md[3]) 
        operation = operation
            .replace(match_md[0], result)
        match_md = mult_div.exec(operation)
    }

    const ads_sub = /([-\d\.]+)\s([\+-])\s\s?([-\d\.]+)/i

    var match_as = ads_sub.exec(operation)
    while (match_as != null) {
        const result = match_as[2] === '+' ? 
            parseFloat(match_as[1]) + parseFloat(match_as[3]) : 
            parseFloat(match_as[1]) - parseFloat(match_as[3]) 
        operation = operation
            .replace(match_as[0], result)
        match_as = ads_sub.exec(operation)
    }

    if (calc_is_complete(operation)) result[0].innerHTML = operation
}   

const equals = () => {
    calc[0].innerHTML = result[0].innerHTML
    result[0].innerHTML = ""
}

// verifica se o valor passado contém apenas digitos numericos (sem operações incompletas)
const calc_is_complete = calc => {
    return (/^[-\d\.]+$/gi.test(calc))
}



// FUNÇÃO INCOMPLETA...
// regras parenteses 
// ABRIR: 
    // Se não houver parenteses 
    // Se o digito anterior for uma operação ou abre parenteses 
    // se 
    
// FECHAR
    // Se o digito anterior é um número 
    // 
    
const brackets = () => {
    // true se não há parenteses na conta 
    const NO_BRACKS = !/[()]/g.test(calc[0].innerHTML)

    //true se a conta atual termina com "("
    const END_BRACKS = /[(]$/g.test(calc[0].innerHTML)

    // console.log(END_BRACKS)

    // Verifica se é um abre parenteses
    if (NO_BRACKS || END_BRACKS) calc[0].innerHTML += "("
    else if (true) calc[0].innerHTML += ")"

    filter() 
}  