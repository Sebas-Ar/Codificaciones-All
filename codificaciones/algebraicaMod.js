const algebraicaMod = (mensaje) => {

    let vectorMensaje = Array.from(mensaje)

    let alfabeto = vectorMensaje.filter(function (item, index, array) {  // aplicamos la funcion .filter para seleccionar
        return array.indexOf(item) === index;                                   // los simbolos, ignorando las repeticiones
    })

    let numerosAlfabeto = []

    for (let i = 0; i < alfabeto.length; i++) {
        numerosAlfabeto[i] = i
    }

    let base = numerosAlfabeto[numerosAlfabeto.length - 1] + 1

    let numerosMensaje = []
    let arrayMensaje = Array.from(mensaje)

    for (let i = 0; i < arrayMensaje.length; i++) {
        for (let j = 0; j < alfabeto.length; j++) {
            if (arrayMensaje[i] === alfabeto[j]) {
                numerosMensaje[i] = numerosAlfabeto[j]
            }
        }
    }

    let numeroDecimal = "0."

    for (let i = 0; i < numerosMensaje.length; i++) {
        numeroDecimal += numerosMensaje[i]
    }

    let L = numerosMensaje.length

    let decimal = 0
    let num = '0.';

    for (let i = 0; i < numerosMensaje.length; i++) {
        decimal += numerosMensaje[i] * Math.pow(base, (-i - 1))
    }

    for (let i = 0; i < numerosMensaje.length; i++) {
        num += numerosMensaje[i]
    }

    let activo = 0
    let binario = '0.'
    let binario2Decimal = 0
    let decimal2Base = '0.'
    let cont = 0


    while (activo < 30) {

        binario += Math.trunc(decimal * 2)

        if (decimal * 2 >= 1) {

            decimal = (decimal * 2) - 1

            for (let i = 2; i < binario.length; i++) {
                binario2Decimal += binario[i] * Math.pow(2, (-i + 1))

                let dec = binario2Decimal
                let cuenta = 0

                while (cuenta < 30) {

                    decimal2Base += Math.trunc(dec * base)
                    let entero = Math.trunc(dec * base)
                    dec = (dec * base) - entero

                    for (let j = 2; j < decimal2Base.length; j++) {

                        if (num[j] === decimal2Base[j]) {
                            cont++
                        } else {
                            cont--
                        }

                    }
                    if (cont === L - 1) {
                        if ((dec * base) >= (num[L + 1] - 0.5)) {
                            decimal2Base += num[L + 1]
                            activo = 100
                            cuenta = 100
                        }
                    }
                    cont = 0
                    cuenta++
                }

                decimal2Base = '0.'
            }



        } else {
            decimal = decimal * 2
        }

        binario2Decimal = 0
        activo++
    }

    binario = binario.split('')

    console.log(binario)

    return binario

}

export default algebraicaMod