let currentPageUrl = 'https://swapi.dev/api/films/'        // --> Essa varável vai armazenar a nossa URL da API (End Point)

window.onload = async () => {                               // --> Essa função é nativa do JS. Toda vez que a página for carregada, ela vai chamar essa função
    try {                                                   // --> No try, vamos tentar uma execução
       await loadFilms(currentPageUrl);                // --> Essa função "loadCharacters()" vai ser a principal do nosso projeto, ela vai pegar a URL da "currentPageUrl" e fazer uma requisição para a API, para trazer os resultados e transformar esses resultados nos nossos cards de personagens
    } catch (error) {                                       // --> Caso a execução do Try não der certo, vamos mostra a mensagem de erro atravé do Catch
        console.log(error);
        alert('Erro ao carregar os cards!')
    }

    const nextButton = document.getElementById('next-button');      // --> (aula 7) Representa o butão de "próximo" da página
    const backButton = document.getElementById('back-button');      // --> (aula 7) Representa o butão "anterior" da página

    nextButton.addEventListener('click', loadNextPage);                    // --> (aula 7) O "addEventListener", vai moniorar eventos no elemento escolhido. No caso, vamos monitorar o evente de "click". E toda vez que houver o click nesse botão, será executado a funçãp "loadNextPage"
    backButton.addEventListener('click', loadPreviousPage);                // --> (aula 7) Tem a mesma lógica do anterior, mas como se trata do botão de voltar, usamos a função "loadPreviusPage" 
};


async function loadFilms (url){
    const mainContent = document.getElementById("main-content")
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((films) => {

            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/films/${films.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards";

            const filmNameBg = document.createElement("div")
            filmNameBg.className = "film-name-bg";

            const filmName = document.createElement("span")
            filmName.className = "film-name"
            filmName.innerHTML = `${films.title}`;

            filmNameBg.appendChild(filmName);
            card.appendChild(filmNameBg);

            card.onclick = () => {

                const modal = document.getElementById("modal")
                modal.style.visibility = "visible";

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = '';

                const filmImage = document.createElement("div")
                filmImage.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/films/${films.url.replace(/\D/g, "")}.jpg')`;
                filmImage.className = "film-image"

                const title = document.createElement("span")
                title.className = "film-details"
                title.innerHTML = `Titulo: ${films.title}`;

                const episode = document.createElement("span")
                episode.className = "film-details"
                episode.innerHTML = `Episodio: ${films.episode_id}`;

                const director = document.createElement("span")
                director.className = "film-details"
                director.innerHTML = `Diretor: ${films.director}`;

                const producer = document.createElement("span")
                producer.className = "film-details"
                producer.innerHTML = `Produtor: ${films.producer}`

                const releaseDate = document.createElement("span")
                releaseDate.className = "film-details"
                releaseDate.innerHTML = `Data: ${convertDate(films.release_date)}`
                                
                modalContent.appendChild(filmImage)
                modalContent.appendChild(title)
                modalContent.appendChild(episode)
                modalContent.appendChild(director)
                modalContent.appendChild(producer)
                modalContent.appendChild(releaseDate)
            }

            mainContent.appendChild(card)
            
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden";
        nextButton.style.visibility = responseJson.next? "visible" : "hidden";

        currentPageUrl = url

    } catch (error){
        console.log(error)
        alert('Erro ao carregar os filmes.')
    }
}

function hideModal() {                                              // --> (aula 9) Criamos a função da janela com as informações dos personagens. O "hideModal ()" está presente no html dentro da div modal
    const modal = document.getElementById("modal")                  // --> (aula 9) Criamos uma variável que vai representar o modelo do "modal", que está no html
    modal.style.visibility = "hidden"                               // --> (aula 9) Agora estamos manipulando esse elemento deixando o modelo escondido (hidden)
}

function convertDate(releaseDate){
    const [ano, mes, dia] = releaseDate.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada
}