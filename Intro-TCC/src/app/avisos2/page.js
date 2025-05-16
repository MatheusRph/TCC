'use client'

import './style.css'
import './../globals.css';
import { useState } from 'react';

function Avisos2() {


    return (
        <>
            <header>
                <div className="circle">
                    <img src="/logo3.png" alt="" />
                </div>
            </header>

            <main>
                <div className='quadrado'>
                    <div className='quadrados'>
                        <p>° [HOJE] Manutenção no sistema de interfone🚧</p>
                        <p> °[AMANHÃ] Desinsetização nas áreas comuns 🦟</p>
                        <p>°[PRÓXIMO FINAL DE SEMANA] Fechamento da garagem para pintura 🚗🎨</p>
                        <div className='editar'>
                            <div className='img2'>
                                <img src="/lixo.png" alt="" />
                                <img src="/editar.png" alt="" />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}

export default Avisos2;
