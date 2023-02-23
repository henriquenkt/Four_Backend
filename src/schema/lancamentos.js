function mongoschema() {
  const mongoose = require("mongoose");
  var usuarioSchema = new mongoose.Schema({
    codigo: {
      type: Number,
      require: true
    },
    data: {
      type: String,
      require: true
    },
    descricao: {
      type: String,
      require: true
    },
    tipo: {
      type: String,
      require: true
    },
    valor: {
      type: String,
      require: true
    },
    observacao: {
      type: String,
      require: true
    },
    creditoDebito: {
      type: String,
      require: true
    }
  })
  //Collection
  return mongoose.model('lancamentos', usuarioSchema);
}

module.exports = mongoschema;
