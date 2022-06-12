const express = require("express");
const app = express();
const router = express.Router();
const crud = require("../src/modules/CadastroUsuarios/crud");
const crudFinanceiro = require("../src/modules/Financeiro/crud");
const soap = require("soap");

bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.text({ type: '*/*' }));

/**
 * CADASTROS DE USUARIOS
 */

// Cadastro de usuarios
 router.get("/", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/CadastroUsuarios/cadastro_usuario.html");
});

// Busca cadastros
router.get("/relacao", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/CadastroUsuarios/relacao.html");
});


router.post("/inserir", async function(req, res) {
  var cadastro = req.body;
  await crud('usuario',cadastro, 'insert');
  res.redirect("/");
  res.end();
});

router.post("/alterar", async function(req, res) {
  var cadastro = req.body;
  await crud('usuario',cadastro, 'update');
  res.redirect("/");
  res.end();
});

router.post("/excluir", async function(req, res) {
  var cadastro = req.body;
  await crud('usuario',cadastro, 'delete');
  res.redirect("/");
  res.end();
});

router.post("/pesquisar", async function(req, res) {
  var cadastro = req.body;
  retorno = await crud('usuario',cadastro, 'find');
  res.send(retorno);
});

router.post("/ultimoReg", async function(req, res) {
  var cadastro = req.body;
  retorno = await crud('usuario',cadastro, 'lastCode');
  res.send(retorno);
});

router.post("/proximo", async function(req, res) {
  var cadastro = req.body;
  retorno = await crud('usuario', cadastro, 'next');
  res.send(retorno);
});

router.post("/anterior", async function(req, res) {
  var cadastro = req.body;
  retorno = await crud('usuario', cadastro, 'previous');
  res.send(retorno);
});

/**
 * CONTAS
 */

// Cadastro de contas
router.get("/contas", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/Financas/contas.html");
});

// Busca cadastros
router.post("/contas/pesquisar", async function(req, res) {
  var cadastro = req.body;
  retorno = await crudFinanceiro('contas',cadastro, 'find');
  res.send(retorno);
});

router.post("/contas/inserir", async function(req, res) {
  var cadastro = req.body;
  await crudFinanceiro('contas',cadastro, 'insert');
  res.redirect("/");
  res.end();
});

router.post("/contas/alterar", async function(req, res) {
  var cadastro = req.body;
  await crudFinanceiro('contas',cadastro, 'update');
  res.redirect("/");
  res.end();
});

router.post("/contas/excluir", async function(req, res) {
  var cadastro = req.body;
  await crud('contas',cadastro, 'delete');
  res.redirect("/");
  res.end();
});

/**
 * Outros
 */
router.get("/bpm", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/bpm.html");
});

router.get("/ventura", function(req, res) {
    res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/carregar.html");
})

router.get("/horas", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/horas.html");
})


router.post("/stoller", async function(req, res) {
  app.use(bodyParser.urlencoded({
    parameterLimit: 10000000,
    limit: '500mb',
    extended: true
  }));
  var cadastro = req.body;
  
  res.send(cadastro);
});

module.exports = router;