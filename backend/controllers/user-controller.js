const router = require('express').Router()
const db = require('../src/db')
const user = require('../models/user')(db.sequelize, db.DataTypes)

router.get('/', async (req, res) => {
    const users = await user.findAll()
    res.json(users)
})

module.exports = router