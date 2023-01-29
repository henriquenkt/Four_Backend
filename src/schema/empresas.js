function mongoschema() {
  const mongoose = require("mongoose");
  var usuarioSchema = new mongoose.Schema({
	codigo: {
      type: Number,
      require: true
    },
    razaoSocial: {
      type: String,
      require: true
    },
    cnpj: {
      type: String,
      require: true
    },
    cep: {
      type: String,
      require: true
    },
    endereco: {
      type: String,
      require: true
    },
    numero: {
      type: String,
      require: true
    },
    complemento: {
      type: String,
      require: true
    },
    bairro: {
      type: String,
      require: true
    },
    cidade: {
      type: String,
      require: true
    },
    aliquota: {
      type: String,
      require: true
    }
    
  })
  //Collection
  return mongoose.model('empresas', usuarioSchema);
}

module.exports = mongoschema;
