'use client'
import './style.css'
import './../globals.css';
import { useEffect, useState } from 'react';

function AdicionarEntregas() {
    const [listaEntregas, setListaEntregas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [entrega, setEntrega] = useState('');
    const [ramal, setRamal] = useState('');
    const [erroEntrega, setErroEntrega] = useState('');


    const abrirModal = () => setShowModal(true);
    const fecharModal = () => {
        setShowModal(false);
        setEntrega('');
        setRamal('');
    };

    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                const response = await fetch('api/entregas/ver', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text(); // ou .json() se o back-end retornar JSON
                    throw new Error(`Erro ao criar sugestão: ${response.status} - ${errorText}`);
                }

                const data = await response.json();
                setListaEntregas(data.response);
            } catch (err) {
                console.error('Erro ao buscar entregas:', err);
            }
        };

        fetchEntregas();
    }, []);

    const criarEntrega = async () => {
        try {
            const response = await fetch('/api/entregas/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    item: entrega,
                    responsavel: ramal
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                setErroEntrega(`${errorText}`);
                return; // Não fecha o modal se houver erro
            }

            alert('Entrega criada com sucesso!');
            fecharModal();
        } catch (err) {
            console.error('Erro ao criar sugestão:', err);
            setErroEntrega('Erro inesperado ao criar entrega.');
        }
    };
    return (
        <>
            <header>
                <div className="navbar">
                    <div className='logo'>
                        <img src="/icone.png" alt="" />
                        <h1>COND TRACK</h1>
                        <button className="btn-entregas" onClick={abrirModal}>Adicionar Entregas</button>
                    </div>
                </div>
                <div className="barra"></div>
            </header>

            <main>
                <div className='barras mb-2'>
                    {listaEntregas.length === 0 ? (
                        <p className="text-center text-muted">Nenhuma entrega pendente.</p>
                    ) : (
                        listaEntregas.map((entrega) => (
                            <div className='pendentes' key={entrega.id}>
                                <p>
                                    <strong>Item:</strong> {entrega.item} <br></br> <strong>Ramal:</strong> {entrega.ramal_id}
                                </p>
                                <div className='botao'></div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {showModal && (
                <div className="custom-backdrop">
                    <div className="custom-popup">
                        <h2>Criar Entrega</h2>

                        {erroEntrega && (
                            <p className="erro-entrega">{erroEntrega}</p>
                        )}

                        <input
                            type="text"
                            className="modal-input-ramal"
                            placeholder="Ramal do destinatário..."
                            value={ramal}
                            onChange={(e) => setRamal(e.target.value)}
                        />

                        <textarea
                            className="modal-input"
                            placeholder="Digite a entrega aqui…"
                            value={entrega}
                            onChange={(e) => setEntrega(e.target.value)}
                        />

                        <div className="modal-footer">
                            <button className="btn cancel" onClick={fecharModal}>
                                Cancelar
                            </button>
                            <button className="btn primary" onClick={criarEntrega}>
                                Criar Entrega
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdicionarEntregas;
