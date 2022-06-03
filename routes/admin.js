const express = require("express");
const app = express();
const router = express.Router();
const crud = require("C:/Users/henri/Desktop/Dev/Cadastro/src/modules/crud");
const soap = require("soap");

router.get("/", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/CadastroUsuarios/cadastro_usuario.html");
});

router.get("/relacao", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/CadastroUsuarios/relacao.html");
});

router.get("/contas", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/Financas/contas.html");
});

router.get("/bpm", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/bpm.html");
});

router.get("/ventura", function(req, res) {
    res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/carregar.html");
})

router.get("/horas", function(req, res) {
  res.sendFile("C:/Users/henri/Desktop/Dev/Cadastro/src/public/html/horas.html");
})

bodyParser = require('body-parser');
router.use(bodyParser.json());

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

router.use(bodyParser.text({ type: '*/*' }));

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