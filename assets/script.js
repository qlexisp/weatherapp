// API Openweather
let api_key = "49b125a10eb93b5dc8661440552756cd"; // La clé de openweather
let language = "lang=fr"; // Paramètre de language openweather
let celsius = "units=metric"; // Paramètre de conversion de la température en celsius

// API Unsplash
let api_key_unsplash = "v7hxyH172UEZI7fJpClX0BB8c5z49GWtygB8gabfmR4"; // La clé de Unsplash
let per_page = "per_page=10"; // Paramètre pour récupérer uniquement 10 images
let relevance = "order_by=relevant"; // Paramètre pour récupérer l'image la plus pertinente

const opencage_api_key = '9ced26fe163f4cc3af97f82752d3e865'; // Remplacez par votre clé API OpenCage


// API Pour récup les prévisions météorologiques
function fetchWeather(city) {
    let forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&${language}&${celsius}`;

    fetch(forecast_url)
        .then((response) => response.json())
        .then((forecastData) => {
            let resultat = document.getElementById("weather-info");
            resultat.innerHTML = "";
            for (let i = 0; i < forecastData.list.length; i += 8) {
                let dayData = forecastData.list[i];
                let temperature = dayData.main.temp; // Température
                let meteo_icon = dayData.weather[0].icon; // Climat
                let meteo_icon_url = `https://openweathermap.org/img/wn/${meteo_icon}@2x.png`
                let description = dayData.weather[0].description;
                let humidité = dayData.main.humidity; // Humidité
                let date = new Date(dayData.dt_txt); // Date
                let day = date.getDate(); // Récup. du jour
                let month = date.getMonth() + 1; // Du mois
                let year = date.getFullYear(); // De l'année
                let formattedDate = `${day}-${month}-${year}`; // Création du format désiré

                resultat.innerHTML +=
                    `
        <div class="weather-info__card id="card">
        <div class="weather-info__card__conteneur">
        <img src="${meteo_icon_url}" class="weather-info__card__conteneur__icon" alt="Climat">
        <div class="weather-info__card__conteneur__title">
        <h2>${temperature}°</h2>
</div></div>
        <div class="weather-info__card__informations id="day">
            <p>${formattedDate}<br>    
            ${description}<br>
            Humidité: ${humidité}% </p>
            </div></div>
            `;
            }
        })
        .catch(error => {
            console.log("Erreur lors de la récupération de l'image : ", error);
        });
}

// API pour récup les images en fonction des villes séléctionnées par l'utilisateur
function getImage(city) {
    let unsplash_url = `https://api.unsplash.com/search/photos?client_id=${api_key_unsplash}&query=${city}&${per_page}&${relevance}`;

    fetch(unsplash_url)
        .then(response => response.json())
        .then((unsplashData) => {
            let resultat = document.getElementById("weather-image");
            let image_url = unsplashData.results[0].urls.full;
            document.body.style.backgroundImage = `url('${image_url}')`;
        })
        .catch(error => {
            console.log("Erreur lors de la récupération de l'image : ", error);
        });

}

// API pour récup les informations de la ville entrée par l'utilisateur
async function getCityInformation(city) {
    const geocoding_url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${opencage_api_key}`;

    try {
        const response = await fetch(geocoding_url);
        const data = await response.json();

        if (data.results.length > 0) {
            const cityInfo = data.results[0].components;
            return {
                city: cityInfo.city,
                country: cityInfo.country,
                state: cityInfo.state,
                lat: data.results[0].geometry.lat,
                lng: data.results[0].geometry.lng
            };
        } else {
            console.error('Aucune information trouvée pour la ville spécifiée.');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données de OpenCage : ', error);
        return null;
    }
}

// Fonction pour afficher les informations sur la ville
async function showCityInformation(city) {
    const cityInformation = await getCityInformation(city);

    if (cityInformation) {
        document.getElementById('city-info').innerHTML = `
            <p>Informations à propos de la ville de ${cityInformation.city}</p>
            <p>Pays: ${cityInformation.country}</p>
            <p>État: ${cityInformation.state}</p>
            <p>Latitude: ${cityInformation.lat}</p>
            <p>Longitude: ${cityInformation.lng}</p>
        `;
    }
}

// addEventListener
document.getElementById('submit-btn').addEventListener('click', function () {
    let city = document.getElementById('container__search-box__city-input').value;
    fetchWeather(city);
    getImage(city);
    showCityInformation(city);
});

// addEventListener
document.getElementById('container__search-box__city-input').addEventListener("keyup", e => {
    if (e.key === "Enter") {
        let city = document.getElementById('container__search-box__city-input').value;
        fetchWeather(city);
        getImage(city);
        showCityInformation(city);
    }
});
