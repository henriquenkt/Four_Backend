const express = require("express");
const app = express();
const schema = require("./src/modules/schema");
const mongoose = require("mongoose");
const admin = require("./routes/admin");
const cors = require('cors');
const mongoschema = require("./src/modules/schema");
var porta = 3000;
require('node-windows');

app.use(express.static('src'));
app.use(cors()); 

// conexao mongodb
mongoose.connect('mongodb://localhost:27017/documents', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// routes
app.use("/", admin);

var date = new Date();
var datahoje = new Date().toISOString().split('T')[0];
var datat = datahoje[0];
let teste = 0;
for (let cont = 0; cont < 10; cont = cont + 1) {
  //var registro =  historicoBpm.data.timeline[cont];
  teste = teste + 1 ;
  //aprovado = (registro.actionName == "Concluir" && registro.taskName == "Confirmação" ? true : aprovado);
}

// outros
mongoschema();

// Server
app.listen(porta, function() {
 
  console.log("servidor rodando na porta: " + porta);
});




