'use client'

import './style.css'
import './../globals.css';
import Maincard from "../../../components/Maincard/Maincard";
import { useEffect, useState } from 'react';

function Adm() {

    const [listaAvisos, setListaAvisos] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const fetchAvisos = async () => {
            try {
                const response = await fetch('api/avisos/ver', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                if (data.success === false) {
                    setListaAvisos([]);            // Mantém vazio
                    setMensagem(data.response);    // "Não possui avisos"
                } else {
                    setListaAvisos(data.response); // array de avisos
                    setMensagem('');
                }

            } catch (err) {
                console.error('Erro ao buscar avisos:', err);
                setMensagem('Erro ao carregar avisos.');
            }
        };

        fetchAvisos();
    }, []);

    return (
        <>
            <div className="page-container">
                <header>
                    <div className="icone">
                        <img src="/icone.png" className="img" alt="logo.png" />
                    </div>
                    <div className="barra">
                        <h1>Menu</h1>
                    </div>
                </header>

                <main>
                    <div className="container">
                        <Maincard className="retangulo" src='/camera.png' buttonText={"Câmeras"}>
                            Tenha acesso à vigilância da portaria 24 horas por dia e acompanhe em tempo real a chegada
                            da sua entrega com segurança e tranquilidade.
                        </Maincard>

                        <Maincard className="retangulo" src='/sugestão.png' buttonText={"Sugestões"}>
                            Contribua com sugestões construtivas para aprimorar sua experiência e tornar seu lar ainda mais
                            confortável e acolhedor.
                        </Maincard>

                        <Maincard className="retangulo" src='/entregas.png' buttonText={"Entregas"}>
                            Acompanhe com facilidade a lista de encomendas na portaria e seja notificado assim que
                            a sua estiver disponível.
                        </Maincard>
                    </div>
                </main>

                <footer className="footer-container mt-5">
                    <h1>Avisos</h1>
                    <div className="w-75 d-flex justify-content-center align-items-center">
                        <div className="avisos-scroll-box align-items-center reverse">
                            {listaAvisos.length > 0 ? (
                                [...listaAvisos].reverse().map((aviso) => (
                                    <div className="footer-container-2 w-75" key={aviso.id}>
                                        <div>
                                            <p>
                                                <strong>{aviso.title}:</strong> {aviso.message}
                                            </p>
                                        </div>
                                        <span className="aviso-data">
                                            {new Date(aviso.date_created).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                mensagem && (
                                    <p className="text-muted">{mensagem}</p> // "Não possui avisos"
                                )
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Adm;
