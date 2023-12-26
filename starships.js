let currentPageUrl = 'https://swapi.dev/api/starships/'

window.onload = async () => {
    try {
        await loadStarships(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Não foi possível carregar os cards');
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');
    
    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
};

async function loadStarships(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach(async (starship) => {
            const cards = document.createElement("div");
            cards.className = "cards";

            const starshipImage = document.createElement("div");
            starshipImage.className = "cards";

            try {
                const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${starship.url.replace(/\D/g, "")}.jpg`;
                const finalImageUrl = await loadImage(imageUrl);
                starshipImage.style.backgroundImage = `url('${finalImageUrl}')`;
            } catch (error) {
                console.error(error);
                // Em caso de erro, você pode definir uma imagem padrão ou de placeholder
                starshipImage.style.backgroundImage = `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsB7mCEkkGjFeTeXixdof0o6mtl3DmJahWhw&usqp=CAU')`;
            }

            const starshipNameBg = document.createElement("div");
            starshipNameBg.className = "starship-name-bg";

            const starshipName = document.createElement("span");
            starshipName.className = "starship-name";
            starshipName.innerHTML = `${starship.name}`;

            starshipImage.appendChild(starshipNameBg);
            starshipNameBg.appendChild(starshipName)
            cards.appendChild(starshipImage);


            cards.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";

                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = '';

                const starshipImage = document.createElement("div")
                starshipImage.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/starships/${starship.url.replace(/\D/g, "")}.jpg')`
                starshipImage.className = "starship-image"

                const name = document.createElement("span");
                name.className = "starship-details";
                name.innerHTML = `Nave: ${starship.name}`;

                const model = document.createElement("span");
                model.className = "starship-details";
                model.innerHTML = `Modelo: ${starship.model}`;

                const manufacturer = document.createElement("span");
                manufacturer.className = "starship-details";
                manufacturer.innerHTML = `Fabricante: ${starship.manufacturer}`;

                const length = document.createElement("span");
                length.className = "starship-details";
                length.innerHTML = `Comprimento: ${starship.length}m`;

                const speed = document.createElement("span");
                speed.className = "starship-details";
                speed.innerHTML = `Velocidade maxima: ${starship.max_atmosphering_speed}`;

                const passengers = document.createElement("span");
                passengers.className = "starship-details";
                passengers.innerHTML = `Passageiros: ${convertPassengers(starship.passengers)}`;

                modalContent.appendChild(starshipImage)
                modalContent.appendChild(name);
                modalContent.appendChild(model);
                modalContent.appendChild(manufacturer);
                modalContent.appendChild(length);
                modalContent.appendChild(speed);
                modalContent.appendChild(passengers);
            };
            
            mainContent.appendChild(cards);
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        nextButton.style.visibility = responseJson.next ? "visible" : "hidden";
        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

        currentPageUrl = url;

    } catch (error) {
        console.log(error);
        alert("Erro ao carregar as naves");
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadStarships(responseJson.next);

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadStarships(responseJson.previous);

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
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

function convertPassengers(passengers) {                // --> (aula10) Essa função vai substituir os valores da api que estão em inglês, para o portugues. No caso, para a cor dos lhos na descrição dos personagens.
    const passageiros = {
        
        unknown: "desconhecido"
    }

    return passageiros[passengers.toLowerCase()] || passengers;
}