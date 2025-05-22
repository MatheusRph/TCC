'use client'
import { useRef, useEffect } from 'react';
import './../globals.css';
import './style.css';

function Camera2() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Erro ao acessar a câmera:', err);
      }
    }
    startCamera();

    // Cleanup: para o stream quando componente desmontar
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  }, []);

  return (
    <>
      <header>
        <div className="icone">
          <img src="/icone.png" alt="Ícone" />
        </div>
        <div className="barra">
          <h1>COND TRACK</h1>
        </div>
      </header>

      <main>
        <div className="camera">
          {/* Vídeo da câmera ocupa toda a área da div.camera */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </main>
    </>
  );
}

export default Camera2;
