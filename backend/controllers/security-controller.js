const router = require('express').Router()
const db = require('../src/db')
const User = require('../models/user')(db.sequelize, db.DataTypes)
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    const { login, senha } = req.body
    const user = await User.findOne({ where: { login } })
    if (!user) {
        return res.json({ message: 'Usuário não encontrado.' })
    }

    const passwordIsOk = await bcrypt.compare(senha, user.senha)
    if (!passwordIsOk) {
        return res.json({ message: 'Senha invalida.' })
    }

    const token = jsonwebtoken.sign({ id: user.id }, process.env.JTW_SECUTIRY_TOKEN, {
        expiresIn: '1d'
    })
    
    return res.json({ token })
})

module.exports = router