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

const createSecondMatriz = (Mleida) => {

    let Msecundaria = []

    for (let i = 0; i < Mleida.length; i++) {
        if (i === 0) {
            Msecundaria[i] = Mleida[i]
        } else {
            Msecundaria[i] = Mleida[i] - Mleida[i - 1]
        }
    }

    return Msecundaria

}

const zigZag = (matriz = [[]], largo) => {

    let cont = 0

    let x = 0
    let y = 0

    let lateral = false
    let vertical = false

    let mitad = false

    let secuencia = []

    while (cont < largo * largo) {

        if (!(vertical && y === 0) && !(vertical && x === largo - 1)) {
            secuencia.push(matriz[y][x])
        }

        if (y === largo - 1) {
            mitad = true
        }

        if (mitad) {
            if (vertical) {
                if (x === largo - 1) {
                    vertical = false
                    lateral = false
                    cont--
                } else {
                    y--
                    x++
                }
            } else {
                if (lateral) {
                    if (y === largo - 1) {
                        x++
                        vertical = true
                    } else {
                        y++
                        x--
                    }
                } else {
                    if (x === largo - 1) {
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

    const secondMatriz = createSecondMatriz(secuencia)
    /* setSecuencia(secondMatriz) */

    cont = 0

    x = 0
    y = 0

    lateral = false
    vertical = false

    mitad = false

    let secundary = []


    for (let i = 0; i < largo; i++) {
        secundary[i] = new Array(largo)
    }

    while (cont < largo * largo) {

        if (!(vertical && y === 0) && !(vertical && x === largo - 1)) {
            secundary[y][x] = secondMatriz[cont]
        }

        if (y === largo - 1) {
            mitad = true
        }

        if (mitad) {
            if (vertical) {
                if (x === largo - 1) {
                    vertical = false
                    lateral = false
                    cont--
                } else {
                    y--
                    x++
                }
            } else {
                if (lateral) {
                    if (y === largo - 1) {
                        x++
                        vertical = true
                    } else {
                        y++
                        x--
                    }
                } else {
                    if (x === largo - 1) {
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

    return [secundary, secondMatriz]
}

const horizontal = (matriz = [[]], largo) => {

    let secuencia = []

    for (let y = 0; y < largo; y++) {
        for (let x = 0; x < largo; x++) {
            secuencia.push(matriz[y][x])
        }
    }

    const secondMatriz = createSecondMatriz(secuencia)
    /* setSecuencia(secondMatriz) */
    let secundary = []

    for (let i = 0; i < matriz[0].length; i++) {
        secundary[i] = new Array(matriz[0].length)
    }

    let cont = 0

    for (let y = 0; y < largo; y++) {
        for (let x = 0; x < largo; x++) {
            secundary[y][x] = secondMatriz[cont]
            cont++
        }
    }
    return [secundary, secondMatriz]
}

const vertical = (matriz = [[]], largo) => {

    let secuencia = []

    for (let y = 0; y < largo; y++) {
        for (let x = 0; x < largo; x++) {
            secuencia.push(matriz[x][y])
        }
    }

    const secondMatriz = createSecondMatriz(secuencia)
    /* setSecuencia(secondMatriz) */
    let secundary = []

    for (let i = 0; i < matriz[0].length; i++) {
        secundary[i] = new Array(matriz[0].length)
    }

    let cont = 0

    for (let y = 0; y < largo; y++) {
        for (let x = 0; x < largo; x++) {
            secundary[x][y] = secondMatriz[cont]
            cont++
        }
    }

    return [secundary, secondMatriz]
}

const coding = (matriz = [[]], data = [[]], largo, secuencia) => {

    let MatrizPositiva = []

    let size = 0

    for (let i = 0; i < matriz[0].length; i++) {
        MatrizPositiva[i] = new Array(matriz[0].length)
    }

    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < largo; j++) {
            MatrizPositiva[i][j] = data[i][j]
        }
    }

    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < largo; j++) {
            MatrizPositiva[i][j] = Math.abs(MatrizPositiva[i][j])
        }
    }

    let mayor = 0

    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < largo; j++) {
            if (MatrizPositiva[i][j] >= mayor) {
                mayor = MatrizPositiva[i][j]
            }
        }
    }

    console.log('el número mayor es: ' + mayor)

    /* setMasGrande(mayor) */

    let binario = ''

    while (mayor > 0) {
        if (mayor % 2 == 0) {
            binario += 0
        } else {
            binario += 1
        }
        mayor = Math.floor(mayor / 2)
    }

    console.log('en binario es: ' + binario + ', tiene ' + binario.length + ' bits')

    /* setnumBits(binario.length) */

    console.log(secuencia)

    let tramaConSignos = []

    for (let i = 0; i < secuencia.length; i++) {

        let numero = Math.abs(secuencia[i])
        let numeroBinario = ''

        while (numero > 0) {
            if (numero % 2 == 0) {
                numeroBinario += 0
            } else {
                numeroBinario += 1
            }
            numero = Math.floor(numero / 2)
        }
        while (numeroBinario.length < binario.length) {
            numeroBinario += '0'
        }

        if (secuencia[i] >= 0) {
            tramaConSignos.push({
                signo: 0 + '',
                trama: numeroBinario.split('').reverse().join('')
            })
        } else {
            tramaConSignos.push({
                signo: 1 + '',
                trama: numeroBinario.split('').reverse().join('')
            })
        }
    }

    size = (binario.length + 1) * secuencia.length

    let completFrame = []

    for (let i = 0; i < tramaConSignos.length; i++) {
        
        completFrame[i] = tramaConSignos[i].signo + tramaConSignos[i].trama
    }

    completFrame = completFrame.join('')
    completFrame = completFrame.split('')

    return [completFrame, tramaConSignos, size, binario.length]
/* setTramas(tramaConSignos) */
}

const dpcm = (mensaje) => {
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

    console.log('matrices Z V H')
    let [matrizZ, frameZ] = zigZag(matriz, cont)
    let [matrizV, frameV] = vertical(matriz, cont)
    let [matrizH, frameH] = horizontal(matriz, cont)

    /* ----------------- codificación ------------- */

    console.log('--------coding-----------')
    
    let [secundaryFrameZ, signoZ, sizeZ, smallFrameZ] = coding(matriz, matrizZ, cont, frameZ)
    let [secundaryFrameV, signoV, sizeV, smallFrameV] = coding(matriz, matrizV, cont, frameV)
    let [secundaryFrameH, signoH, sizeH, smallFrameH] = coding(matriz, matrizH, cont, frameH)

    let compSecundary = [[matrizZ, 'Zig-Zag'], [matrizV, 'Vertical'], [matrizH, 'Horizontal']]
    let compSize = [sizeZ, sizeV, sizeH]

    let compSmallFrame = [smallFrameZ, smallFrameV, smallFrameH]

    let compFrame = [secundaryFrameZ, secundaryFrameV, secundaryFrameH]

    let compSigno = [signoZ, signoV, signoH]

    let count = 0
    let pos = 0
    for (let i = 0; i < compSize.length; i++) {
        if (compSize[i]> count) {
            count = compSize[i]
            pos = i
        }
    }

    return [matriz, compSecundary[pos], compSigno[pos], compFrame[pos], compSmallFrame[pos]]
}


export default dpcm