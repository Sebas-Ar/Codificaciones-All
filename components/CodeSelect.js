import React from 'react'

const CodeSelect = (props) => {


    const style = (type, num) => {
        return {
            color: type === num ? 'white' : '',
            transform: type === num ? 'scale(1.2)' : ''
        }
    }

    const selected = (num) => {
        props.handleCod()
        props.changeSeleccionCod(!props.seleccionCod)
        props.changeCodeType(num)
    }

    return (
        <div className="content">
            
            <section>
                <svg viewBox="0 0 512 512" onClick={() => {props.changeSeleccionCod(!props.seleccionCod)}}>
                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" />
                </svg>
                <h2>Seleccione una Codificación</h2>
                <ul>
                    <li onClick={() => { selected(2) }} style={style(props.codType, 2)}>Conversión Binario a Decimal</li>
                    <li onClick={() => { selected(1) }} style={style(props.codType, 1)}>Conversión Decimal a Binario</li>
                    <li onClick={() => { selected(3) }} style={style(props.codType, 3)}>Huffman</li>
                    <li onClick={() => { selected(4) }} style={style(props.codType, 4)}>Shannon-Fano</li>
                    <li onClick={() => { selected(5) }} style={style(props.codType, 5)}>Aritmética</li>
                    <li onClick={() => { selected(6) }} style={style(props.codType, 6)}>Algebraica Modificada</li>
                    <li onClick={() => { selected(7) }} style={style(props.codType, 7)}>RLE</li>
                    <li onClick={() => { selected(8) }} style={style(props.codType, 8)}>DPCM</li>
                </ul>

            </section>

            <style jsx>{`
                
                .content {
                    visibility: ${props.seleccionCod ? 'visible' : 'hidden'};
                    opacity: ${props.seleccionCod ? '1' : '0'};
                }

                section {
                    transform: ${props.seleccionCod ? 'translateY(0%)' : 'translateY(-100%)'};
                }
                
            `}</style>

            <style jsx>{`
                
                .content {
                    display: grid;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #33333388;
                    z-index: 1000;
                    font-family: sans-serif;
                    transition: opacity .5s;
                }

                h2 {
                    color: white;

                }

                section {
                    position: relative;
                    justify-self: center;
                    align-self: center;
                    background: #222222;
                    border-radius: 30px;
                    padding: 30px 70px;
                    transition: transform .5s;
                }

                svg {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    height: 25px;
                    color: #dddddd;
                    cursor: pointer;
                    transition: transform .5s, color .5s;
                }

                svg:hover {
                    transform: scale(1.2);
                    color: white;
                }

                ul {
                    list-style: none;
                    padding: 0;
                }

                li {
                    color: #888888;
                    cursor: pointer;
                    text-align: center;
                    margin: 10px 0;
                    transition: transform .5s, color .5s;
                }
                
                li:hover {
                    color: white;
                    transform: scale(1.2);
                }
                
            `}</style>
        </div>
    )
}

export default CodeSelect
