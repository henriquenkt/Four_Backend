async function post(url, data) {

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = this.responseText;
    }
  };
  xhr.send(data);
}

/**
 * Realiza o insert no cadstro de usuarios
 */

async function inserir() {

  const res = await axios.post('http://hrnk:3000/ultimoReg', {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  var codigo = res.data[0].codigo + 1;
  var nome = document.getElementById('fcliente').value;
  var usuCloud = document.getElementById('fusucloud').value;
  var senCloud = document.getElementById('fsencloud').value;
  var usuario = document.getElementById('fusu').value;
  var senha = document.getElementById('fsen').value;
  var textoLivre = document.getElementById('ftextolivre').value;
  reset();
  var data = JSON.stringify({
    "codigo": codigo,
    "nome": nome,
    "usuCloud": usuCloud,
    "senCloud": senCloud,
    "usuario": usuario,
    "senha": senha,
    "textoLivre": textoLivre
  });
  post('/inserir', data);
}

/**
 * Realiza busca e retorna lista de clientes
 */
function pesquisar() {

  pai = document.getElementById("clientes");
  filho = pai.querySelector("li");

  while (filho !== null) {
    filho.remove();
    pai = document.getElementById("clientes");
    filho = pai.querySelector("li");
  }

  var busca = document.getElementById('busca').value;

  json = JSON.stringify({
    "nome":
    {
      '$regex': busca,
      '$options': 'i'
    }
  });

  axios.post('http://hrnk:3000/pesquisar', json, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => lista(response.data))
    .catch(error => console.log(error))

  const lista = (clientes) => {
    const ulAlunos = document.getElementById('clientes')
    clientes.map(clientes => {
      const listaAluno = document.createElement('li')
      listaAluno.innerHTML = `<a href= http://hrnk:3000/?codigo=${clientes.codigo}> ${clientes.codigo} - ${clientes.nome} </a>`
      ulAlunos.appendChild(listaAluno)
    })
  }
}

/**
 * Retorna cadastro para preencher form
 */
function cadastro() {
  const data = cadastro2();
  return (data);
}
async function cadastro2() {
  var codigo = document.getElementById('fcodcliente').value;
  const json = JSON.stringify({
    "codigo": codigo
  });
  const res = await axios.post('http://hrnk:3000/pesquisar', json, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const x = res.data[0];
  if (res.data[0]) {
    document.getElementById('fcliente').value = res.data[0].nome;
    document.getElementById('fusucloud').value = res.data[0].usuCloud;
    document.getElementById('fsencloud').value = res.data[0].senCloud;
    document.getElementById('fusu').value = res.data[0].usuario;
    document.getElementById('fsen').value = res.data[0].senha;
    document.getElementById('ftextolivre').value = res.data[0].textoLivre;
  }
}

/**
 * Altera dados
 */
function alterar() {
  var codigo = document.getElementById('fcodcliente').value;
  var nome = document.getElementById('fcliente').value;
  var usuCloud = document.getElementById('fusucloud').value;
  var senCloud = document.getElementById('fsencloud').value;
  var usuario = document.getElementById('fusu').value;
  var senha = document.getElementById('fsen').value;
  var textoLivre = document.getElementById('ftextolivre').value;
  //reset();
  alert("Dados Alterados!");
  var data = JSON.stringify({
    "codigo": codigo,
    "nome": nome,
    "usuCloud": usuCloud,
    "senCloud": senCloud,
    "usuario": usuario,
    "senha": senha,
    "textoLivre": textoLivre
  });
  post('/alterar', data)
}

/**
* Excluir dados
*/
function excluir() {
  var codigo = document.getElementById('fcodcliente').value;
  reset();
  var data = JSON.stringify({
    "codigo": codigo
  });
  post('/excluir', data);
}

function reset() {
  document.getElementById('fcodcliente').value = '';
  document.getElementById('fcliente').value = '';
  document.getElementById('fusucloud').value = '';
  document.getElementById('fsencloud').value = '';
  document.getElementById('fusu').value = '';
  document.getElementById('fsen').value = '';
  document.getElementById('ftextolivre').value = '';
}

/**
* Retorna cadastro para preencher form registro anterior
*/
async function anterior() {
  var codigo = document.getElementById('fcodcliente').value;
  codigo = codigo == ''? codigo = 9999999: codigo;
  const json = JSON.stringify({
    "codigo": codigo
  });

  const res = await axios.post('http://hrnk:3000/anterior', json, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const x = res.data[0];
  if (res.data[0]) {
    document.getElementById('fcodcliente').value = res.data[0].codigo;
    document.getElementById('fcliente').value = res.data[0].nome;
    document.getElementById('fusucloud').value = res.data[0].usuCloud;
    document.getElementById('fsencloud').value = res.data[0].senCloud;
    document.getElementById('fusu').value = res.data[0].usuario;
    document.getElementById('fsen').value = res.data[0].senha;
    document.getElementById('ftextolivre').value = res.data[0].textoLivre;
  }
}

/**
* Retorna cadastro para preencher form registro posterior
*/
async function posterior() {
  var codigo = document.getElementById('fcodcliente').value;
  codigo = codigo == ''? codigo = 0: codigo;
  const json = JSON.stringify({
    "codigo": codigo
  });

  const res = await axios.post('http://hrnk:3000/proximo', json, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const x = res.data[0];
  if (res.data[0]) {
    document.getElementById('fcodcliente').value = res.data[0].codigo;
    document.getElementById('fcliente').value = res.data[0].nome;
    document.getElementById('fusucloud').value = res.data[0].usuCloud;
    document.getElementById('fsencloud').value = res.data[0].senCloud;
    document.getElementById('fusu').value = res.data[0].usuario;
    document.getElementById('fsen').value = res.data[0].senha;
    document.getElementById('ftextolivre').value = res.data[0].textoLivre;
  }
}
