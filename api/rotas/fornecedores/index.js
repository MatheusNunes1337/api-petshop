const router = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor')

router.get('/fornecedores', async (req, res ) => {
    const resultados = await tabelaFornecedor.listar()
    res.json(resultados)
})

router.post('/fornecedores', async (req, res) => {
    try {
        console.log(req.body)
        const fornecedor = new Fornecedor(req.body)
        await fornecedor.criar()
        res.status(201).json(fornecedor)
    } catch(err) {
        res.status(400).json({mensagem: err.message})
    }
})

router.get('/fornecedores/:id', async (req, res) => {

    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.status(200).json(fornecedor)
    } catch(err) {
        res.status(404).json({mensagem: err.message})
    }
})

router.put('/fornecedores/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dados = Object.assign({}, req.body, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(200).json({mensagem: 'informações atualizadas com sucesso'})
    } catch(err) {
        res.status(400).send({mensagem: err.message})
    }
})

router.delete('/fornecedores/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(200).json({mensagem: 'fornecedor deletado com sucesso'})
    } catch(err) {
        res.status(404).send({mensagem: err.message})
    }


})

module.exports = router