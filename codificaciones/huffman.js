const huffman = (mensaje) => {
    
    let cont = 0; // Contador de repeticiones de cada simbolo
    let amplitud = [] //
    let unico = []


    let vectorMensaje = Array.from(mensaje)

    //obtenemos los simbolos del mensaje sin repetición
    let uniqs = vectorMensaje.filter(function (item, index, array) { //aplicamos la funcion .filter para seleccionar
        return array.indexOf(item) === index;                          // los simbolos, ignorando las repeticiones
    })

    // -------- Obtenemos las veces que se repite cada simbolo en el mensaje ------------

    for (let i = 0; i < vectorMensaje.length; i++) { //Recorremos el vector del mensaje

        cont = 0 // inicializamos el contador que va a encontrar el numero de repericiones

        for (let j = 0; j < vectorMensaje.length; j++) { //comparamos la primera letra
            if (vectorMensaje[i] === vectorMensaje[j]) {   //y contamos un areptecición cada vez que
                cont = cont + 1;                             //esa primera letra sea encontrada al
            }                                              //recorrer el vector mensaje.
        }                                                //Asi con cada una de las letras

        amplitud[i] = cont + vectorMensaje[i]  //asignamos el numero de repeticiones a cada simbolo

        unico = amplitud.filter(function (item, index, array) {  //eliminamos los valores repetidos
            return array.indexOf(item) === index;
        })

    }


    // -------------- Ordenar por Probabilidad --------------------------
    let vectorProbabilidad = []
    let vectorOrdenado = []
    let vectorLetras = []
    let mayor = 0;
    let posicion = 0;
    let probabilidades = []

    // separamos las veces que se repite cada simbolo en un vector diferente.,
    // el cual será nuestro vector de probabilidad
    for (let i = 0; i < unico.length; i++) {
        vectorProbabilidad[i] = parseInt(unico[i].split('', 1), 10)//aplicamos parseInt para la repeticion a un entero,
        //                                                           luego .split para volverlo un vector y seleccionar el 
        //                                                           primer valor. que es el que guardamos.

        probabilidades[i] = parseInt(unico[i].split('', 1), 10)// este veclor es lo mismo que el anterior
    }


    // Ordenamos el vector de probabildad de mayor a menor
    // para poder ordenar los simbolos de mayor a menor probabilidad 

    for (let i = 0; i < unico.length; i++) { //elegimos el primero valor del vector

        mayor = 0 //inicializamos el valor que va a encontrar el valor mayor

        for (let j = 0; j < unico.length; j++) {//recorremos el vector nuevamente
            //                                              para poder compara el valor seleccionado
            //                                              con el resto

            if (mayor < vectorProbabilidad[j]) { //cada vez que encuentre un valor mayor
                mayor = vectorProbabilidad[j]      //almacenamos el valor
                posicion = j                       //almacenamos la posicion
            }

        }
        vectorOrdenado[i] = mayor + (i * (-.01)) //creamos el vector que se va ordenando de
        //                                             //mayor a menor ( multiplicamos por 0.1 para )
        //                                             //diferencial las posiciones

        vectorLetras[i] = uniqs[posicion] // del mismo modo que ordenamos las probabilidades,
        // ordenamos los simbolos

        vectorProbabilidad[posicion] = 0// finalmente volvemos 0 el valor mayor que encontramos 
        //                                       para no confundirlo con el siguiente valor mayor

        // ---------------- VOLVEMOS A REPETIR EL BUCLE HASTA ORDENAR AMBOS VECTORES
    }
    // ------------ empezar a sumar -----------------------------

    let suma = 0
    let sumaLetras = ''
    let pos = 0
    let binario = []

    // Empezamos a sumar de dercha a izquierda
    let i = vectorOrdenado.length
    while (i > 1) { // el buche se va repetir hasta la penultima posicion del vector
        suma = /* Math.ceil */(vectorOrdenado[i - 1] + vectorOrdenado[i - 2]) //sumamos las dos ultimas posiciones de las probabilidades
        sumaLetras = vectorLetras[i - 1] + vectorLetras[i - 2] //asi mismo juntamos las letras de esas posiciones
        binario.push('1' + vectorLetras[i - 1])//a esa letras, al de la derecha le agregamos un '1'
        binario.push('0' + vectorLetras[i - 2])//y al de la izquierda le agregamos un '0'

        vectorOrdenado.splice(vectorOrdenado.length - 2, 2)//Eliminamos las dos ultimas posiciones de la probabilidad
        vectorLetras.splice(vectorLetras.length - 2, 2)//Eliminamos las dos ultimas posiciones de los simbolos

        vectorOrdenado.push(suma)//agregamos la suma de las dos probalidades al final del vector de probabilidades
        vectorLetras.push(sumaLetras)//agregamso las letras juntadas al final del vector de letras

        vectorOrdenado.sort((a, b) => a - b).reverse() //ordenamos el vector de probabilidades de mayor a menor
        //                                               para ubicar el valor sumado en la posicion que debe estar

        for (let j = 0; j < vectorOrdenado.length; j++) {//encontramos la nueva posicion de ese valor sumado
            if (vectorOrdenado[j] === suma) {
                pos = j
            }
        }

        for (let j = (vectorLetras.length - 1); j >= pos; j--) {//Ubicamos las letras juntadas en la misma
            if (j === pos) {                                      //posicion que ubicamos la probabilidad
                vectorLetras[j] = sumaLetras
            } else {
                vectorLetras[j] = vectorLetras[j - 1]
            }
        }
        console.log(vectorLetras)

        for (let i = 0; i < vectorOrdenado.length; i++) {
            vectorOrdenado[i] = Math.ceil(vectorOrdenado[i])
        }

        for (let i = 0; i < vectorOrdenado.length; i++) {
            vectorOrdenado[i] = vectorOrdenado[i] + (i * (-.01))
        }


        i = i - 1 //pasamos a cambiar el indice, para poder sumar las nuevas ultimas posiciones del vector
    }

    binario = binario.reverse()
    console.log(binario);

    let letras = ''
    let unoCero = 0
    let newVector = []
    for (let i = 0; i < uniqs.length; i++) {
        newVector[i] = uniqs[i]
    }

    //Oredenamos los 0's y 1's correspondientes a cada simbolo
    for (let i = 0; i < binario.length; i++) {
        letras = binario[i]       //cada posicion del vector, lo volvemos
        letras = letras.split('') // un vector para poder trabajar con sus posiciones.

        for (let j = 1; j < letras.length; j++) {//para cada posicion 
            unoCero = letras[0]                    //sacamos el numero inicial que es 1 o 0

            for (let k = 0; k < uniqs.length; k++) {//y lo empezamos a ubicar cada uno de eso 0's o 1's,
                if (uniqs[k] === letras[j]) {         //en su respectiva letra
                    newVector[k] += (unoCero)
                }
            }
        }
    }


    let sumatoriaEntropia = 0
    let sumatoriaLongitud = 0
    let comp = 0
    let eficien = 0

    for (let i = 0; i < probabilidades.length; i++) {
        sumatoriaEntropia -= ((probabilidades[i] / vectorMensaje.length) * (Math.log2(probabilidades[i] / vectorMensaje.length)))
    }

    /* setEntropia(sumatoriaEntropia.toFixed(3)) */

    for (let i = 0; i < probabilidades.length; i++) {
        sumatoriaLongitud += (probabilidades[i] / vectorMensaje.length) * (newVector[i].length - 1)
    }

    /* setLongitud(sumatoriaLongitud.toFixed(3)) */

    comp = (Math.log2(uniqs.length) / sumatoriaLongitud)

    /* setCompresion(comp.toFixed(3)) */

    eficien = sumatoriaEntropia / sumatoriaLongitud

    /* setEficiencia(eficien.toFixed(3)) */

    console.log('vector')
    console.log(newVector)
    console.log(mensaje)

    let trama = ''
    let binarios = []

    for (let i = 0; i < newVector.length; i++) {
        binarios[i] = newVector[i]
    }

    for (let i = 0; i < binarios.length; i++) {
        binarios[i] = binarios[i].split('')
    }

    for (let i = 0; i < binarios.length; i++) {
        binarios[i].shift()
    }

    for (let i = 0; i < binarios.length; i++) {
        binarios[i] = binarios[i].join('')
    }

    console.log('binarios')
    console.log(binarios)


    for (let i = 0; i < mensaje.length; i++) {
        for (let j = 0; j < newVector.length; j++) {
            if (newVector[j][0] === mensaje[i]) {
                trama += binarios[j]
            }
        }
    }

    console.log(trama)

    //agregamos una flecha entre el simbolo y su secuancia Binaria
    for (let i = 0; i < newVector.length; i++) {
        newVector[i] = newVector[i].split('')
        newVector[i][0] = newVector[i][0] + ' -> '
    }

    /* setCodificacion(newVector) */

    return trama
    
}


export default huffman