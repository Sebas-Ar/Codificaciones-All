

const aritmetica = (mensaje) => {

    let vectorMensaje = Array.from(mensaje)

    //obtenemos los simbolos del mensaje sin repetición
    let uniqs = vectorMensaje.filter(function (item, index, array) { //aplicamos la funcion .filter para seleccionar
        return array.indexOf(item) === index;                          // los simbolos, ignorando las repeticiones
    })

    let cont = 0; // Contador de repeticiones de cada simbolo
    let amplitud = [] //
    let unico = []

    for (let i = 0; i < vectorMensaje.length; i++) { //Recorremos el vector del mensaje

        cont = 0 // inicializamos el contador que va a encontrar el numero de repericiones

        for (let j = 0; j < vectorMensaje.length; j++) { //comparamos la primera letra
            if (vectorMensaje[i] === vectorMensaje[j]) {   //y contamos un areptecición cada vez que
                cont = cont + 1;                             //esa primera letra sea encontrada al
            }                                              //recorrer el vector mensaje.
        }                                                //Asi con cada una de las letras

        amplitud[i] = [cont, vectorMensaje[i]]  //asignamos el numero de repeticiones a cada simbolo

    }

    for (let i = 0; i < uniqs.length; i++) {
        for (let j = 0; j < amplitud.length; j++) {
            if (uniqs[i] === amplitud[j][1]) {
                unico[i] = amplitud[j]
            }
        }
    }


    let vector = []
    for (let i = 0; i < uniqs.length; i++) {
        vector[i] = {
            i,
            simbolo: unico[i][1],
            probabilidad: (unico[i][0] / vectorMensaje.length)
        }
    }


    let sumaProbabilidades = 0
    let simbolosAB = []
    for (let i = 0; i < vector.length; i++) {
        simbolosAB[i] = vector[i];
    }

    for (const sim of simbolosAB) {
        sim.a = sumaProbabilidades
        sim.b = sim.probabilidad + sumaProbabilidades
        sumaProbabilidades += sim.probabilidad
    }

    let a = 0
    let b = 1
    let newA = 0
    let newMensage = []

    for (let i = 0; i < vectorMensaje.length; i++) {
        newMensage[i] = vectorMensaje[i];

    }

    for (let i = 0; i < newMensage.length; i++) {
        for (let j = 0; j < simbolosAB.length; j++) {
            if (newMensage[i] === simbolosAB[j].simbolo) {
                newMensage[i] = {
                    simbolo: newMensage[i],
                    a: simbolosAB[j].a,
                    b: simbolosAB[j].b
                }
            }
        }
    }

    for (const msg of newMensage) {
        newA = a
        a = a + ((b - a) * msg.a)
        b = newA + ((b - newA) * msg.b)
        newA = a
    }
    console.log('valor de a -> ' + a)
    console.log('valor de b -> ' + b)

    a += ''
    a = a.split('')
    if (a[a.length - 2] === '0' && a[a.length - 3] === '0' && a[a.length - 4] === '0') {
        a[a.length - 1] = '0'
    }

    let suma = '0.'
    if (a[a.length - 2] === '9' && a[a.length - 3] === '9' && a[a.length - 4] === '9') {
        for (let i = 2; i < a.length; i++) {
            if (i === a.length - 1) {
                suma += '4'
            } else {
                suma += '0'
            }
        }

        console.log(suma)
        suma = parseFloat(suma)
        a = a.join('')
        a = parseFloat(a)

        console.log(suma + ' + ' + a)

        a = a + suma

        a += ''
        a = a.split('')
        console.log('el tamaño es -> ' + a.length)
        if (a[a.length - 2] === '0' && a[a.length - 3] === '0' && a[a.length - 4] === '0') {
            a[a.length - 1] = '0'
        }
        a = a.join('')
        a = parseFloat(a)

    } else {
        a = a.join('')
        a = parseFloat(a)
    }


    cont = 0
    let binario = '0.'
    let binario2Decimal = 0
    let decimal = a
    let verificacion = 0

    a = a + ''

    while (cont < 100) {
        binario += Math.trunc(decimal * 2)

        if (decimal * 2 >= 1) {
            decimal = (decimal * 2) - 1

            for (let i = 2; i < binario.length; i++) {
                binario2Decimal += binario[i] * Math.pow(2, (-i + 1))
            }

            
            
            let str = binario2Decimal + ''
            
            if (str === a) {
                cont = 1000
            }

            for (let i = 0; i < a.length; i++) {
                if (a[i] === str[i]) {
                    verificacion++
                }
            }

            let final = parseInt(a[a.length - 1])

            if (verificacion === a.length - 1) {
                if (parseInt(str[a.length - 1]) === (final - 1)) {
                    if (str[a.length] >= 5) {
                        cont = 1000
                    }
                }
            }

        } else {
            decimal = decimal * 2
        }

        verificacion = 0
        binario2Decimal = 0
        cont++
    }

    console.log(binario)

    console.log(a)

    console.log('-------')
    console.log(newMensage)

    return [simbolosAB, binario.split('')]
}

export default aritmetica
