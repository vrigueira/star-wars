const currentPageUrl = 'https://swapi.dev/api/vehicles/'

window.onload = async () => {
    try {
        await loadVehicles(currentPageUrl)
    } catch (error) {
        console.log(error)
        alert('Erro ao carregar os cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadVehicles (url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try {
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach(async (vehicle) => {

            const card = document.createElement("div")
            card.className = "card"

            const vehicleImage = document.createElement("div")
            vehicleImage.className = "card"

            try {
                const imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.replace(/\D/g, "")}.jpg`
                const finalImageUrl = await loadImage(imageUrl)
                vehicleImage.style.backgroundImage = `url('${finalImageUrl}')`
            } catch (error) {
                console.error(error)
                vehicleImage.style.backgroundImage = `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsB7mCEkkGjFeTeXixdof0o6mtl3DmJahWhw&usqp=CAU')`
            }

            const vehicleNameBg = document.createElement("div")
            vehicleNameBg.className = "vehicle-name-bg"

            const vehicleName = document.createElement("span")
            vehicleName.className = "vehicle-name"
            vehicleName.innerHTML = `${vehicle.name}`

            vehicleImage.appendChild(vehicleNameBg)
            vehicleNameBg.appendChild(vehicleName)
            card.appendChild(vehicleImage)

            card.onclick = () => {

                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const vehicleImage = document.createElement("div")
                vehicleImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.replace(/\D/g, "")}.jpg')`
                vehicleImage.className = "vehicle-image"

                const name = document.createElement("span")
                name.className = "vehicle-details"
                name.innerHTML = `Nome: ${vehicle.name}`

                const model = document.createElement("span")
                model.className = "vehicle-details"
                model.innerHTML = `Modelo: ${vehicle.model}`

                const manufacturer = document.createElement("span")
                manufacturer.className = "vehicle-details"
                manufacturer.innerHTML = `Fabricante: ${vehicle.manufacturer}`

                const length = document.createElement("span")
                length.className = "vehicle-details"
                length.innerHTML = `Comprimento: ${vehicle.length} m`

                const speed = document.createElement("span")
                speed.className = "vehicle-details"
                speed.innerHTML = `Velocidade maxima: ${vehicle.max_atmosphering_speed} km`

                const passengers = document.createElement("span")
                passengers.className = "vehicle-details"
                passengers.innerHTML = `Passageiros: ${convertPassengers(vehicle.passengers)}`

                modalContent.appendChild(vehicleImage)
                modalContent.appendChild(name)
                modalContent.appendChild(model)
                modalContent.appendChild(manufacturer)
                modalContent.appendChild(length)
                modalContent.appendChild(speed)
                modalContent.appendChild(passengers)

            }

            mainContent.appendChild(card)

        })

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        nextButton.style.visibility = responseJson.next? "visible" : "hidden"
        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        
        
    } catch (error) {
        console.log(error)
        alert("Erro ao carregar os veículos")
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadVehicles(responseJson.next)

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

        await loadVehicles(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert("Erro ao carregar a página anterior")
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