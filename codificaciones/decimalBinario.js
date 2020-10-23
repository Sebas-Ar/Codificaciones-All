const decimalBinario = (numero) => {

    let trama = ''

    let numeroDividido = numero.split('') /* asignamos el numero ingresado a una variable */
    let numeroEntero = numero.split('')

    for (let i = 0; i < numeroDividido.length; i++) {
        numeroDividido[i] = numeroDividido[i].charCodeAt()
    }

    let suma = ''
    let vectorNumeros = []

    let isNumber = true
    for (let i = 0; i < numeroEntero.length; i++) {
        numeroEntero[i] = parseInt(numeroEntero[i])
    }
    
    for (let i = 0; i < numeroEntero.length; i++) {
        if (isNaN(numeroEntero[i])) {
            isNumber = false
        }
    }

    let vector = [] /* inicializamos el vector donde guardaremos los binarios */
    let contador = 0 /* inicializamos un contador, el cual indicara la posicion del vector */
    let binario = ''

    if (isNumber) {
        suma = numero

        while (suma > 0) { /* implementamos un while que irá dividiendo el numero hasta que este sea menor a 0 */

            let division = suma /= 2 /* dividimos el numero entre 2 */
            if (division % 1 === 0) { /* si el resultado es un numero entero */
                vector[contador] = 0 /* asignamos un 0 a esa posicion del vector */
            } else { /* sino */
                vector[contador] = 1 /* asignamos un 1 a esa posicion del vector */
            }
            contador += 1 /* aumentamos el contador para pasar a la siguiente posicion del vector */
            suma = Math.floor(division); /* redondeamos el numero dividido por debajo, y lo reasgnamos al 
                                            valor que se leerá al principio del bucle */
        }

        trama = vector.reverse().toString().replace(/,/g, '') /* le damos la vuelta al vector, lo convertimos en una 
                                                            cadena de texto y retiramos las ',' */
        return trama
        
    } else {

        console.log('letras')
        
        for (const num of numeroDividido) {
            vectorNumeros.push(num)
        }
        console.log(vectorNumeros)

        for (let i = 0; i < vectorNumeros.length; i++) {
            
            let num = vectorNumeros[i]
            binario = ''
            while (num > 0) { /* implementamos un while que irá dividiendo el numero hasta que este sea menor a 0 */
    
                let division = num /= 2 /* dividimos el numero entre 2 */
                if (division % 1 === 0) { /* si el resultado es un numero entero */
                    binario += 0 /* asignamos un 0 a esa posicion del vector */
                } else { /* sino */
                    binario += 1 /* asignamos un 1 a esa posicion del vector */
                }
                
                num = Math.floor(division); /* redondeamos el numero dividido por debajo, y lo reasgnamos al 
                                                valor que se leerá al principio del bucle */
            }
            binario = binario.split('').reverse().join('')
            trama += binario

            console.log(trama)
        }

        return trama

    }

    console.log('numero')
    console.log(vectorNumeros)

}

export default decimalBinario