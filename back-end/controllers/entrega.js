// Importa o módulo de resposta do Express
const { response } = require('express');

// Importa o modelo de Entrega
const { Entrega, User } = require('../models/index.js');

// Exporta a função getEntregas
exports.getEntregas = async (req, res) => {
    try {

        let user = req.session.user.id

        user = await User.findOne({ where: { id: user } });

        if (!user) {
            return res.status(401).json({
                response: "Não identificado para a execução desta operação"
            })
        }

        // Busca todas as entregas
        const entregas = await Entrega.findAll({
            where: {
              responsavel: user.ramal
            }
          });

        // Tratamento de erro caso não houver entregas
        // Verifica se não há entregas encontradas
        if (!entregas.length) {
            // Retorna uma resposta de erro 404 caso não haja entregas
            return res.status(404).json({
                // Indica que a operação não foi bem-sucedida
                success: false,
                // Mensagem de resposta
                response: "Nenhuma entrega encontrada"
            });
        }
        // Corrige o erro de digitação em 'reponse' para 'response'
        return res.status(200).json({
            success: true,
            response: entregas // Corrige o erro de variável não definida 'avisos'
        });

    } catch (err) {
        // Registra o erro no console
        console.error('Erro no sistema' + err)
        // Retorna uma resposta de erro 500 caso ocorra um erro interno
        res.status(500).json({
            success: false,
            response: 'Erro interno do sistema'
        });
    }
}

// Exporta a função de registro de entregas
exports.registerEntrega = async (req, res) => {
    // Tenta executar o código
    try {

        // Obtém os dados do corpo da requisição
        const { responsavel, item } = req.body;

        let ramal = req.session.user.id

        // Verifica se o ramal e o responsável foram informados
        if (!responsavel) {
            return res.status(400).json({
                success: false,
                response: 'Informe o responsável à receber'
            });
        }

        if (!item) {
            return res.status(400).json({
                success: false,
                response: 'Informe o item a ser entregue'
            });
        }

        // Busca o usuário pelo ramal
        let user = await User.findOne({ where: { id: req.session.user.id } });

        // Verifica se o usuário foi encontrado
        if (!user) {
            return res.status(400).json({
                success: false,
                response: 'Não identificado para a execução desta operação'
            });
        }

        if (! await User.findOne({ where: { ramal: responsavel } })) {
            return res.status(400).json({
                success: false,
                response: 'Destinatário inválido'
            });
        }

        // Cria uma nova entrega
        const entrega = await Entrega.create({ ramal_id: user.ramal, responsavel: responsavel, item: item })

        // Verifica se a entrega foi criada com sucesso
        if (!entrega) {
            return res.status(400).json({
                success: false,
                response: 'Erro ao criar entrega'
            });
        }

        // Retorna uma resposta de sucesso
        return res.status(200).json({
            success: true,
            response: 'Entrega registrada com sucesso'
        });
    }

    // Captura e trata erros
    catch (error) {
        // Registra o erro no console
        console.log('Erro no sistema: ' + error);
        // Retorna uma resposta de erro 500 caso ocorra um erro interno
        res.status(500).json({
            // Indica que a operação não foi bem-sucedida
            success: false,
            // Mensagem de resposta
            response: 'Erro interno do sistema'
        });
    }
}