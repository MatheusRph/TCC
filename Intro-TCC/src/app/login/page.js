'use client';
import { useState, useEffect } from "react";
import './../globals.css';
import './styles.css';
import { useRouter } from "next/navigation";
import useCheckSession from "@/hook/useCheckSession";

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ramal: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const isLoggedIn = useCheckSession();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/user"); // Se estiver logado, redireciona
    }
  }, [isLoggedIn, router]);  // Dependência do estado de login

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const submit = async (evt) => {
    evt.preventDefault();
    setErrorMessage(""); // Limpa mensagens anteriores

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include", // Garante que a sessão seja mantida
        body: JSON.stringify(formData)
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok || !json.success) {
        throw new Error(json.response || "Erro ao fazer login");
      }

      router.push("/user"); // Login bem-sucedido, redireciona
    } catch (err) {
      console.error("Erro no login:", err);
      setErrorMessage(err.message); // Exibe mensagem de erro no UI
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
            <h1>Login</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="form-container">
              <label className="title">Ramal</label>
              <input placeholder="Digite seu ramal" type="text" name="ramal" value={formData.ramal} onChange={handleChange} />

              <label className="title">Senha</label>
              <input placeholder="Digite sua senha!" type="password" name="password" value={formData.password} onChange={handleChange} />
              
              <div className="buttons">
                <button className="bnt" type="submit">Entrar</button>
                <button className="forget">Esqueci Senha</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <h3>Seu pedido entregue no coração do seu condomínio.</h3>
      </footer>
    </>
  );
}

export default Login;
