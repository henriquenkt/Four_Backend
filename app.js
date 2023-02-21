const express = require("express");
const app = express();
const mongoose = require("mongoose");
const admin = require("./routes/admin");
const cors = require('cors');
// var porta = 4100;
require('node-windows');
const mongoschema = require("./src/schema/parceiros");
const mongoschemaUser = require("./src/schema/user");
const mongoschemaRecursos = require("./src/schema/recursos");
const mongoschemaClientes = require("./src/schema/clientes");
const mongoschemaEmpresas = require("./src/schema/empresas");
const mongoschemaLancamentos = require("./src/schema/lancamentos");
const mongoschemaCreditos = require("./src/schema/creditos");
const mongoschemaDebitos = require("./src/schema/debitos");
const mongoschemaRats = require("./src/schema/rats");
mongoschema();
mongoschemaRecursos();
mongoschemaUser();
mongoschemaClientes();
mongoschemaEmpresas();
mongoschemaLancamentos();
mongoschemaCreditos();
mongoschemaDebitos();
mongoschemaRats();

app.use(express.static('src'));
app.use(cors()); 

// conexao mongodb
//  mongoose.connect('mongodb://localhost:27017/four', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }); 

  mongoose.connect('mongodb+srv://henriquenkt:VbaEdVQUsjCYyELc@cloudmd.0d9bib2.mongodb.net/cloudmd', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});  

// routes
app.use("/", admin);

// Server
app.listen(process.env.PORT || 3000);
// app.listen(porta, function() {
 
   console.log("servidor rodando na porta: " + porta);
// });




