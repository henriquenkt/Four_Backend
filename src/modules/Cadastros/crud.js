/**
 * 
 * @param {*} tabela - Collection que será utilizada 
 * @param {*} registro - Json com os dados que serão utilizados na operação 
 * @param {*} operacao - Operação a ser realizada (Insert, Update, Delete, Find)
 * @returns 
 */
function crud(tabela, registro, operacao) {

    const mongoose = require("mongoose");
    var modelo = mongoose.model(tabela);
    var resultado = '';
    var codigo = parseInt(registro.codigo);  
    var id = registro._id;  

    // Busca registro
    if(operacao == 'find'){
        resultado = modelo.find(registro).sort({"codigo" : 1}).lean().exec();
    }
    
    // Apaga registro
    if(operacao == 'delete'){
        resultado = modelo.deleteOne(registro).exec();
    }

    // Insere registro
    if(operacao == 'insert'){
        new modelo(registro).save();
    }

    // Atualiza registro
    if(operacao == 'update'){
        json = JSON.stringify({"_id": id});
        filter = JSON.parse(json);
        delete registro.codigo;
        modelo.findOneAndUpdate(filter, registro).exec();  
    }
    
    // Busca ultimo registro
    if(operacao == 'lastCode'){
        resultado = modelo.find({},{"_id":0, "codigo":1}).sort({codigo:-1}).limit(1).lean().exec();
    }

    // Busca proximo registro
    if(operacao == 'next'){  
        resultado = modelo.find({"codigo":{$gt:codigo}}).sort({codigo:1}).limit(1).lean().exec();
    }

    // Busca registro anterior
    if(operacao == 'previous'){
        resultado = modelo.find({"codigo":{$lt:codigo}}).sort({codigo:-1}).limit(1).limit(1).lean().exec();
    }

    // Busca login
    if(operacao == 'authenticate'){
        resultado = modelo.find(registro).sort({"email" : 1}).lean().exec();        
    }

    // Cria usuario
    if(operacao == 'newUser'){
        new modelo(registro).save();
     }    

    return resultado;
    }  
    module.exports = crud;
  