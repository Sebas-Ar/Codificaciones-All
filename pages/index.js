import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'
import Swal from 'sweetalert2'
import CodeSelect from '../components/CodeSelect'
import decimalBinario from "../codificaciones/decimalBinario";
import huffman from "../codificaciones/huffman";
import hamming from "../codificaciones/hamming"
import shannonFano from '../codificaciones/shannonFano'
import AlgebraicaMod from '../codificaciones/algebraicaMod'
import UserManual from '../components/UserManual'
import rle from '../codificaciones/rle'
import dpcm from '../codificaciones/dpcm'
import aritmetica from '../codificaciones/aritmetica'
import binarioDecimal from '../codificaciones/binarioDecimal'

const Home = () => {

    const [codType, setCodType] = useState(0);
    const [seleccionCod, setSeleccionCod] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [trama, setTrama] = useState([]);
    const [activate, setActivate] = useState(false);
    const [tramaParejas, setTramaParejas] = useState([{}]);
    const [tramaParejas2, setTramaParejas2] = useState([{}]);
    const [errores, setErrores] = useState('');
    const [bits, setBits] = useState([]);
    const [M, setM] = useState([[]]);
    const [largo, setlargo] = useState(0);
    const [matrixExist, setMatrixExist] = useState(false);
    const [matrixExistSecond, setMatrixExistSecond] = useState(false);
    const [readType, setReadType] = useState('');
    const [secondMatriz, setSecondMatriz] = useState([[]]);
    const [activeDCPM, setActiveDCPM] = useState(false)
    const [tramaDPCM, settramaDPCM] = useState([{}]);
    const [simbolos, setSimbolos] = useState([{}]);
    const [activeArit, setActiveArit] = useState(false);
    const [decimal, setdecimal] = useState(0);
    const [isDecial, setIsDecial] = useState(false);

    const changeSeleccionCod = (bool) => {
        setSeleccionCod(bool)
    }

    const changeCodeType = (type) => {
        setCodType(type)
    }

    const onChangeMensaje = (e) => {

        let vectorMensaje = Array.from(e.target.value)

        let sinRepeticiones = vectorMensaje.filter(function (item, index, array) {  // aplicamos la funcion .filter para seleccionar
            return array.indexOf(item) === index;                                   // los simbolos, ignorando las repeticiones
        })

        if (sinRepeticiones.length > 8) {

            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Oops...',
                text: 'el mensaje no puede contenet más de 8 simbolos diferentes',
                showConfirmButton: false,
                timer: 2000
            })

        } else {

            setMensaje(e.target.value)

        }
            
    }

    const handleCod = () => {
        setActivate(true)
    }

    const handleMenu = () => {
        setSeleccionCod(!seleccionCod);
        setActivate(false)
    }

    const codificar = (tramaLeida) => {

        let tramaP = [{}]
        let tramaP2 = [{}]

        let bits16 = []

        for (let i = 0; i < 16; i++) {
            
            bits16[i] = tramaLeida[i]
            
        }

        for (let i = 0; i < bits16.length; i++) {
            tramaP[i] = {
                bit1: bits16[i],
                bit2: bits16[i + 1]
            }
        }
        
        let intentos = 0
        let cuenta = 0
        let pos = 0

        while (intentos < 32 ) {
            if ( cuenta === 0) {
                if (bits16[pos] !== undefined) {
                    tramaP2[intentos] = {
                        bit1: bits16[pos],
                        bit2: '0'
                    }
                } else {
                    tramaP2[intentos] = {
                        bit1: undefined,
                        bit2: undefined
                    }
                }
                cuenta ++
            } else {
                if (bits16[pos + 1] !== undefined || bits16[pos] !== undefined) {
                    tramaP2[intentos] = {
                        bit1: '0',
                        bit2: bits16[pos + 1]
                    }
                } else {
                    tramaP2[intentos] = {
                        bit1: undefined,
                        bit2: undefined
                    }
                }
                cuenta = 0
                pos ++
            } 
            intentos++
        }

        setTramaParejas(tramaP)
        setTramaParejas2(tramaP2)

        return bits16

    }

    const clase = (bit1, bit2, height) => {

        if (bit2 === undefined) {
            if (bit1 === '0') {
                return height + ' cero-cero'
            } else if (bit1 === '1') {
                return height + ' uno-uno'
            } else {
                return height
            }
        } else {

            if (bit1 === '0' && bit2 ==='0') {
                return height + ' cero-cero'
            }
            if (bit1 === '0' && bit2 ==='1') {
                return height + ' cero-uno'
            }
            if (bit1 === '1' && bit2 ==='1') {
                return height + ' uno-uno'
            }
            if (bit1 === '1' && bit2 ==='0') {
                return height + ' uno-cero'
            }

        }
    }

    const handleTItle = (type) => {
        let title = ''
        if (type === 1) {
            title = 'Conversión Decimal a Binario'
        } else if (type === 2) {
            title = 'Conversión Binario a Decimal'
        } else if (type === 3) {
            title = 'Huffman'
        } else if (type === 4) {
            title = 'Shannon - Fano'
        } else if (type === 5) {
            title = 'Aritmética'
        } else if (type === 6) {
            title = 'Algebraica Modificada'
        } else if (type === 7) {
            title = 'RLE'
        } else if (type === 8) {
            title = 'DPCM'
        }

        return title
    }

    useEffect(() => {

        let result = []
        let matrixNeed = false
        let readMatrix = ''
        let matrix = [[]]
        let size = 0
        let second = [[]]
        let matrixNeedSecond = false
        let resultDCPM = [{}]
        let actDCPM = false
        let actAritmetic = false
        let dec = false

        if ( codType === 1 ) {
            
            result = decimalBinario(mensaje).split('')

        } else if (codType === 2 ) {

            let [trama, num] = binarioDecimal(mensaje)

            result = trama.split('')
            setdecimal(num)
            dec = true

        } else if (codType === 3 ) {

            result = huffman(mensaje).split('')

        } else if (codType === 4 ) {

            result = shannonFano(mensaje).split('')
            
        } else if (codType === 5 ) {

            let [sims, frameFloat] = aritmetica(mensaje)
            setSimbolos(sims)
            frameFloat.shift()
            frameFloat.shift()
            result = frameFloat
            actAritmetic = true
            
        } else if (codType === 6 ) {
            let vector = AlgebraicaMod(mensaje)
            vector.shift()
            vector.shift()
            vector.join('')
            result = vector
            
        } else if (codType === 7 ) {

            let [info, m] = rle(mensaje)
            console.log('------------ en la app--------')
            console.log(info[0],info[1])
            result = info[0]
            readMatrix = info[1]
            matrix = m
            size = m[0].length
            matrixNeed = true
            
        } else if (codType === 8 ) {

            let [m, secundary, signo, info, smallFrame] = dpcm(mensaje)
            console.log(smallFrame)
            result = info
            resultDCPM = signo
            console.log(signo)
            second = secundary[0]
            readMatrix = secundary[1]
            matrix = m
            size = m[0].length
            matrixNeed = true
            matrixNeedSecond = true
            actDCPM = true
            
        }
        
        setIsDecial(dec)
        setActiveArit(actAritmetic)
        settramaDPCM(resultDCPM)
        setActiveDCPM(actDCPM)
        setMatrixExistSecond(matrixNeedSecond)
        setSecondMatriz(second)
        setMatrixExist(matrixNeed)
        setTrama(result)
        setReadType(readMatrix)
        setBits(codificar(hamming(result)))
        setErrores(setColor(hamming(result)))
        console.log('.....................')
        console.log(setColor(hamming(result)))
        console.log(hamming(result))
        setlargo(size)
        setM(matrix)


    }, [codType, seleccionCod]);

    const setColor = (hamming) => {

        let count = 0
        for (let i = 0; i < hamming.length; i++) {
            if (i + 1 === Math.pow(2, count)) {
                hamming[i] = {
                    value : hamming[i],
                    color : true
                }
                count ++
            } else {
                hamming[i] = {
                    value: hamming[i],
                    color: false
                }
            }
        }

        return hamming
    }

    return (
        <div className="container">

            <Head>
                <title>Proyecto Final</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>PROYECTO FINAL</h1>

            <CodeSelect 
                seleccionCod={seleccionCod}
                changeSeleccionCod={changeSeleccionCod} 
                codType={codType}
                changeCodeType={changeCodeType}
                handleCod={handleCod}
            />

            <UserManual />

            <div className="content">

                <main className="completo">
                    <label>
                        Ingrese la trama a codificar: <br /><br />
                        <input type="text" onChange={onChangeMensaje} value={mensaje} />
                    </label>

                    <button onClick={handleMenu}>Codificar</button>
                </main>

                {
                    activate
                        ?
                        <main className="completo">
                            <h2>{handleTItle(codType)}</h2>
                            <section style={{ display: matrixExistSecond ? 'grid' : '', gridTemplateColumns: '1fr 1fr', gap: '0 20px'}}>
                            {
                                matrixExist
                                    ?
                                    <>
                                        <div className="matriz">
                                            {
                                                M.map(fill => (
                                                    <>
                                                        {
                                                            fill.map((ma, index) => (
                                                                <span key={index}>{ma}</span>
                                                            ))
                                                        }
                                                    </>
                                                ))
                                            }
                                        </div>
                                        <br />
                                        {
                                            matrixExistSecond
                                            ?
                                                <>
                                                    <div className="matriz" style={{gridRow: '1/2', gridColumn: '2/3'}}>
                                                        {
                                                            secondMatriz.map(fill => (
                                                                <>
                                                                    {
                                                                        fill.map((ma, index) => (
                                                                            <span key={index}>{ma}</span>
                                                                        ))
                                                                    }
                                                                </>
                                                            ))
                                                        }
                                                    </div>
                                                    <br/>
                                                </>
                                            :
                                                ''
                                        }
                                    </>

                                    :
                                    ''
                            }
                            </section>
                            {
                                matrixExist
                                ?
                                    <>
                                    <p>La lectura más eficiente es: {readType}</p>
                                    <br />
                                    </>
                                :
                                    ''
                            }

                            {
                                activeArit
                                ?
                                    <>
                                        <div className="grafica">
                                            <div className="lineaGrafica">
                                                {
                                                    simbolos.map(sim => (
                                                        <span className="numero" style={{ left: `${sim.a * 700}px`, margin: '0' }}>{sim.a.toFixed(3)}</span>
                                                    ))
                                                }
                                                {
                                                    simbolos.map(sim => (
                                                        <div className="punto" style={{ left: `${sim.a * 700}px` }}></div>
                                                    ))
                                                }
                                                {
                                                    simbolos.map(sim => (
                                                        <span className="letra weight" style={{ left: `${sim.b * (700 / 2) + sim.a * (700 / 2)}px`, margin: '0' }}>{sim.simbolo}</span>
                                                    ))
                                                }
                                                <div className="punto" style={{ left: '700px' }}></div>
                                                <span className="numero" style={{ left: '700px', margin: '0' }}>1</span>
                                            </div>
                                        </div>
                                        <br/>
                                    </>
                                :
                                ''
                            }
                            
                            <p>Trama resultante:</p>
                            <br/>
                            
                            {
                                activeDCPM
                                ?
                                    <p className="overflow">
                                        {
                                            tramaDPCM.map(trama => (
                                                <>
                                                    <span style={{color: 'blue'}}>{trama.signo}</span><span>{trama.trama}</span>
                                                </>
                                            ))
                                        }
                                    </p>
                                :
                                    <p className="overflow">{trama.join('')}</p>    
                            }

                            {
                                isDecial
                                    ?
                                    <>
                                        <br/>
                                        <p>Valor en decimal:</p>
                                        <br/>
                                        <p className="overflow">{decimal}</p> 
                                    </>
                                    :
                                    ''

                            }
                        </main>
                        :
                        ''
                }

                {
                    activate
                        ?
                        <main className="completo">
                            <h2>Codificación Hamming</h2>
                            <p>Trama resultante:</p>
                            <br/>
                            <p className="overflow">
                                {
                                    errores.map(err => (
                                        <span style={{color: err.color ? 'red' : 'white'}}>{err.value}</span>
                                    ))    
                                }
                            </p>
                        </main>
                        :
                        ''
                }

                {
                    activate
                        ?
                        <main className="completo">
                            <p>Codificación de Linea</p> 
                            <br/>
                            <div className="linea">
                                {
                                    bits.map((bit, index) => (
                                        <span key={index} className="bits">{bit}</span>
                                    ))
                                }
                            </div>
                            <br/>
                            <p>Unipolar NRZ</p>
                            <br/>
                            <div className="linea eje1">
                                {
                                    tramaParejas.map((bit, index) => (
                                        <span key={index} className={clase(bit.bit1, bit.bit2, 'unipolar')}></span>
                                    ))
                                }
                            </div>
                            <br />
                            <p>Unipolar RZ</p>
                            <br />
                            <div className="linea1 eje1">
                                {
                                    tramaParejas2.map((bit, index) => (
                                        <span key={index} className={clase(bit.bit1, bit.bit2, 'unipolarRZ')}></span>
                                    ))
                                }
                            </div>
                            <br/>
                            <p>Bipolar NRZ</p>
                            <br/>
                            <div className="linea eje">
                                {
                                    tramaParejas.map((bit, index) => (
                                        <span key={index} className={clase(bit.bit1, bit.bit2, 'bipolar')}></span>
                                    ))
                                }
                            </div>
                        </main>
                        :
                        ''
                }

            </div>


            <Footer />

            <style jsx>{`

                .grafica {
                    margin-top: 32px;
                }

                .numero{
                    font-size: 11px;
                }
                .lineaGrafica {
                    width: 700px;
                    height: 3px;
                    background: white;
                    position: relative;
                }

                .numero {
                    position: absolute;
                    top: -35px;
                    transform: translateX(-45%);
                }

                .punto {
                    position: absolute;
                    top: -10px;
                    width: 3px;
                    height: 23px;
                    background: white;
                }

                .letra {
                    position: absolute;
                    top: -20px;
                    transform: translateX(-50%);
                }

                .weight {
                    font-weight: 600;
                }

                .overflow {
                    text-align: center;
                    width: 300px;
                    word-wrap: break-word;
                }

                .matriz {
                    display: grid;
                    grid-template-columns: repeat(${largo}, 1fr);
                }

                .linea {
                    display: grid;
                    grid-template-columns: repeat(16, 1fr);
                    position: relative;
                }

                .linea1 {
                    display: grid;
                    grid-template-columns: repeat(32, 1fr);
                    position: relative;
                }

                .eje:before, .eje1:before {
                    content: '';
                    position: absolute;
                    height: 2px;
                    width: 100%;
                    background: #333333;
                    z-index: -1;
                }

                .eje:before {
                    top: 50%;
                    transform: translateY(-50%);
                }

                .eje1:before {
                    bottom: 0;
                }

                .bipolar {
                    display: block;
                    height: 60px;
                    width: 40px;
                }

                .unipolar {
                    display: block;
                    height: 30px;
                    width: 40px;
                }

                .unipolarRZ {
                    display: block;
                    height: 30px;
                    width: 20px;
                }

                                    /*------------- bit Estados  */
                .cero-cero {
                    border-bottom: 1px solid white;
                }

                span {
                    color: white;
                }

                .matriz > span {
                    font-size: 12px;
                    display: grid;
                    justify-items: center;
                    align-items: center;
                    width: 30px;
                    height: 30px;
                    border: 1px dashed white;
                    text-align: center;
                }

                .cero-uno {
                    border-bottom: 1px solid white;
                    border-right: 1px solid white;
                }

                .uno-uno {
                    border-top: 1px solid white;
                }

                .uno-cero {
                    border-top: 1px solid white;
                    border-right: 1px solid white;
                }

                .bits {
                    display: block;
                    height: 20px;
                    width: 40px;

                    border-left: 1px solid #333333;
                }

                .bits:last-child {
                    border-right: 1px solid #333333;
                }

                .completo {
                    grid-column: 1/3;
                }

                .cuadro {
                    display: inline-block;
                    border: 1px solid white;
                    width: 22px;
                    height: 22px;
                }

                .sinCuadro {
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                }

                .matriz {
                    displya: grid;
                }

                h1, h2 {
                    color: white;
                    text-align: center;
                }

                h2 {
                    margin-top: 0;
                }

                .content {
                    display: grid; 
                    grid-template-columns: ${ activate ? '1fr 1fr' : '1fr'};
                }

                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                label {
                    display: grid;
                    justify-items: center;
                    color: white;
                }

                input {
                    height: 30px;
                    border-radius: 20px;
                    border: 1px solid #33333344;
                    padding: 10px;
                    outline: none;
                    text-align: center;
                }

                select {
                    padding: 0px 10px;
                }

                main {
                    padding: 5rem 0;
                    display: grid;
                    align-items: center;
                    justify-items: center;
                    border-radius: 30px;
                    margin: 10px;
                    padding: 30px;
                    background: #2C3E5044;
                }

                main > div {
                    color: white;
                    text-align: center;
                }

                :globla(body) {
                    background: linear-gradient(180deg, #bdc3c7 0%, #3B4371 100%);
                }

                p {
                    color: white;
                    margin: 0;
                }

                button {
                    border: none;
                    padding: 10px 30px;
                    border-radius: 30px;
                    background-color: #528B90;
                    color: white;
                    cursor: pointer;
                    transition: background-color 1s;
                    outline: none;
                    margin: 16px 0;
                }

                button:hover {
                    background-color: #51A8A7;
                }

            `}</style>

            <style jsx global>{`

              html, body {
                  padding: 0;
                  margin: 0;
                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                  Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
              }

              * {
                  box-sizing: border-box;
              }

      `}</style>

        </div>
    )
}

export default Home