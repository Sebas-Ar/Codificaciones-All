const hamming = (mensaje) => {

    let msg = mensaje

    msg.push('final')

    // cuenta de bits a agregar (2^n)
    let n = 0;
    let trama = []
    let cuenta = 1
    let pos = 0
    let boolean = true

    while (boolean) {
        if (msg[pos] === 'final') {
            boolean = false
        } else {
            if (Math.pow(2, n) === cuenta) {
                trama[cuenta] = 'P' + (n + 1)
                n++
            } else {
                trama[cuenta] = msg[pos]
                pos++
            }
            cuenta++
        }
    }

    msg = msg.pop()

    trama.shift()

    let numeros = []

    for (let i = 0; i < trama.length; i++) {

        numeros[i] = i + 1

    }

    let FP = []

    for (let i = 0; i < n; i++) {
        FP[i] = new Array(0)
    }


    for (let i = 0; i < n; i++) {
        cuenta = 0
        for (let j = Math.pow(2, i) - 1; j < trama.length; j++) {
            if (cuenta < Math.pow(2, i)) {
                FP[i][j] = trama[j]
                cuenta++
            } else {
                FP[i][j] = '-'

                if (cuenta > Math.pow(2, i) - 2 + Math.pow(2, i)) {
                    cuenta = 0
                } else {
                    cuenta++
                }
            }
        }
    }

    for (let i = 0; i < FP.length; i++) {
        for (let j = 0; j < FP[0].length; j++) {
            if (FP[i][j] === undefined) {
                FP[i][j] = '-'
            }
        }
    }

    let agregados = []

    for (let i = 0; i < n; i++) {
        cuenta = 0
        for (let j = 0; j < FP[0].length; j++) {
            if (FP[i][j] === '1') {
                cuenta++
            }
        }

        if (cuenta % 2 === 0) {
            agregados.push(0)
        } else {
            agregados.push(1)
        }
    }

    for (let i = 0; i < n; i++) {

        FP[i].unshift('FP' + (Math.pow(2, i)))

    }

    let tramaFinal = []

    cuenta = 0
    for (let i = 0; i < trama.length; i++) {
        if (!(trama[i] === '0' || trama[i] === '1')) {
            tramaFinal[i] = agregados[cuenta] + ''
            cuenta++
        } else {
            tramaFinal[i] = trama[i]
        }
    }

    return tramaFinal

}

export default hamming