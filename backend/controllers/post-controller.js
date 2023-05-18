const router = require('express').Router()
const db = require('../src/db')
const Post = require('../models/post')(db.sequelize, db.DataTypes)
const Comment = require('../models/comment')(db.sequelize, db.DataTypes)

Post.hasMany(Comment)
Comment.belongsTo(Post)

router.get('/', async (req, res) => {
    try {
        res.json(await Post.findAll())   
    } catch (error) {
        return res.json({ message: `Erro ao tentar lisar os post's.\nerro: ${error.message}` })
    }    
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        return res.json({
            post,
            comments: await post.getComments()
        })            
    } catch (error) {
        return res.json({ message: `Erro ao tentar recuperar um post.\nerro: ${error.message}` })
    }
})

router.post('/', async (req, res) => {
    try {
        return res.status(201).json(await Post.create(req.body))    
    } catch (error) {
        return res.json({ message: `Erro ao tentar criar um novo post.\nerro: ${error.message}` })
    }    
})

router.put('/', async (req, res) => {
    try {
        const post = await Post.findByPk(req.body.id)
        const { comentario } = req.body
        if (comentario) {
            await post.createComment({ comentario })
        }
        Object.entries(req.body).forEach(item => {
            const [key, value] = item
            post[key] = value
        })
        await post.save()    
        return res.json({ message: 'Post atualizado com sucesso.' })            
    } catch (error) {
        return res.json({ message: `Erro ao tentar atualizar o post.\nerro: ${error.message}` })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        post.destroy()
        return res.json({ message: 'Post excluido com sucesso.' })            
    } catch (error) {
        return res.json({ message: `Erro ao tentar excluir o post.\nerro: ${error.message}` })
    }
})

module.exports = router