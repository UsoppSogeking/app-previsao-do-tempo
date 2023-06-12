let chave = "cebcd482eda57fa9a6714c1c2ba91885" // armazena a chave da nossa API

function colocarNaTela(dados){ //Função responsalvel por colocar os dados coletados do servidor na tela
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name; //Captura o H2 e altera o texto com base no nome da cidade que pesquisamos e chega do servidor
    document.querySelector(".temp").innerHTML =  Math.floor(dados.main.temp) + "°C"; //Captura a temperatura e altera seu valor com base no dado de temperatura que chega do servidor
    document.querySelector(".descricao").innerHTML = dados.weather[0].description; //Captura a descrição do tempo(ex: nublado, ensolarada, etc) e altera seu valor com bases nos dados que chegam do servidor
    document.querySelector(".icone").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;//Captura o icone e o altera de acordo com os dados da descrição que chegam do servidor
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity+"%"; //Altera o valor da humidade com base nos valores que chegam do servidor
}

async function buscarCidade(cidade){ // Função que busca informação no servidor / É necessario uma função assincrona p/ acessar um servidor externo
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + /*armazena os dados que chegam do servidor, o papel do await é fazer com que o JS espere até que os dados cheguem do servidor p/ que ele continue executando o código, o fetch tbm serve p/ acessar o servidor 
    */
    cidade + //Variavel nome da cidade(que armazena a cidade que o usuario digitou)
    "&appid=" + 
    chave +  //Varia el chave
    "&lang=pt_br" + //Passa dos dados do servidor p/ pt-br
    "&units=metric" //Transforma os dados de temperatura do servidor de fireheint p/ graus celsius
    )
    .then(resposta => resposta.json()); //pega a resposta do servidor e passa p/ o formado json() e ele vai guardar a resposa e armazenar em dados

    colocarNaTela(dados);//coloca os dados que chegaram do servidor na tela
}

function cliqueiNoBotao(){ //Função de clique no botão p/ capturar o valor do input
   let cidade = document.querySelector(".input-cidade").value; // Captura o valor digitado no input

   buscarCidade(cidade);
}
