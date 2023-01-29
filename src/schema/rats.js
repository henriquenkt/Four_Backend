function mongoschema() {
  const mongoose = require("mongoose");
  var usuarioSchema = new mongoose.Schema({
	codigo: {
      type: Number,
      require: true
    },
    empresa: {
      type: String,
      require: true
    },
    cnpj: {
      type: String,
      require: true
    },
    valorConsultoria: {
      type: String,
      require: true
    },
    valorGerenciamento: {
      type: String,
      require: true
    }
  })
  //Collection
  return mongoose.model('rats', usuarioSchema);
}

module.exports = mongoschema;
