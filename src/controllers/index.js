const express = require('express');
const User = require('../models/User');
const { calculate } = require('../calculate');
const router = express.Router();

// === Rota de calculo e salvamento de dados ===
router.post('/register', async (req, res) => {
    try {
        // === Faz o calculo da emissao ===
        const emission = calculate(req.body);

        const userData = {
            "nome": req.body.name,
            "email": req.body.email,
            "energiaCO2": emission['energiaCO2'],
            "aguaCO2": emission['aguaCO2'],
            "carroCO2": emission['carroCO2'],
            "motoCO2": emission['motoCO2'],
            "tremCO2": emission['tremCO2'],
            "metroCO2": emission['metroCO2'],
            "onibusCO2": emission['onibusCO2'],
            "TotalEmissaoKgCO2": emission['TotalEmissaoKgCO2'],
        }
        
        // === Salva dados do usuario no banco ===
        const user = await User.create(userData);

        // === Retorna um json com usuario + os dados do calculo ===
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registar dados da pegada!' });
    }
});

// === Listagem de usuários - Rota de listagem de todos os usuarios ===
router.get('/listar', (req, res) => {
    User.find().then((user) => {
        return res.json(user);
    }).catch((err) => {
        res.send('Erro ao listar os dados');
    });
});

// === Ranking - Rota de listagem de 5 pessoas com o menor total de emissao ===
router.get('/ranking-menor-emissao', (req, res) => {
    User.find({}, {nome: 1, email: 1, TotalEmissaoKgCO2: 1}).sort({TotalEmissaoKgCO2: 'ASC'}).limit(5).then((user) => {
        return res.json(user);
    }).catch((err) => {
        res.send('Erro ao listar o ranking');
    });
});

// === Ranking - Rota de listagem de 5 pessoas com o maior total de emissao ===
router.get('/ranking-maior-emissao', (req, res) => {
    User.find({}, {nome: 1, email: 1, TotalEmissaoKgCO2: 1}).sort({TotalEmissaoKgCO2: 'DESC'}).limit(5).then((user) => {
        return res.json(user);
    }).catch((err) => {
        res.send('Erro ao listar o ranking');
    });
});

// === Ranking - Rota de listagem de 5 pessoas com a menor emissao por servico ===
router.get('/ranking-menor-emissao-servico', (req, res) => {
    servico = req.body.servico;
    User.find({}, {nome: 1, email: 1, [servico]: 1}).sort({[servico]: 'ASC'}).limit(5).then((user) => {
        return res.json(user);
    }).catch((err) => {
        res.send('Erro ao listar o ranking');
    });
});

// === Ranking - Rota de listagem de 5 pessoas com a maior emissao por servico ===
router.get('/ranking-maior-emissao-servico', (req, res) => {
    servico = req.body.servico;
    User.find({}, {nome: 1, email: 1, [servico]: 1}).sort({[servico]: 'DESC'}).limit(5).then((user) => {
        return res.json(user);
    }).catch((err) => {
        res.send('Erro ao listar o ranking');
    });
});

module.exports = app => app.use('/pegada', router);