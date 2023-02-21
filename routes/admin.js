const express = require("express");
const app = express();
const router = express.Router();
const crud = require("../src/modules/Cadastros/crud");

bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.text({ type: '*/*' }));

/**
 * Rotas para cadastro e pesquisa de parceiros
 */
funcRotas('parceiros');

/**
 * Rotas para cadastro e pesquisa de recursos
 */
funcRotas('recursos');

/**
 * Rotas para cadastro e pesquisa de clientes
 */
funcRotas('clientes');

/**
 * Rotas para cadastro e pesquisa de empresa
 */
funcRotas('empresas');

/**
 * Rotas para lançamento de creditos
 */
 funcRotas('creditos');

 /**
 * Rotas para lancamento de debitos
 */
  funcRotas('debitos');

   /**
 * Rotas para lancamento
 */
   funcRotas('lancamentos'); 

 /**
 * Rotas para lancamento de rats
 */
  funcRotas('rats');

 /**
 * Rotas para lancamento de rdvs
 */
  funcRotas('rdvs');


/**
 * Rotas para cadastro e pesquisa de usuarios
 */
router.
  post("/authenticate", async function (req, res) {
    retorno = await crud('users', req.body, 'authenticate');
    vazio = JSON.stringify(req.body);
    authenticate = `{"autorizado": ${(retorno.length == 0 || vazio == '{}' ? false : true)}}`
    authenticate = JSON.stringify(authenticate)
    authenticate = JSON.parse(authenticate)
    res.send(authenticate);
  })
  .post("/newUser", async function (req, res) {
    retorno = await crud('users', req.body, 'newUser');
    res.send(retorno);
  });

  function funcRotas(rota) {
    router.
      post(`/${rota}`, async function (req, res) {
        retorno = await crud(rota, req.body, 'lastCode');
        if (retorno.length > 0)
          req.body.codigo = retorno[0].codigo + 1;
        else
          req.body.codigo = 1;
        await crud(rota, req.body, 'insert');
        req.body.resultado = "Inserido com sucesso.";
        res.json(req.body);
        res.end();
      })
      .put(`/${rota}`, async function (req, res) {
        await crud(rota, req.body, 'update');
        req.body.resultado = "Atualizado com sucesso.";
        res.json(req.body);
        res.end();
      })
      .delete(`/${rota}`, async function (req, res) {
        await crud(rota, req.body, 'delete');
        req.body.resultado = "Excluido com sucesso.";
        res.json(req.body);
        res.end();
      })
      .post(`/pesquisar${rota}`, async function (req, res) {
        retorno = await crud(rota, req.body, 'find');
        res.send(retorno);
      })
  }

module.exports = router;