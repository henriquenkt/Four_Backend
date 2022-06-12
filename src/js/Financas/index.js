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

// Preenche a data inicial na tela
  function prenchedata(){
    var date = new Date();
      date = new Date(date.getFullYear(), date.getMonth(), 1);
    primeiroDia = date.toLocaleDateString('en-CA', {timeZone: 'UTC'});
    date = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
    ultimoDia = date.toLocaleDateString('en-CA', {timeZone: 'UTC'});    
    document.getElementById('fdataInicio').value = primeiroDia;
    document.getElementById('fdataFim').value = ultimoDia;
    pesquisar();
  }

  // Realiza o insert no cadastro de usuarios  
  async function inserir() {

    var data = document.getElementById('fdata').value;
    var tipo = document.getElementById('ftipo').value;
    var desc = document.getElementById('fdescricao').value;
    var valor = document.getElementById('fvalor').value;
    reset();
    var data = JSON.stringify({
      "data": data,
      "tipo": tipo,
      "desc": desc,
      "valor": valor,
    });
    post('/contas/inserir', data);
    pesquisar();
  }
  
  // Realiza busca e retorna lista de lancamentos
  function pesquisar() {

    var inicio = document.getElementById('fdataInicio').value;
    var fim = document.getElementById('fdataFim').value;
    var total = 0;
 
  
    pai = document.getElementById("listacontas");
    filho = pai.querySelector("li");
  
    while (filho !== null) {
      filho.remove();
      pai = document.getElementById("listacontas");
      filho = pai.querySelector("li");
    }

    json = JSON.stringify({
      "data":
      {
        '$gte': inicio,
        '$lte': fim,
      }
    });
  
    axios.post('http://hrnk:3000/contas/pesquisar', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => lista(response.data))
      .catch(error => console.log(error))
  
    const lista = (lcontas) => {
      const ulConta = document.getElementById('listacontas')
      lcontas.map(lcontas => {
      const listaConta = document.createElement('li')
      var date = new Date(lcontas.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
      listaConta.innerHTML = `<a href="#" onclick="cadastro('${lcontas._id}');return false"</> ${date} - ${lcontas.tipo} - ${lcontas.desc} - ${lcontas.valor}`;
      total += lcontas.valor;

      ulConta.appendChild(listaConta);
      })
      // Removendo um nó a partir do pai
      
      const totalGeral = document.getElementById('totalGeral')
      totalGeral.innerHTML = total;
      document.getElementById("totalGeral").appendChild(totalGeral);
    }
  }
  
  // Retorna cadastro para preencher form
  function cadastro(id) {
    const data = cadastro2(id);
    return (data);
  }
  async function cadastro2(id) {
    const json = JSON.stringify({
      "_id": id
    });
     // Remove saved data from sessionStorage
    sessionStorage.removeItem('key');
    // Remove all saved data from sessionStorage
    sessionStorage.clear();
    // Save data to sessionStorage      
    sessionStorage.setItem('key', id);
    const res = await axios.post('http://hrnk:3000/contas/pesquisar', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    const x = res.data[0];
    if (res.data[0]) {
      var date = res.data[0].data;
      data = new Date(date).toLocaleDateString('en-CA', {timeZone: 'UTC'});
      document.getElementById('fdata').value = data;
      document.getElementById('ftipo').value = res.data[0].tipo;
      document.getElementById('fdescricao').value = res.data[0].desc;
      document.getElementById('fvalor').value = res.data[0].valor;
    }
    return res;
  }
  
  // Altera dados
  function alterar() {

    var id = sessionStorage.getItem('key');
    var data = document.getElementById('fdata').value;    
    var tipo = document.getElementById('ftipo').value;
    var descricao = document.getElementById('fdescricao').value;
    var valor = document.getElementById('fvalor').value;    
    var data = JSON.stringify({
      "_id": id,
      "data": data,
      "tipo": tipo,
      "desc": descricao,
      "valor": valor
    });
    post('/contas/alterar', data)
    pesquisar();
  }
  
  /**
  * Excluir dados
  */
  function excluir() {
    reset();
    var id = sessionStorage.getItem('key');
    var data = JSON.stringify({
      "_id": id
    });
    post('/contas/excluir', data);
    pesquisar();
  }
  
  function reset() {
    document.getElementById('fdata').value = '';
    document.getElementById('ftipo').value = '';
    document.getElementById('fdescricao').value = '';
    document.getElementById('fvalor').value = '';
  }
  
 