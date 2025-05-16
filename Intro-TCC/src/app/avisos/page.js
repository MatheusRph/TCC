'use client'

import './style.css'
import './../globals.css';
import { useState } from 'react';

function Avisos() {
    const [avisos, setnovoAviso] = useState('');
    const [mensagemVisivel, setMensagemVisivel] = useState(false);

    const enviarAviso = () => {
        if (avisos.trim() === '') {
            alert('Por favor, escreva algo antes de enviar!'); 
            return;
        }

        setMensagemVisivel(true);
        setTimeout(() => {
            setMensagemVisivel(false);
            setnovoAviso(''); 
        }, 3000);
    };

    return (
        <>
            <header>
                <div className="navbar">
                    <h1>AVISOS</h1>
                </div>
                <div className='logo'><img src="/icone.png" alt="Logo" /> </div>
                <div className="barra"></div>
            </header>

            <main>
                <div className='quadrado'>
                    <textarea
                        className='barras'
                        placeholder="Escreva aqui sua sugestão da semana..."
                        value={avisos}
                        onChange={(e) => setnovoAviso(e.target.value)}
                    />
                </div> 
                
                <div className='botao' onClick={enviarAviso}>
                    <div className='enviar'>
                        <h5>Enviar</h5>
                    </div>
                </div>

                {mensagemVisivel && (
                    <div className="mensagem">
                        <p>Seu aviso foi enviado com sucesso! ✅</p>
                    </div>
                )}
            </main>
        </>
    );
}

export default Avisos;
