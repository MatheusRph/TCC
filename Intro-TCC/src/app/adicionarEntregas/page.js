'use client'
import './style.css'
import './../globals.css';
import { useEffect, useState } from 'react';

function AdicionarEntregas() {
    const [listaEntregas, setListaEntregas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [entrega, setEntrega] = useState('');

    const abrirModal = () => setShowModal(true);
    const fecharModal = () => {
        setShowModal(false);
        setEntrega('');
    };

    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                const response = await fetch('api/entregas/ver', {
                    method: 'GET',
                    credentials: 'include',
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

    const criarEntrega = async () => {
        try {
            const response = await fetch('api/entregas/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ sugestao: entrega })
            });

            if (!response.ok) throw new Error('Erro ao criar sugestão');

            alert('Sugestão enviada com sucesso!');
            fecharModal();
        } catch (err) {
            console.error('Erro ao criar sugestão:', err);
            alert('Erro ao criar sugestão.');
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
                                <p>{entrega.responsavel} – Item: {entrega.item} – Ramal: {entrega.ramal_id}</p>
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
                        <textarea
                            className="modal-input"
                            placeholder="Digite sua sugestão aqui…"
                            value={entrega}
                            onChange={(e) => setEntrega(e.target.value)}
                        />
                        <div className="modal-footer">
                            <button className="btn cancel" onClick={fecharModal}>
                                Cancelar
                            </button>
                            <button className="btn primary" onClick={criarEntrega}>
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdicionarEntregas;
