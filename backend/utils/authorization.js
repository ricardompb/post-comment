const db = require('../src/db')
const User = require('../models/user')(db.sequelize, db.DataTypes)
const jsonwebtoken = require('jsonwebtoken')

const authorized = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.json({ message: 'Você precisa enviar as credenciais de autorização.' })
    }

    const [bearer, token] = authorization.split(' ')
    if (!/Bearer/.test(bearer)) {
        return res.json({ message: 'O tipo de autenticação não é a esperada.' })
    }

    if (!token) {
        return res.json({ message: 'O token não foi informado.' })
    }

    try {
        const decode = jsonwebtoken.verify(token, process.env.JTW_SECUTIRY_TOKEN)
        const user = await User.findByPk(decode.id)
        req.user = user
        return next()
    } catch (error) {
        return res.json({ message: `Erro encontrado na verificação: ${error.message}` })
    }
}

module.exports = {
    authorized
}