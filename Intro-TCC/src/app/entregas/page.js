'use client'
import { useEffect, useState } from 'react';
import './../globals.css';
import './style.css'

function Entregas() {

    const [listaEntregas, setListaEntregas] = useState([]);

    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                const response = await fetch('http://localhost:3001/entregas/ver', {
                    method: 'GET',
                    credentials: 'include', // Isso aqui envia o cookie da sessão!
                });

                if (!response.ok) throw new Error('Erro ao buscar entregas');

                const data = await response.json();
                setListaEntregas(data.response);
            } catch (err) {
                console.error('Erro ao buscar entregas:', err);
            }
        };

        fetchEntregas();
    }, []);


    return (
        <>
            <header>
            <div className="navbar">
        <div className='logo'>
                        <img src="/icone.png" alt="" />
                        <h1>COND TRACK</h1>
                        <h2>Entregas</h2>
                    </div>
        </div>
                <div className="barra"></div>
            </header>

            <main>
                <div className='barras'>
                    {listaEntregas.map((entrega) => (
                        <div className='pendentes' key={entrega.id}>
                            <p>{entrega.responsavel} – Item: {entrega.item} – Ramal: {entrega.ramal_id}</p>
                            <div className='botao'></div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default Entregas;