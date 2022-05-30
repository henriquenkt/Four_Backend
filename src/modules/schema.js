function mongoschema() {
  const mongoose = require("mongoose");
  var usuarioSchema = mongoose.Schema({
	codigo: {
      type: Number,
      require: true
    },
	nome: {
      type: String,
      require: true
    },
	usuCloud: {
      type: String,
      require: true
    },
	senCloud: {
      type: String,
      require: true
    },
	usuario: {
      type: String,
      require: true
    },
	senha: {
      type: String,
      require: true
    },
	textoLivre: {
      type: String,
      require: true
    }
  })
  //Collection
  return mongoose.model('usuario', usuarioSchema);
}

module.exports = mongoschema;
