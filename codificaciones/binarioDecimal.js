const binarioDecimal = (message = '') => {
    console.log('init code')
    let vector = message.split('')

    let isNumber = true
    let isBinary = true

    for (let i = 0; i < vector.length; i++) {

        vector[i] = parseInt(vector[i])

        if (isNaN(vector[i])) {
            isNumber = false
            isBinary = false
        }

    }

    console.log('numero', vector)

    if (isNumber) {
        for (let i = 0; i < vector.length; i++) {
            if (!(vector[i] === 0 || vector[i] === 1)) {
                isBinary = false
            }
        }
    }

    console.log('number ', vector)

    let deciaml = 0

    let msgBin = []

    for (let i = 0; i < vector.length; i++) {
        msgBin[i] = vector[vector.length - 1 - i] 
    }

    console.log('number ', vector)

    if (isBinary) {

        for (let i = 0; i < msgBin.length; i++) {
            msgBin[i] = Math.pow(2, i) * msgBin[i]
            deciaml += msgBin[i]
        }
        console.log(vector)
        console.log(deciaml)

        return [vector.join(''), deciaml]

    } else {

        let msgNoBin = message.split('')

        for (let i = 0; i < msgNoBin.length; i++) {
            msgNoBin[i] = msgNoBin[i].charCodeAt().toString(2)
        }
        console.log(msgNoBin)

        msgNoBin = msgNoBin.join('').split('').reverse()
        let trama = []

        for (let i = 0; i < msgNoBin.length; i++) {
            trama[i] = msgNoBin[i] 
        }

        for (let i = 0; i < trama.length; i++) {
            trama[i] = Math.pow(2, i) * trama[i]
            deciaml += trama[i]
        }

        console.log(msgNoBin)

        return [msgNoBin.join(''), deciaml]

    }

}

export default binarioDecimal
