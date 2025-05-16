'use client'
import './../globals.css';
import './style.css'
import { useState } from 'react';

function Codigo() {
    const [email, setEmail] = useState('');
    const [token, settoken] = useState('');
    const [password, setPassword] = useState('');
    const [tela, setTela] = useState('email'); // email | redefinir
    const [erro, setErro] = useState('');
    const [mensagem, setMensagem] = useState('');

    const enviarEmail = async (e) => {
        e.preventDefault();
        setErro('');
        setMensagem('');
        try {
            const resposta = await fetch('api/forgot_password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!resposta.ok) {
                const erroResposta = await resposta.json();
                throw new Error(erroResposta.mensagem || 'Erro ao enviar token');
            }

            setMensagem('Código enviado para o e-mail informado.');
            setTela('redefinir');

        } catch (err) {
            setErro(err.message);
        }
    };

    const redefinirSenha = async (e) => {
        e.preventDefault();
        setErro('');
        setMensagem('');
        try {
            const resposta = await fetch('api/reset_password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password, email })
            });

            if (!resposta.ok) {
                const erroResposta = await resposta.json();
                throw new Error(erroResposta.response || 'Erro ao redefinir senha');
            }

            setMensagem('Senha redefinida com sucesso!');
        } catch (err) {
            setErro(err.message);
        }
    };

    return (
        <>
            <header>
                <div className="icone">
                    <img src="/icone.png" alt="Ícone" />
                </div>
                <div className="barra">
                    <h1>Administration</h1>
                </div>
            </header>

            <main>
                {tela === 'email' ? (
                    <form className="formulario-recuperacao" onSubmit={enviarEmail}>
                        <h2 className='text-start'>Esqueceu senha</h2>
                        <p>Digite seu email que você receberá um código para alterar a senha</p>
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="botoes-linha">
                            <button type="button" className="botao-cancelar" onClick={() => window.location.href = '/login'}>Cancelar</button>
                            <button type="submit" className="botao-enviar">Continuar</button>
                        </div>

                        {erro && <p className="erro">{erro}</p>}
                        {mensagem && <p className="mensagem">{mensagem}</p>}
                    </form>
                ) : (
                    <form className="formulario-recuperacao" onSubmit={redefinirSenha}>
                        <h2>Redefinir Senha</h2>
                        <input
                            type="text"
                            placeholder="Código recebido por e-mail"
                            value={token}
                            onChange={(e) => settoken(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Nova senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Confirmar</button>
                        {erro && <p className="erro">{erro}</p>}
                        {mensagem && <p className="mensagem">{mensagem}</p>}
                    </form>
                )}
            </main>
        </>
    );
}

export default Codigo;
