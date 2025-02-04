const express = require('express')
const router = express.Router()
const produtoMid = require("../middleware/validarProduto.middleware")
const { Produto } = require('../models')

router.post("/", produtoMid)
router.put("/", produtoMid)


router.get('/', async (req, res) => {
    const produtos = await Produto.findAll()
    res.json({produtos:produtos})
})

router.get('/:id', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id)
    res.json({produto: produto})
})

router.post('/', async (req, res) => {
    const produto = await Produto.create(req.body)
    res.json({msg: "Produto adicionado com sucesso!"})
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const produto = await Produto.findByPk(id)
    if (produto){
        await produto.destroy()
        res.json({msg: "Produto deletado com sucesso!"})
    }else{
        res.status(400).json({msg: "Produto não encontrado!"})
    }
})

router.put('/', async (req, res) => {
    const id = req.query.id
    const produto = await Produto.findByPk(id)
    if (produto){
        produto.titulo = req.body.titulo
        produto.texto = req.body.texto
        await produto.save()
        res.json({msg: "Produto atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: "Produto não encontrado!"})
    }
})


module.exports = router