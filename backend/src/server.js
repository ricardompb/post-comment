(async () => {
    require('dotenv').config()
    const db = require('./db')
    await db.connect()    
    const express = require('express')    
    const cors = require('cors')
    const app = express() 
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))   

    const securityController = require('../controllers/security-controller')
    app.use('/security/v1', securityController)
    const { authorized } = require('../utils/authorization')

    const userController = require('../controllers/user-controller')    
    app.use('/user/v1', authorized, userController)

    const postController = require('../controllers/post-controller')    
    app.use('/post/v1', authorized, postController)

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Servidor rodando em: ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
    })
})()
