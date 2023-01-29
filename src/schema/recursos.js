function mongoschema() {
  const mongoose = require("mongoose");
  var usuarioSchema = new mongoose.Schema({
	codigo: {
      type: Number,
      require: true
    },
    nome: {
      type: String,
      require: true
    },
    cargo: {
      type: String,
      require: true
    },
    usuario: {
      type: String,
      require: true
    },
    valorHora: {
      type: String,
      require: true
    },
    meta: {
      type: String,
      require: true
    },
    certificacao: {
      type: String,
      require: true
    },
    valorAplicado: {
      type: String,
      require: true
    },
    valorFixo: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    banco: {
      type: String,
      require: true
    },
    agencia: {
      type: String,
      require: true
    },
    conta: {
      type: String,
      require: true
    },
    pix: {
      type: String,
      require: true
    },
    tipoPix: {
      type: String,
      require: true
    }
  })
  //Collection
  return mongoose.model('recursos', usuarioSchema);
}

module.exports = mongoschema;
