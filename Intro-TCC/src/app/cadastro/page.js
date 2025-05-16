'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCheckSession from "@/hook/useCheckSession";
import './../globals.css';
import './styles.css'

function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ramal: "",
    password: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Verifica o status de login
  const isLoggedIn = useCheckSession();
  

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/login");
    }
  }, [isLoggedIn, router]); // Adicione router como dependência

  // Estado de carregamento
  if (isLoggedIn === null) {
    return null; // ou componente de loading
  }

  // Se não estiver logado, não renderiza nada (o useEffect já redirecionou)
  if (isLoggedIn === false) {
    return null;
  }

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const submit = async (evt) => {
    evt.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3001/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (response.ok) {
          setSuccessMessage(data.message || "Cadastro realizado com sucesso!");
          setFormData({ ramal: "", password: "", email: "" });
        } else {
          setErrorMessage(data.message || "Erro ao realizar cadastro");
        }
      } else {
        const text = await response.text();
        if (response.ok) {
          setSuccessMessage(text || "Cadastro realizado com sucesso!");
          setFormData({ ramal: "", password: "", email: "" });
        } else {
          setErrorMessage(text || "Erro ao realizar cadastro");
        }
      }

    } catch (err) {
      console.error("Erro no cadastro:", err);
      setErrorMessage(err.message || "Erro de conexão com o servidor");
    }
  };

  return (
    <>
      <header>
        <div className="navbar">
          <div className='logo'>
            <img src="/icone.png" alt="" />
            <h1>COND TRACK</h1>
          </div>
        </div>
      </header>

      <div className="corpo">
        <div className="container">
          <form className="form" onSubmit={submit}>
            <h1>Cadastro</h1>
            <div className="form-container">
              <label className="title">
                Ramal
              </label>
              <input placeholder="Digite o ramal" type="text" name="ramal" value={formData.ramal} onChange={handleChange}>
              </input>
              <label className="title">
                Email
              </label>
              <input placeholder="Digite o email do usuário" type="email" name="email" value={formData.email} onChange={handleChange}>
              </input>
              <label className="title">
                Senha
              </label>
              <input placeholder="Digite a senha do usuário!" type="password" name="password" value={formData.password} onChange={handleChange}></input>
              <div className="buttons">
                <button className="bnt" type="submit">Cadastrar</button>

              </div>
              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <footer>
        <h3>Sua entrega realizada com eficiência e comodidade dentro do seu condomínio.</h3>
      </footer>
    </>
  );
}

export default Cadastro;