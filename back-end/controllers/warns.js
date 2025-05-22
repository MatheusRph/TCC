// Importação otimizada de modelos de Aviso e User
const { Aviso, User } = require('../models/index.js');

// Exporta a função getWarns para obter todos os avisos
exports.getWarns = async (req, res) => {
    try {
        // Tenta obter todos os avisos
        const aviso = await Aviso.findAll();

        // Verifica se não há avisos
        if (!aviso || aviso.length === 0) {
            // Retorna uma resposta com sucesso falso e mensagem de que não há avisos
            return res.status(200).json({
                success: false,
                response: 'Não possui avisos',
            });
        }

        // Retorna uma resposta com sucesso verdadeiro e a lista de avisos
        return res.status(200).json({
            success: true,
            response: aviso,
        });

    } catch (err) {
        // Registra o erro no console
        console.log(err);
        // Retorna uma resposta com sucesso falso e o erro
        return res.status(500).json({
            success: false,
            response: err
        })
    }
}

// Exporta a função modWarns para modificar um aviso
exports.modWarns = async (req, res) => {

}

// Exporta a função createWarn para criar um novo aviso
exports.createWarn = async (req, res) => {
    try {
        // Extrai os dados da requisição
        const { title, message } = req.body;

        // Tenta obter o usuário logado
        const user = await User.findOne({ where: { id: req.session.user.id } });

        // Verifica se o usuário não foi encontrado
        if (!user) {
            // Retorna uma resposta com sucesso falso e mensagem de que o usuário precisa se logar novamente
            return res.status(403).json({
                success: false,
                response: "Deslogue e logue novamente"
            });
        }

        // Define o ID do ramal do usuário
        const ramal_id = user.ramal;

        // Verifica se o título e a mensagem são informados
        if (!title || !message) {
            // Retorna uma resposta com sucesso falso e mensagem de que o título e a mensagem são obrigatórios
            return res.status(400).json({
                success: false,
                response: "Informe um título e uma menssagem"
            })
        }

        // Cria um novo aviso
        const creatWarn = await Aviso.create({ title, message, ramal_id });

        // Verifica se o aviso não foi criado
        if (!creatWarn) {
            // Retorna uma resposta com sucesso falso e mensagem de que houve um erro interno do servidor
            return res.status(500).json({
                success: false,
                response: "Erro interno do servidor ao criar aviso, tente novamente"
            })
        }

        // Retorna uma resposta com sucesso verdadeiro e mensagem de que o aviso foi criado com sucesso
        return res.status(200).json({
            success: true,
            response: 'Aviso criado com sucesso'
        })

    } catch (err) {
        // Registra o erro no console
        console.error('Erro no servidor:', err);
        // Retorna uma resposta com sucesso falso e o erro
        return res.status(500).json({
            success: false,
            response: 'Erro interno do servidor. Tente novamente mais tarde.',
        });
    }
}

exports.deleteWarn = async (req, res) => {
    try {
        const { id } = req.params;

        const warn = await Aviso.findByPk(id);  // <-- aqui

        if (!warn) {
            return res.status(404).json({
                success: false,
                response: "Aviso não encontrado"
            });
        }

        await warn.destroy();

        return res.json({ success: true, response: 'Aviso excluído com sucesso' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, response: 'Erro ao excluir aviso' });
    }
}
