'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useCheckSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:3001/user", {
          method: "GET",
          credentials: "include",
        });

        // Verifica primeiro se a resposta foi bem sucedida
        if (!response.ok) {
          throw new Error("Falha na verificação de sessão");
        }

        const data = await response.json();
        setIsLoggedIn(!!data.success);

      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        setIsLoggedIn(false); // Importante definir o estado como false em caso de erro
      }
    };

    checkSession();
  }, []);

  return isLoggedIn;
}