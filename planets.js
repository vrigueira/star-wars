let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl)
    }catch (error) {
        console.log(error)
        alert('Erro ao carregar os cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadPlanets (url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try {
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach(async (planet) => {

            const card = document.createElement("div")
            card.className = "card"

            const planetImage = document.createElement("div")
            planetImage.className = "card"

            try {
                const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg`
                const finalImageUrl = await loadImage(imageUrl)
                planetImage.style.backgroundImage = `url('${finalImageUrl}')`
            } catch (error) {
                console.error(error)
                planetImage.style.backgroundImage = `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsB7mCEkkGjFeTeXixdof0o6mtl3DmJahWhw&usqp=CAU')`
            }

            const planetNameBg = document.createElement("div")
            planetNameBg.className = "planet-name-bg"

            const planetName = document.createElement("div")
            planetName.className = "planet-name"
            planetName.innerHTML = `${planet.name}`

            planetImage.appendChild(planetNameBg)
            planetNameBg.appendChild(planetName)
            card.appendChild(planetImage)

            card.onclick = () => {

                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const planetImage = document.createElement("div")
                planetImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
                planetImage.className = "planet-image"

                const name = document.createElement("span")
                name.className = "planet-details"
                name.innerHTML = `Nome: ${planet.name}`

                const diameter = document.createElement("span")
                diameter.className = "planet-details"
                diameter.innerHTML = `Diametro: ${planet.diameter} km`

                const climate = document.createElement("span")
                climate.className = "planet-details"
                climate.innerHTML = `Clima: ${convertClimate(planet.climate)}`

                const terrain = document.createElement("span")
                terrain.className = "planet-details"
                terrain.innerHTML = `Terreno: ${convertTerrain(planet.terrain)}`

                const population = document.createElement("span")
                population.className = "planet-details"
                population.innerHTML = `Habitantes: ${convertPopulation(planet.population)}`

                modalContent.appendChild(planetImage)
                modalContent.appendChild(name)
                modalContent.appendChild(diameter)
                modalContent.appendChild(climate)
                modalContent.appendChild(terrain)
                modalContent.appendChild(population)
            }

            mainContent.appendChild(card)
        })

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        nextButton.style.visibility = responseJson.next? "visible" : "hidden"
        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        console.log(error)
        alert("Erro ao carregar os planetas")
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;
    
    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.next)

    } catch (error) {
        console.log(error)
        alert("Erro ao carregar a próxima página")
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;
    
    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert("Erro ao carregar a página anterior")
    }
}

async function loadImage(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return url;
        } else {
            throw new Error('Imagem não encontrada');
        }
    } catch (error) {
        console.error(error);
        // URL de uma imagem de placeholder ou padrão
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsB7mCEkkGjFeTeXixdof0o6mtl3DmJahWhw&usqp=CAU';
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertClimate(climate) {
    const clima = {
        arid: "arido",
        temperate: "temperado",
        frozen: "congelado",
        murky: "obscuro",
        windy: "ventoso",
        hot: "quente",
        frigid: "gelado",
        humid: "umido",
        moist: "umido",
        polluted: "poluido",
        superheated: "superaquecido",
        subartic: "subartico",
        artic: "artico",
        rocky: "rochoso",
        none: "nenhum",
        unknown: "desconhecida"
    }
    const climateArray = climate.split(',').map(tipo => tipo.trim());
    const climaTraduzido = climateArray.map(tipo => {

        return clima[tipo] || tipo;
  });

    return climaTraduzido;
}

function convertTerrain(terrain) {
    const terreno = {
        deserts: "desertos",
        desert: "desertos",
        rainforests: "florestas tropicais",
        rivers: "rios",
        mountains: "montanhas",
        mountain: "montanhas",
        jungles: "selvas",
        forests: "florestas",
        oceans: "oceanos",
        glaciers: "geleiras",
        urban: "urbano",
        vines: "vinhas",
        plains: "planicies",
        hills: "colinas",
        cities: "cidades",
        savannahs: "savanas",
        seas: "mares",
        cliffs: "falesias",
        canyons: "desfiladeiros",
        barrain: "esteril",
        ash: "cinza",
        plateaus: "planaltos",
        volcanes: "vulcoes",
        verdant: "verdejante",
        lakes: "lagos",
        islands: "ilhas",
        swamps: "pantanos",
        swamp: "pantanos",
        reefs: "recifes",
        savannas: "savanas",
        valleys: "vales",
        cityscape: "paisagem urbana",
        bogs: "pantanos",
        grasslands: "pastagens",
        barren: "esteril",
        sinkholes: "buracos",
        scrublands: "matagais",
        caves: "cavernas",
        fields: "campos",
        grass: "grama",
        rock: "pedras",
        none: "nenhum",
        unknown: "desconhecida"
    }
     // Remove espaços em branco desnecessários antes de dividir por vírgula
     const terrainArray = terrain.replace(/\s*,\s*/g, ',').split(','); 

     const terrenoTraduzido = terrainArray.map(tipo => {
         return terreno[tipo.trim()] || tipo.trim();
     });
 
     // Junta os termos traduzidos separados por vírgula e espaço
     return terrenoTraduzido.join(', ');
 }

function convertPopulation(population) {
     
    if (population === "unknown") { 
                              
        return "desconhecido"
    } else if (!isNaN(population)) {
        return Number(population).toLocaleString('pt-BR');
    }

    return population
}

/* const terreno = [
    {us:"deserts", pt:"desertos"},
    {us:"rainforests", pt:"florestas tropicais"},
    {us:"rivers", pt:"rios"},
    {us:"mountains", pt:"montanhas"}
*/