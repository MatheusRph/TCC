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
      const response = await fetch('api/sugestao/ver', {
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
      const response = await fetch('api/sugestao/criar', {
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
      console.error('Erro ao criar sugestão:', err);
    }
  }

  return (
    <>
      <header>
        <div className="navbar">
          <div className='logo'>
            <img src="/icone.png" alt="" />
            <h1>COND TRACK</h1>
            <button className="btn-entregas" onClick={abrirModal}>Adicionar Sugestão</button>
          </div>
        </div>
        <div className="barra"></div>
      </header>

      <main>
        <div className="barras">
          {listaSugestao.length === 0 ? (
            <p className="text-center text-muted">O condomínio não possui sugestões</p>
          ) : (
            listaSugestao.map((s) => (
              <div key={s.id} className="pendentes">
                <p>{s.message}</p>
              </div>
            ))
          )}
        </div>
      </main>

      {showModal && (
        <div className="custom-backdrop">
          <div className="custom-popup">
            <h2>Criar Sugestão</h2>
            <textarea
              className="modal-input"
              placeholder="Digite sua sugestão aqui…"
              value={novaSugestao}
              onChange={(e) => setNovaSugestao(e.target.value)}
            />
            <div className="modal-footer">
              <button className="btn cancel" onClick={fecharModal}>
                Cancelar
              </button>
              <button className="btn primary" onClick={criarSugestao}>
                Criar Sugestão
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}