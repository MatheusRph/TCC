'use client'

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import useCheckSession from "@/hook/useCheckSession";
import './style.css'
import './../globals.css'

export default function Sugestao() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [novaSugestao, setNovaSugestao] = useState('');
    const [listaSugestao, setListaSugestao] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [avisoParaExcluir, setAvisoParaExcluir] = useState(null);

    const excluirAviso = async () => {
        if (!avisoParaExcluir) return;

        try {
            const response = await fetch(`api/avisos/${avisoParaExcluir.id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao excluir aviso');
            }

            setShowDeleteModal(false);
            setAvisoParaExcluir(null);
            buscarSugestoes(); // Atualiza a lista
        } catch (err) {
            console.error('Erro ao excluir aviso:', err);
        }
    };

    const abrirModalExcluir = (aviso) => {
        setAvisoParaExcluir(aviso);
        setShowDeleteModal(true);
    };

    const fecharModalExcluir = () => {
        setShowDeleteModal(false);
        setAvisoParaExcluir(null);
    };


    const isLoggedIn = useCheckSession();

    useEffect(() => {
        if (isLoggedIn === false) {
            router.push("/login");
        }

        if (isLoggedIn === true) {
            buscarSugestoes();
        }
    }, [isLoggedIn, router]);

    const buscarSugestoes = async () => {
        try {
            const response = await fetch('api/avisos/ver', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok || !data.success || !Array.isArray(data.response)) {
                console.warn('Resposta inesperada ou sem sugestões:', data);
                setListaSugestao([]); // garante que seja array vazio
                return;
            }

            setListaSugestao(data.response); // isso sim é array
        } catch (err) {
            console.error('Erro ao buscar sugestões:', err);
            setListaSugestao([]); // fallback seguro
        }
    };

    const abrirModal = () => setShowModal(true);

    const fecharModal = () => {
        setShowModal(false);
        setNovaSugestao('');
    }

    const criarSugestao = async () => {
        if (!novaSugestao.trim()) return;

        try {
            const response = await fetch('api/avisos/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ message: novaSugestao.trim() })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao criar sugestão');
            }

            setNovaSugestao('');
            setShowModal(false);
            buscarSugestoes();
        } catch (err) {
            console.error('Erro ao criar aviso:', err);
        }
    }

    return (
        <>
            <header>
                <div className="navbar">
                    <div className='logo'>
                        <img src="/icone.png" alt="" />
                        <h1>COND TRACK</h1>
                        <button className="btn-entregas" onClick={abrirModal}>Adicionar Avisos</button>
                    </div>
                </div>
                <div className="barra"></div>
            </header>

            <main>
                <div className="barras">
                    {listaSugestao.length === 0 ? (
                        <p className="text-center text-muted">O condomínio não possui avisos</p>
                    ) : (
                        listaSugestao.map((s) => (
                            <div key={s.id} className="pendentes" style={{ position: 'relative' }}>
                                <p>{s.message}</p>
                                <button
                                    onClick={() => abrirModalExcluir(s)}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        color: '#c00'
                                    }}
                                    aria-label={`Excluir aviso ${s.id}`}
                                    title="Excluir aviso"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}

                    {showDeleteModal && (
                        <div className="custom-backdrop">
                            <div className="custom-popup">
                                <h2>Excluir Aviso</h2>
                                <p>Você deseja excluir este aviso?</p>
                                <p><em>{avisoParaExcluir?.message}</em></p>
                                <div className="modal-footer">
                                    <button className="btn cancel" onClick={fecharModalExcluir}>
                                        Cancelar
                                    </button>
                                    <button className="btn danger" onClick={excluirAviso}>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {showModal && (
                <div className="custom-backdrop">
                    <div className="custom-popup">
                        <h2>Criar Aviso</h2>
                        <textarea
                            className="modal-input"
                            placeholder="Digite o aviso..."
                            value={novaSugestao}
                            onChange={(e) => setNovaSugestao(e.target.value)}
                        />
                        <div className="modal-footer">
                            <button className="btn cancel" onClick={fecharModal}>
                                Cancelar
                            </button>
                            <button className="btn primary" onClick={criarSugestao}>
                                Criar Aviso
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}