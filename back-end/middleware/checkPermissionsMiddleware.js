const { User } = require('../models/index.js');

//Começo de uma verificação por cargo bem mais complexa, do que precisa -se para este tipo de app
// const checkPermissions = (req, res, perm, next) => {

//     let login = req.session.user

//     if (!login){
//         return res.status(401).send('Não autorizado. Faça login primeiro.');
//     }

//     login = User.findOne({ where: { ramal: login } });

//     if(!login){
//         return res.status(500).send('Não autorizado. Faça login primeiro.');
//     }

//     console.log(login.role);

// }

//  Puxar o cargo do user.
// Puxar as permissões atreladas ao cargo do user
// Check the true or false
// If true let's go
// Else can return false

const checkPermissions = (requiredRole) => {
    return async (req, res, next) => {
        const login = req.session.user;

        if (!login) {
            return res.status(401).json({
                success: false,
                message: 'Não autorizado. Faça login!'
            });
        }

        try {
            const user = await User.findOne({
                where: { id: login.id }
            });

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            if (user.role === requiredRole) {
                req.user = user; // Adicionei para disponibilizar o usuário no request
                return next();
            } else {
                return res.status(403).json({
                    success: false,
                    message: '🔒 Acesso restrito! Você não possui as permissões necessárias.'
                });
            }

        } catch (error) {
            console.error('Erro na verificação de permissões:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
            });
        }
    };
};


module.exports = checkPermissions;