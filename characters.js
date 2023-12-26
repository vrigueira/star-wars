let currentPageUrl = 'https://swapi.dev/api/people/'        // --> Essa varável vai armazenar a nossa URL da API (End Point)

window.onload = async () => {                               // --> Essa função é nativa do JS. Toda vez que a página for carregada, ela vai chamar essa função
    try {                                                   // --> No try, vamos tentar uma execução
       await loadCharacters(currentPageUrl);                // --> Essa função "loadCharacters()" vai ser a principal do nosso projeto, ela vai pegar a URL da "currentPageUrl" e fazer uma requisição para a API, para trazer os resultados e transformar esses resultados nos nossos cards de personagens
    } catch (error) {                                       // --> Caso a execução do Try não der certo, vamos mostra a mensagem de erro atravé do Catch
        console.log(error);
        alert('Erro ao carregar os cards!')
    }

    const nextButton = document.getElementById('next-button');      // --> (aula 7) Representa o butão de "próximo" da página
    const backButton = document.getElementById('back-button');      // --> (aula 7) Representa o butão "anterior" da página

    nextButton.addEventListener('click', loadNextPage);                    // --> (aula 7) O "addEventListener", vai moniorar eventos no elemento escolhido. No caso, vamos monitorar o evente de "click". E toda vez que houver o click nesse botão, será executado a funçãp "loadNextPage"
    backButton.addEventListener('click', loadPreviousPage);                // --> (aula 7) Tem a mesma lógica do anterior, mas como se trata do botão de voltar, usamos a função "loadPreviusPage" 
};    

// Resumindo: A página foi carregada e daí vai chamar a função "window.onload". Essa função é assíncrona, então colocamos o
// "async" antes da promisse. Na tentativa de execução "Try" ela vai esperar (await) o retorno da função "loadCharacters" onde 
// teremos a execução da API que se encontra na "currentPageUrl". Se tiver algum erro a função irá exibir o "alert"

// Agora vamos criar o corpo da função loadCharacters:

async function loadCharacters (url) {                                   // --> Toda vez que a função "loadCharacters" for chamada, ela vai esperar receber dentro dela o parâmetro que á URL
    const mainContent = document.getElementById('main-content')         // --> Essa variável vai pegar um elemento do nosso HTML através do "document.getElementById", cujo o Id do elemento que queremos manipular, no caso é o "main-content", que se encontra no nosso documento index.html. 
    mainContent.innerHTML = '';                                         // --> Pegamos a nossa variável "mainContent" e demos um ".innerHTML", essa propriedade permite modificar o Html que está dentro desse elemento. Iguamalmos a string vazia para "limpar os resultados anteriores"

    try {
        
        const response = await fetch(url);                              // --> A variável "response" vai amazenar o resultado da requisição (fetch). Vamos passar dentro do "fetch" a URL que estamos recebendo.
        const responseJson = await response.json();                     // --> Aqui fazemos a transformação do resultado da requisição da nossa API em Json.

        responseJson.results.forEach((character) => {                   // --> O "results" está dentro da API e vamos utilizar o método forEach para iterar com os arrys contidos no responseJson. Dentro do método criamos a função anonima characters.

           const card = document.createElement("div");                  // --> O create.Element vai transformar a variável card em uma div
           card.style.backgroundImage = 
           `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;   // -->(*1) O style.backgroundImage vai adicionar uma imagem pro fundo da div card.  
           card.className = "cards";                                    // --> O className vai dar o nome da classe

           const characterNameBg = document.createElement("div");
           characterNameBg.className = "character-name-bg";

           const characterName = document.createElement("span");
           characterName.className = "character-name";
           characterName.innerText = `${character.name}`;               // --> O innerText vai alterar o conteudo de texto do elemento e o "name" está dentro da nossa API

           characterNameBg.appendChild(characterName);                  // --> O appendChild vai reposicionar as divs criadas umas dentro das outras, assim como no html. Começamos de trás para frente.
           card.appendChild(characterNameBg);

           card.onclick = () => {                                       // --> (aula 9) Aqui vamos colocar a função de click no card
            const modal = document.getElementById("modal");              // --> (aula 9) Chamamos o elemento no html
            modal.style.visibility = "visible";                          // --> (aula 9) E colocamos como "visible". Ou seja, quando o card for clicado a div modal do html ficará visível.

            const modalContent = document.getElementById("modal-content"); // --> (aula 10) Chamamos a div do htm que tem o conteúdo do nosso modal
            modalContent.innerHTML = '';                                   // --> (aula 10) Pegamos a nossa variável "modalContent" e demos um ".innerHTML", essa propriedade permite modificar o Html que está dentro desse elemento. Iguamalmos a string vazia para "limpar os resultados anteriores"                 

            const characterImage = document.createElement("div");        // --> (aula 10) Criamos uma variável "characterImage" e transformamos ela em uma div, através do "createElement"
            characterImage.style.backgroundImage =                      // --> (aula 10) E aqui vamos alterar o estilo do background com a imagem do personagem
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;  // --> (aula 10) Essa template string foi explicada no link anterior
            characterImage.className = "character-image";                // --> (aula 10) E aqui damos uma classe a ela para poder fazer as alterações no css

            const name = document.createElement("span");                    // --> (aula 10) Aqui vamos transformar a variável "name" em um "span" para poder colocar as informações de nome do personagem
            name.className = "character-details";                           // --> (aula 10) Demos uma classe para "name" 
            name.innerText = `Nome: ${character.name}`;                     // --> (aula 10) Demos um "innerText" para inserir a informação do nome, e dentro uma template string chamando o "character" que recebemos dentro do nosso método "forEach", com o ".name", que é a identificação do nome do personagem da nossa api

            const characterHeight = document.createElement("span");         // --> (aula 10) Mesma lógica do anterior, só que agora é para a altura do personagem
            characterHeight.className = "character-details";                
            characterHeight.innerText = `Altura: ${convertHeight(character.height)}m`;  // --> (aula 10) A função "convertHeight" foi criada no fim da página"

            const mass = document.createElement("span");                    // --> (aula 10) Mesma lógica do anterior, só que agora é para o peso do personagem
            mass.className = "character-details";
            mass.innerText = `Peso: ${convertMass(character.mass)}`;

            const eyeColor = document.createElement("span");                // --> (aula 10) Mesma lógica do anterior, só que agora é para a cor dos olhos do personagem
            eyeColor.className = "character-details";
            eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`; // --> (aula 10) A função "convertEyeColor" foi criada no fim da página"

            const birthYear = document.createElement("span");               // --> (aula 10) Mesma lógica do anterior, só que agora é para o ano de nascimento do personagem
            birthYear.className = "character-details";
            birthYear.innerText = `Nascimento: ${convertBirtYear(character.birth_year)}`;

            modalContent.appendChild(characterImage);                        // --> (aula 10) Aqui vamos jogar a div com a imagem do personagem e os "spans" com as outras informações dentro da div "modalContent"
            modalContent.appendChild(name);
            modalContent.appendChild(characterHeight);
            modalContent.appendChild(mass);
            modalContent.appendChild(eyeColor);
            modalContent.appendChild(birthYear);
           }

           mainContent.appendChild(card);

        });

        const nextButton = document.getElementById('next-button');      // --> (aula 7) Aqui retomamos os botões inseridos no início da página, por estar dentro de outra função.
        const backButton = document.getElementById('back-button');      // --> (aula 7) Aqui retomamos os botões inseridos no início da página, por estar dentro de outra função.
        
        nextButton.disabled = !responseJson.next;                        // --> (aula 7) Aqui manipulamos o "disabled" dos botões para as páginas certas. O "next" está na nossa api com o link da página seginte. Nesse caso, quando não "!" tivermos o next, o botão estará disabled. Isso vai acontecer na última página.
        backButton.disabled = !responseJson.previous;                    // --> (aula 7) Nesse caso temos a mesma lógica que o anterior. No caso, quando não tivermos o "previous" na nossa API, ele estará desabilitado. Isso vai acontecer na primeira página

        backButton.style.visibility = responseJson.previous? "visible" : "hidden";     // --> (aula 7) Agora estamos manipulando o estilo (style) de visibilidade (visibility) do botão. Atribuímos a resposta que vem da api (responseJson), perguntando se existe o "previous?". Para fazer essa verificação, vamos utilizar o operador ternário ":", onde, caso for true, o estilo vai ficar "visible", ou se for false, ficará como "hidden"
        nextButton.style.visibility = responseJson.next? "visible" : "hidden"          // --> (aula 7) Mesma lógica do anterior

    currentPageUrl = url                                                // --> Na primeira linha do código o valor da variável "currentPageUrl" é referente a primeira página da nossa API. Mas quando a gente mudar de página a "url" vão ser as páginas seguintes.

    } catch (error){
        console.log(error)
        alert('Erro ao carregar os personagens.')
    }
}

async function loadNextPage() {                                     // --> (aula 8) Nessa variável vamos fazer a lógica navegação para quando apertar-mos o botão de próxima página

    if (!currentPageUrl) return;                                    // --> (aula 8) Aqui estamos previnindo um erro. Se (if) o valor da variável "currentPageUrl" for nulo "!", ele vai dar um return. Nesse caso, ele não vai fazer mais nada.

    try {
        const response = await fetch(currentPageUrl);               // --> (aula 8) Aqui vamos fazer uma nova requisição para API, para obter o link da próxma página que se encontra no "next"
        const responseJson = await response.json();                 // --> (aula 8) Concluindo a requisição para Json
        
        await loadCharacters(responseJson.next)                     // --> (aula 8) Aqui chamamos a função "loadCharacters" que é a construção dos personagens e executamos o "next" que na API contém o link da página seguinte.

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página.')
    }
}

async function loadPreviousPage() {                                 // --> (aula 8) Nessa variável vamos fazer a lógica navegação para quando apertar-mos o botão para página anterior.

    if (!currentPageUrl) return;                                    // --> (aula 8) Aqui estamos previnindo um erro. Se (if) o valor da variável "currentPageUrl" for nulo "!", ele vai dar um return. Nesse caso, ele não vai fazer mais nada.

    try {
        const response = await fetch(currentPageUrl);               // --> (aula 8) Aqui vamos fazer uma nova requisição para API, para obter o link da próxma página que se encontra no "next"
        const responseJson = await response.json();                 // --> (aula 8) Concluindo a requisição para Json
        
        await loadCharacters(responseJson.previous)                 // --> (aula 8) Aqui chamamos a função "loadCharacters" que é a construção dos personagens e executamos o "next" que na API contém o link da página seguinte.

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior.')
    }
}

function hideModal() {                                              // --> (aula 9) Criamos a função da janela com as informações dos personagens. O "hideModal ()" está presente no html dentro da div modal
    const modal = document.getElementById("modal")                  // --> (aula 9) Criamos uma variável que vai representar o modelo do "modal", que está no html
    modal.style.visibility = "hidden"                               // --> (aula 9) Agora estamos manipulando esse elemento deixando o modelo escondido (hidden)
}

function convertEyeColor(eyeColor) {                // --> (aula10) Essa função vai substituir os valores da api que estão em inglês, para o portugues. No caso, para a cor dos lhos na descrição dos personagens.
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    }

    return cores[eyeColor.toLowerCase()] || eyeColor;           // --> (aula1 0) Se caso o retorno estiver dentro do objeto cores, ele vai retornar o valor que colocamos dentro da const cores, caso não, ele vai retornar o original. 
    // --> Como escrevemos as cores em letra minúscula, e na API se encontra em letra maiúscula, fizemos a conversão com o "toLowerCase"
}

function convertHeight(height) {                      // --> (aula 10) Essa função vai fazer a conversão da altura do personagem
    if (height === "unknown") {                       // --> (aula 10) Se caso a altura estiver como unknown na api, o restorno vai ser a string "desconhecida"
        return "desconhecida"
    }

    return (height / 100).toFixed(2);                 // --> (aula10) Caso nao for unknown, o retorno vai ser ser a altura que está na api, dividido por 100, e damos um "toFixed" para mostrar apenas 2 casas decimais
}

function convertMass(mass) {                         // --> (aula 10) Mesma lógica do anterior
    if (mass === "unknown") {                        
    }

    return `${mass} kg`                               // --> (aula 10) Cso não for unknow, vai retornar o valor da api (mass) acrescentado de "kg"
}

function convertBirtYear(birthYear) {                  // --> (aula 10) Mesma lógica do anterior
    if (birthYear === "unknown") {                       
        return "desconhecido"
    }

    return birthYear
}


// Resumindo: Depois de atualizarmos a página e executar a função (window.onload), onde, aguardamos a execução do nossa 
// função "loadCharacters" que recebe a url (currentPageUrl), temos que criar o corpo da nossa promisse pois é uma função assíncrona,
// onde esperaramos (await) um resultado. Ela recebe o parametro da URL para fazer a requisição da API.

// Dentro da função "loadCharacters", criamos uma variável "mainContent" onde pegamos o elemento "main-content" que está no nosso 
// arquivo index.html. 
// Fizemos isso através do "document.getElementById". Também nessa variável demos um ".innerHTML" para modificar o elemento HTML
// que está sendo chamado, no caso, o "main-content". Após, igualamos a variável "mainContent" para string vazia, pois quando
// fizermos a mudança de página, ela irá apagar os dados da API da página anterior e estará pronta para receber os dados dos 
// personagens da página atual.

// Após isso, dentro do nosso "try" criamos a variável "response", aguardamos (await) a requisição do método "fetch" que vai ter a 
// "url" que estamos RECEBENDO. O "fetch" vai executar a "url" que estamos recebendo após a execução do "window.onload", pois dentro 
// dele temos a EXECUÇÃO da nossa função (loadCharacters), onde chamamos a "currentPage" onde se encontra a "Url" que contém a 
// nossa API. Logo, a variável "response" vai armazenar o resultado dessa requisição.

// Quando recebemos a resposta da nossa API que foi solicitada através do "fetch", essa API tem que ser transformada para o formato
// Json, porque só assim podemos iterar com os arraya (transformado pelo Json). Para isso, criamos uma nova variável (responseJson) 
// para fazer essa transformação. Nela vamos aguardar (await) a execução da variável "response" ser atribuida ao formato Json, 
// através do "response.Json". Logo, agora teremos os valores da requisição da API em formato Json (formato de array) na variável 
// "responseJson".

// Agora, faremos algo muito importante que é iterar com esse array, Iterar, nada mais é que uma repetição de uma determinada
// coisa. Para iterar, criamos o método "forEach" fazendo o "responseJson.results.forEach". Dentro do nosso "forEach" temos uma
// função anônima com o nome de "character", ou seja ela vai iterar com cada objeto do array e cada objeto do array vai ser um
// personagem (character). Obs.: Utilizamos o ".results" porque dentro da nossa API, as informações dos personagens estão dentro
// do ojeto de array "results", por isso chamamos ela. Ou seja, o "responseJson" tem a informaçõa de toda a nossa API já transformada
// em array pelo "Json", mas queremos especificamente as informações do "results" contida nela.

// Agora vamos criar os cards propriamente ditos. Para isso, dentro da nossa função anônima "character", criamos uma variável com o
// nome "card" e atribuímos o método "document.creatElement". Esse método vai criar um elemento (tag) Html. Esse elemento pode ser
// uma div, um span, um h1... Podemos criar qualquer tag usando esse método, no caso, criamos uma "div".
// Agora que transformamos a nossa variável "card" em uma "div", vamos dar uma estilo a ela, igual fazemos no index.html. Para isso,
// demos um "card.style.backgroundImage", ou seja, estamos atribuindo um estilo de backgroundImage a essa div, informando o link
// https da imagem, igual fizemos no index.html. Temos que colocar essa url dentre de crase (``) pois mais pra frente vamos precisar
// concatenar o id dos personagens no link usando a template string, então abrimos a crase, e sem espaços colocamos a
// "url", abrimos parênteses e colocamos o link dentro de áspas simples.
// E para completar a nossa "div", temos que dar uma classe pra ela, assim como no html. Para isso, chamamos novamente a nossa
// variável "card" e damos um ".className", atribuindo o nome "cards", dentro de áspas duplas.

// Fizemos o mesmo procedimento com as variáveis "characterNameBg" que é uma "div" com a class de "character-name-bg", e por último
// com a variável "characterName", que como no html é um "span" e com a class de "character-name", onde colocaremos o nome do personagem.
// Como o nosso "span" tem que receber o nome de vários personagens e não pode ser estático, chamamos novamente a nossa variável
// "characteName" e damos um ".innerText". Essa propriedade modifica o conteúdo de texto do elemento que escolhemos e depois damos
// um valor em template string com o "character" da API e o "name" do personagem, ficando então "character.name".

// Agora precisamos posicionar uma variável dentro da outra igual fazemos no html, e para isso vamos utilizar o método 
// ".appendChild()", que basicamente adiciona um filho dentro da variável chamada. Então vamos começar de trás pra frente, colocando
// o "characterName" dentro do "characterNameG", e depois colocando o mesmo "characterNameBg" dentro de "card".
// No nosso arquivo index.html, todos as divs de card estavam dentro da div main-content, que está informada aqui no nosso JS
// como a variável "mainContent", então também vamos colocar a variável "card" dentro dela, através fazendo 
// "mainContent.appendChild(card)".

// Depois de concluir o "forEach", precisamos chamar a nossa "currentPageUrl" e atribuir um novo valor para ela. Vamos
// atribuir a "url". Se´ra explicado nas próximas aulas

// Caso tenha algum erro no código, irá aparecer olert com a mensagem.

// AULA 7

// (*1) -> Na template string, chamamos o argumento "character", depois o local onde se encontra o url dentro da api, que no caso está 
// como "url" e depois o método "replace", que subtitui string por outra string. Dentro do método, vamos extrair só o ID que desejamos, 
// e para isso usamos uma expressão regular (RegExp). Essa expressão regular busca um padrão dentro de um grupo de caracteres. 
// Então para isso vamos usar o /\D/g, "".