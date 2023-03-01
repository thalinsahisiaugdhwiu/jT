const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Comment = require('./models/comment')

// config
//template engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//rotas inicial
app.get('/', function (req, res) {
    Comment.findAll({ order: [['id', 'DESC']] }).then(function (comments) {
        res.render('home', { comments: comments })
    })
})

//rota do formulario
app.get('/form', function (req, res) {
    res.render('formulario.handlebars')
})
//rotas "post" so pode ser acessada quando alguem faz uma requisição
app.post('/add', function (req, res) {
    Comment.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
    }).catch(function (erro) {
        res.send('Deu ruim' + erro)
    })
})
//rota para deletar comentarios
app.get('/deletar/:id', function (req, res) {
    Comment.destroy({ where: { 'id': req.params.id }}).then(function () {
        res.redirect('/')
    }).catch(function (erro) {
        res.send('ocorreu um erro')
    })
})

app.listen(8081, function () {
    console.log(" Servidor rodando na porta http://localhost:8081/");
});
