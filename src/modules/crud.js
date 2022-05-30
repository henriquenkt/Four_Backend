const mongoschema = require("C:/Users/henri/Desktop/Dev/Cadastro/src/modules/schema");

function crud(tabela, cadastro, operacao) {
 
    /*try {
        mongoschema(); // gera uma exceção
     }
     catch (e) {
        // declarações para manipular quaisquer exceções
        console.log(e); // passa o objeto de exceção para o manipulador de erro
     }*/
        
  
    const mongoose = require("mongoose");
    var modelo = mongoose.model(tabela);
    var resultado = '';
    var codigo = parseInt(cadastro.codigo);

    // Busca registro
    if(operacao == 'find'){
        resultado = modelo.find(cadastro).sort({"codigo" : 1}).lean().exec();
    }
    
    // Apaga registro
    if(operacao == 'delete'){
        resultado = modelo.deleteOne(cadastro).exec();
    }

    // Insere registro
    if(operacao == 'insert'){
        var rs = modelo.find(cadastro);
        if (rs.count() > 0){
          console.log("erro");
        }
        else{
          new modelo(cadastro).save();
        }
      
    }

    // Atualiza registro
    if(operacao == 'update'){
        json = JSON.stringify({"codigo": codigo});
        filter = JSON.parse(json);
        delete cadastro.codigo;
        modelo.findOneAndUpdate(filter, cadastro).exec();  
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

    return resultado;
    }  
    module.exports = crud;
  