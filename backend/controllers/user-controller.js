const router = require('express').Router()
const db = require('../src/db')
const User = require('../models/user')(db.sequelize, db.DataTypes)
const bcrypt = require('bcryptjs')

router.get('/', async (req, res) => {
    const { login } = req.query
    const where = login ? { where: { login } } : undefined
    const users = await User.findAll(where)
    if (users.length === 0) {
        return res.json({ message: 'Nenhum usuário encontrado.' })
    }
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const user = await User.findByPk(id)
    if (!user) {
        return res.json({ message: 'Usuário não encontrado.' })
    }
    res.json(user)
})

router.post('/', async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const { login, senha, dataNascimento } = req.body
        const user = await User.create({
            login,
            senha: bcrypt.hashSync(senha, salt),
            dataNascimento
        })
        return res.json(user)
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.put('/', async (req, res) => {
    try {
        const user = await User.findByPk(req.body.id)
        const { login, senha, dataNascimento } = req.body
        user.login = login
        user.senha = senha
        user.dataNascimento = dataNascimento
        await user.save()
        res.json({ message: `Usuário '${login}' atualizado com sucesso...` })
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        return res.json({ message: 'Usuário não encontrado.' })
    }
    const { login } = user.dataValues
    await user.destroy()
    res.json({ message: `Usuário '${login}' excluido com sucesso...` })
})

module.exports = router