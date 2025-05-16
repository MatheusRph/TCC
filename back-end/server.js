const express = require('express');
const next = require('../Intro-TCC/node_modules/next');
const sequelize = require('./config/sequelize.js');
const router = require('./routes/router.js');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv').config(); 
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: path.join(__dirname, '../Intro-TCC') // ajuste esse caminho para o local correto da pasta do seu front-end
  });
const handle = nextApp.getRequestHandler();
const { SESSION_TOKEN } = process.env;

nextApp.prepare().then(() => {
    const app = express();

    // Conexão com banco de dados
    sequelize.authenticate()
        .then(() => {
            console.log('✅ Conectado ao banco de dados.');
            return sequelize.query('SHOW TABLES');
        })
        .then(([result]) => {
            console.log('📄 Tabelas:', result);
        })
        .catch(err => {
            console.error('❌ Erro ao conectar:', err);
        });

    // Sessão
    app.use(session({
        secret: SESSION_TOKEN,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }
    }));

    // CORS
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

    app.use(express.json());

    // Suas rotas da API
    app.use('/api', router);

    // Front-end (Next.js)
    app.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
});
