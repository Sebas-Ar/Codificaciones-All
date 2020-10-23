import React from 'react'

const UserManual = () => {
    return (
        <div className="content">
            <div className="message">
                <p>Puede Descargar el manual de usuario aqui</p>
            </div>
            <a href="/Manual_de_Usuario.pdf" download="/Manual de Usuario.pdf">
                <svg viewBox="0 0 384 512">
                    <path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z" />
                </svg>
            </a>

            <style jsx>{`

                .message {
                    position: absolute;
                    background: white;
                    width: 200px;
                    left: -200px;
                    top: 45px;
                    padding: 10px 10px 10px 15px;
                    border-radius: 30px 0 30px 30px;
                    opacity: 0.9;
                    transform: translateX(300px);
                    box-shadow: -5px 5px 10px 0px #333333;
                    animation: aparecer 10s 2s forwards;
                }

                @keyframes aparecer {
                    0% {
                        transform: translateX(300px);
                    }

                    5% {
                        transform: translateX(0px);
                    }

                    90% {
                        opacity: 0.9
                        transform: translateX(0px);
                    }

                    99% {
                        visibility: visible;
                    }

                    100% {
                        visibility: hidden;
                        opacity: 0;
                        transform: translateX(0px);
                    }
                }

                p {
                    margin: 0;
                }
                
                .content {
                    position: fixed;
                    display: grid;
                    top: 30px;
                    right: 30px;
                    height: 50px;
                    width: 50px;
                    background-color: #528B90;
                    border-radius: 50%;
                    transition: background-color .5s;
                }    

                .content:hover {
                    background-color: #51A8A7;
                }

                svg, a {
                    width: 25px;
                    color: white;
                    align-self: center;
                    justify-self: center;
                }

                a {
                    display: grid;
                    height: 50px;
                    width: 50px;
                    background-color: #528B90;
                    border-radius: 50%;
                    transition: transform .5s;
                }

                a:hover {
                    transform: scale(1.2);
                }
                
            `}</style>
        </div>
    )
}

export default UserManual
