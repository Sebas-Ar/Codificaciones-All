const readVerticalHorizontal = (m, size, bool = false) => {
    let secuencia = []

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (bool) {
                secuencia.push(m[y][x])//lateral
            } else {
                secuencia.push(m[x][y])//vertical
            }
        }
    }

    return secuencia
}

const writeZigZag = (cuadrado, trama, cuenta) => {

    let M = []

    for (let i = 0; i < cuenta; i++) {
        M[i] = new Array(cuenta)
    }

    let cont = 0

    let x = 0
    let y = 0

    let lateral = false
    let vertical = false

    let mitad = false

    while (cont < cuadrado) {
        
        if (!(vertical && y === 0) && !(vertical && x === cuenta - 1)) {
            M[y][x] = trama[cont]
        }

        if (y === cuenta - 1) {
            mitad = true
        }

        if (mitad) {
            if (vertical) {
                if (x === cuenta - 1) {
                    vertical = false
                    lateral = false
                    cont--
                } else {
                    y--
                    x++
                }
            } else {
                if (lateral) {
                    if (y === cuenta - 1) {
                        x++
                        vertical = true
                    } else {
                        y++
                        x--
                    }
                } else {
                    if (x === cuenta - 1) {
                        y++
                        lateral = true
                    }

                }
            }
        } else {
            if (vertical) {
                if (y === 0) {
                    vertical = false
                    lateral = false
                    cont--
                } else {
                    y--
                    x++
                }
            } else {
                if (lateral) {
                    if (x === 0) {
                        y++
                        vertical = true
                    } else {
                        y++
                        x--
                    }
                } else {
                    if (y === 0) {
                        x++
                        lateral = true
                    }

                }
            }
        }

        cont++
    }

    return M
}

const codificar = (data = [''], size = 0) => {

    let cont = 0
    let repeticiones = []

    let carater = 0

    for (let i = 0; i < data.length; i++) {
        //data[i]
        if (data[i] === data[i + 1]) {
            carater = data[i]
            cont++
        } else {
            carater = data[i]
            cont++
            repeticiones.push([carater, cont, i])
            cont = 0
        }
    }

    /* setCaracterRepeticion(repeticiones) */

    console.log('repeticiones', repeticiones)

    let cuentaCaracter = 0
    let cuentaRepeticion = 0

    for (let i = 0; i < repeticiones.length; i++) {
        if (repeticiones[i][0] > cuentaCaracter) {
            cuentaCaracter = repeticiones[i][0]
        }
        if (repeticiones[i][1] > cuentaRepeticion) {
            cuentaRepeticion = repeticiones[i][1]
        }
    }

    /* setMasGrande([cuentaCaracter, cuentaRepeticion]) */

    let binarioCaracter = ''

    while (cuentaCaracter > 0) {
        if (cuentaCaracter % 2 == 0) {
            binarioCaracter += 0
        } else {
            binarioCaracter += 1
        }
        cuentaCaracter = Math.floor(cuentaCaracter / 2)
    }

    let binarioRepeticion = ''

    while (cuentaRepeticion > 0) {
        if (cuentaRepeticion % 2 == 0) {
            binarioRepeticion += 0
        } else {
            binarioRepeticion += 1
        }
        cuentaRepeticion = Math.floor(cuentaRepeticion / 2)
    }

    /* setNumBits([binarioCaracter.length, binarioRepeticion.length]) */


    let binarios = []

    for (let i = 0; i < repeticiones.length; i++) {

        let carc = repeticiones[i][0]
        let rep = repeticiones[i][1]

        let binCaracter = ''

        while (carc > 0) {
            if (carc % 2 == 0) {
                binCaracter += 0
            } else {
                binCaracter += 1
            }
            carc = Math.floor(carc / 2)
        }
        while (binCaracter.length < binarioCaracter.length) {
            binCaracter += '0'
        }

        let binRepeticiones = ''

        while (rep > 0) {
            if (rep % 2 == 0) {
                binRepeticiones += 0
            } else {
                binRepeticiones += 1
            }
            rep = Math.floor(rep / 2)
        }
        while (binRepeticiones.length < binarioRepeticion.length) {
            binRepeticiones += '0'
        }

        binarios[i] = [
            binCaracter.split('').reverse().join(''),
            binRepeticiones.split('').reverse().join(''),
            (i + 1) * 100
        ]

    }

    /* setTramas(binarios) */
    console.log('estos son los binarios ->')
    console.log(binarios)

    let tramaCompleta = ''

    for (let i = 0; i < binarios.length; i++) {
        tramaCompleta += binarios[i][0] + binarios[i][1]
    }

    /* setCodificado(tramaCompleta) */

    console.log(binarioCaracter.length * size + ' - ' + tramaCompleta.length + ' / ' + binarioCaracter.length * size)
    let tasa = ((binarioCaracter.length * size) - tramaCompleta.length) / (binarioCaracter.length * size)

    return [tasa * 100, tramaCompleta.split('')]

}

const rle = (mensaje) => {

    let trama = []

    let numeros = mensaje.split('') /* asignamos el numero ingresado a una variable */

    for (let i = 0; i < numeros.length; i++) {
        numeros[i] = numeros[i].charCodeAt()

    }

    for (let i = 0; i < numeros.length; i++) {
        numeros[i] = numeros[i].toString().split('')
    }

    let cont = 0
    for (let i = 0; i < numeros.length; i++) {
        for (let j = 0; j < numeros[i].length; j++) {
            trama[cont] = numeros[i][j]
            cont++
        }
    }

    cont = 0
    let cuadrado = 0

    while (cuadrado < trama.length) {
        cont++
        cuadrado = cont * cont
    }

    while (trama.length < cuadrado) {
        trama.push('0')
    }

    // matrix return
    let matriz = writeZigZag(cuadrado, trama, cont)
    
    let verticalRead = readVerticalHorizontal(matriz, cont, false)

    let horizontalRead = readVerticalHorizontal(matriz, cont, true)

    /* console.log('vertical')
    console.log(verticalRead)
    console.log('horizontal')
    console.log(horizontalRead)
    console.log('zig-zag')
    console.log(trama)

    console.log(matriz)

    console.log('codificar') */

    // frame codings

    let [codingVerticalRate, frameCodingVertical] = codificar(verticalRead, cont*cont)
    let [codingHorizontalRate, frameCodingHorizontal] = codificar(horizontalRead, cont * cont)
    let [codingZigZagRate, frameCodingZigZag] = codificar(trama, cont * cont)

    let comparationRate = [codingVerticalRate, codingHorizontalRate, codingZigZagRate]

    console.log('rate Vertical', codingVerticalRate)
    console.log('rate Horizontal', codingHorizontalRate)
    console.log('rate ZigZag', codingZigZagRate)

    let comparationFrame = [[ frameCodingVertical, 'Vertical' ], [ frameCodingHorizontal, 'Horizontal' ], [ frameCodingZigZag, 'ZigZag']]

    let comparation = -10000
    let higherPos = 0
    for (let i = 0; i < comparationRate.length; i++) {
        if (comparationRate[i] > comparation) {
            comparation = comparationRate[i]
            higherPos = i
        }
    }


    return [comparationFrame[higherPos], matriz]
}

export default rle