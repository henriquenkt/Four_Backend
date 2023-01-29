function mongoschemaUser() {
  const mongoose = require("mongoose");
  var usuarioSchema = new mongoose.Schema({
    email: {
      type: String,
      require: true
    },
	password: {
      type: String,
      require: true
    }
  })
  //Collection
  return mongoose.model('users', usuarioSchema);
}

module.exports = mongoschemaUser;
