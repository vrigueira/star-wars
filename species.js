let currentPageUrl = 'https://swapi.dev/api/species/'

window.onload = async () => {
    try {
        await loadSpecies(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os cards!')
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

}

async function loadSpecies (url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try {
        const response = await fetch (url)
        const responseJson = await response.json()

        responseJson.results.forEach((specie) => {

            const card = document.createElement("div")
            card.style.backgroundImage =
            `url('https://starwars-visualguide.com/assets/img/species/${specie.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const specieNameBg = document.createElement("div")
            specieNameBg.className = "specie-name-bg"

            const specieName = document.createElement("span")
            specieName.className = "specie-name"
            specieName.innerHTML = `${convertName(specie.name)}`

            specieNameBg.appendChild(specieName)
            card.appendChild(specieNameBg)

            card.onclick = () => {

                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const specieImage = document.createElement("div")
                specieImage.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/species/${specie.url.replace(/\D/g, "")}.jpg')`
                specieImage.className = "specie-image"

                const name = document.createElement("span")
                name.className = "specie-details"
                name.innerHTML = `Especie: ${convertName(specie.name)}`

                const classification = document.createElement("span")
                classification.className = "specie-details"
                classification.innerHTML = `Grupo: ${convertClassification(specie.classification)}`

                const averageHeight = document.createElement("span")
                averageHeight.className = "specie-details"
                averageHeight.innerHTML = `Altura Media: ${convertHeight(specie.average_height)}m`

                const skinColors = document.createElement("span")
                skinColors.className = "specie-details"
                skinColors.innerHTML = `Cor da Pele: ${convertSkinColors(specie.skin_colors)}`

                const hairColors = document.createElement("span")
                hairColors.className = "specie-details"
                hairColors.innerHTML = `Cor do Cabelo: ${convertHairColors(specie.hair_colors)}`

                const eyeColors = document.createElement("span")
                eyeColors.className = "specie-details"
                eyeColors.innerHTML = `Cor dos olhos: ${convertEyeColors(specie.eye_colors)}`

                modalContent.appendChild(specieImage)
                modalContent.appendChild(name)
                modalContent.appendChild(classification)
                modalContent.appendChild(averageHeight)
                modalContent.appendChild(skinColors)
                modalContent.appendChild(hairColors)
                modalContent.appendChild(eyeColors)

            }

            mainContent.appendChild(card);
            
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        nextButton.style.visibility = responseJson.next? "visible" : "hidden"
        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar as espécies.')
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadSpecies(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página.')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadSpecies(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior.')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertName(name){
    const nomes = {
        human: "humano",
        droid: "androide"
    }

    return nomes[name.toLowerCase()] || name
}

function convertClassification(classification) {
    const group = {
        mammal: "mamifero",
        mammals: "mamifero",
        amphibian: "anfibio",
        insectoid: "insetoid",
        reptilian: "reptiliano",
        reptile: "reptil",
        artificial: "robo",
        sentient: "reptiliano",
        unknown: "desconhecido"

    }

    return group[classification.toLowerCase()] || classification
}

function convertEyeColors(eyeColors) {
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
        amber: "ambar",
        grey: "cinza",
        golden: "dourado",
        unknown: "desconhecida"
    }
    const coresArray = eyeColors.split(', ');
    const coresTraduzidas = coresArray.map(cor => {

        return cores[cor] || cor;
  });
    const coresTraduzidasString = coresTraduzidas.join(', ');
    return coresTraduzidasString;
}

function convertHairColors(hairColors) {
    const cores = {
        blue: "azul",
        blonde: "loiro",
        white: "braco",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        none: "nenhum",
        unknown: "desconhecida"
    }
    const coresArray = hairColors.split(', ');
    const coresTraduzidas = coresArray.map(cor => {

        return cores[cor] || cor;
  });

    return coresTraduzidas;
}

function convertSkinColors(skinColors) {
    const cores = {
        caucasian: "branca",
        black: "preta",
        dark: "escura",
        asian: "asiatica",
        hispanic: "hispanica",
        unknown: "desconhecida",
        grey: "cinza",
        gray: "cinza",
        green: "verde",
        blue: "azul",
        yellow: "amarelo",
        red: "vermelho",
        brown: "marrom",
        pale: "palida",
        orange: "laranja",
        pink: "rosa",
        purple: "roxo",
        tan: "bronzeada",
    }
    const coresArray = skinColors.split(', ');
    const coresTraduzidas = coresArray.map(cor => {

        return cores[cor] || cor;
  });
    const coresTraduzidasString = coresTraduzidas.join(', ');
    return coresTraduzidasString;
}

function convertHeight(height) {                      // --> (aula 10) Essa função vai fazer a conversão da altura do personagem
    if (height === "unknown") {                       // --> (aula 10) Se caso a altura estiver como unknown na api, o restorno vai ser a string "desconhecida"
        return "desconhecida"
    }

    return (height / 100).toFixed(2);                 // --> (aula10) Caso nao for unknown, o retorno vai ser ser a altura que está na api, dividido por 100, e damos um "toFixed" para mostrar apenas 2 casas decimais
}