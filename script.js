/// Variables relatives aux requêtes API

// API Openweather
let api_key = "49b125a10eb93b5dc8661440552756cd"; // La clé de openweather
let language = "lang=fr"; // Paramètre de language openweather
let celsius = "units=metric"; // Paramètre de conversion de la température en celsius
let temperature = "current.temp"; // Paramètre affichant les informations de météo

// API Unsplash


async function handleGetWeather(e){
    let city = document.getElementById('container__search-box__city-input').value;
    let rawForecast = await getForecast(city);
    let forecast5Days = getForecast5Days(rawForecast);
    let cityPhoto = await getCityPhoto(city)
    createCityCart(forecast5Days, cityPhoto)
}

// Fonction pour récupérer une image en fonction de ce que l'utilisateur écrit
async function getCityPhoto(city){
    let api_key_unsplash = "v7hxyH172UEZI7fJpClX0BB8c5z49GWtygB8gabfmR4"; // La clé de Unsplash
    let per_page = "per_page=10"; // Paramètre pour récupérer uniquement 10 images
    let relevance = "order_by=relevant"; // Paramètre pour récupérer l'image la plus pertinente
    let unsplash_url = `https://api.unsplash.com/search/photos?client_id=${api_key_unsplash}&query=${city}&${per_page}&${relevance}`;

    fetch(unsplash_url)
        .then((res)=>res.json())
        .then((data)=>{
            return data.results[0].urls.small
        })

}
// Fonction pour récupérer les données des 5 jours
function getForecast5Days(rawForecast){

}

// Fonction pour créer tout le HTML
function createCard(meteoDuJour,target){
    // create card html avec meteodujour.maxtemp, mintemp 
    let html = `<span>ma card </span>`
    target.innerHtml = html
}

document.getElementById('submit-btn').addEventListener('click',handleGetWeather) function () {

    // let openweather_url = `https://api.openweathermap.org/data/2.5/forecast?q=&${temperature}&appid=${api_key}&${language}&${celsius}`;
    let endpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&lang=fr&units=metric`
    // getCityPhoto('berlin')
    fetch(endpoint)
        .then((response) => response.json())
        .then((openweatherData) => {
            console.log(openweatherData.list)
            
            //modifier le forecast  en 5 jours de meteo
            let foreCast5days = getForecast5Days(openweatherData.list)

            foreCast5days.forEach((item)=>{
                createCard(item,target)
            })


            fetch(unsplash_url)
                .then(response => response.json())
                .then((unsplashData) => {
                    let container = document.getElementById("containerWeather");
                    // let image_url = unsplashData.results[0].urls.small;

                    let temperature = openweatherData.main.temp;
                    let meteo_description = openweatherData.weather[0].description;
                    let temperature_maximum = openweatherData.main.temp_max;
                    let temperature_minimum = openweatherData.main.temp_min;
                    let humidité = openweatherData.main.humidity;
                    container.innerHTML =
                        `
                        <div>
                            <img class="container_2__weather-info__img" src="${image_url}">
                        
                            <div class="container_2__weather-info__title">
                            <h2>Météo à ${city}:</h2>
                            </div>

                            <div class="container_2__weather-info__informations">
                                <p>Température: ${temperature} °C <br>
                                Climat: ${meteo_description} <br>
                                Température maximum: ${temperature_maximum} <br>
                                Température minimum: ${temperature_minimum}<br>
                                Humidité: ${humidité}%</p><br>
                            </div>
                        </div>
                        `;
                })
                .catch(error => {
                    console.log("Erreur lors de la récupération de l'image : ", error);
                });
        })
        .catch(error => {
            console.log("Erreur lors de la récupération des données météo : ", error);
        });
    let weatherInfoSection = document.getElementById("weather-info");
    weatherInfoSection.style.display = "block"; // Rend la section visible

});


// /// 2ème

// document.getElementById('submit-btn').addEventListener('click', function () {
//     let city = document.getElementById('container__search-box__city-input').value;
//     let image = `query=${city}`;
//     let unsplash_url = `https://api.unsplash.com/search/photos?client_id=${api_key_unsplash}&${image}&${per_page}&${relevance}`;
//     let openweather_url_2 = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&${language}&${celsius}`;

//     fetch(openweather_url_2)
//         .then((response) => response.json())
//         .then((openweatherData2) => {
//             fetch(unsplash_url)
//                 .then(response => response.json())
//                 .then((unsplashData) => {
//                     let resultat = document.getElementById("weather-info2");
//                     let image_url = unsplashData.results[0].urls.small;
//                     let temperature_2 = openweatherData2.list.main.temp;

//                     resultat.innerHTML =
//                         `
//                         <img class="container_2__weather-info__img" src="${image_url}">
                    
//                             <div class="container_2__weather-info__title">
//                             <h2>Météo à ${city}:</h2>
//                             </div>

//                             <div class="container_2__weather-info__informations">
//                                 <p>Température: ${temperature_2} °C <br>
//                                 Climat: <br>
//                                 Température maximum: <br>
//                                 Température minimum: <br>
//                                 Humidité: %</p><br>
//                         </div>
//                         `;
//                 })
//                 .catch(error => {
//                     console.log("Erreur lors de la récupération de l'image : ", error);
//                 });
//         })
//         .catch(error => {
//             console.log("Erreur lors de la récupération des données météo : ", error);
//         });
//     let weatherInfoSection = document.getElementById("weather-info2");
//     weatherInfoSection.style.display = "block"; // Rend la section visible

// });

// /// 3ème

// document.getElementById('submit-btn').addEventListener('click', function () {
//     console.log('33---------------------------------')
//     let city = document.getElementById('container__search-box__city-input').value;
//     let image = `query=${city}`;
//     let openweather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${temperature}&appid=${api_key}&${language}&${celsius}`;
//     let unsplash_url = `https://api.unsplash.com/search/photos?client_id=${api_key_unsplash}&${image}&${per_page}&${relevance}`;

//     fetch(openweather_url)
//         .then((response) => response.json())
//         .then((openweatherData) => {
//             fetch(unsplash_url)
//                 .then(response => response.json())
//                 .then((unsplashData) => {
//                     let resultat = document.getElementById("weather-info3");
//                     let image_url = unsplashData.results[0].urls.small;

//                     let temperature = openweatherData.main.temp;
//                     let meteo_description = openweatherData.weather[0].description;
//                     let temperature_maximum = openweatherData.main.temp_max;
//                     let temperature_minimum = openweatherData.main.temp_min;
//                     let humidité = openweatherData.main.humidity;
//                     resultat.innerHTML =
//                         `
//                         <img class="container_2__weather-info__img" src="${image_url}">
                    
//                             <div class="container_2__weather-info__title">
//                             <h2>Météo à ${city}:</h2>
//                             </div>

//                             <div class="container_2__weather-info__informations">
//                                 <p>Température: ${temperature} °C <br>
//                                 Climat: ${meteo_description} <br>
//                                 Température maximum: ${temperature_maximum} <br>
//                                 Température minimum: ${temperature_minimum}<br>
//                                 Humidité: ${humidité}%</p><br>
//                         </div>
//                         `;
//                 })
//                 .catch(error => {
//                     console.log("Erreur lors de la récupération de l'image : ", error);
//                 });
//         })
//         .catch(error => {
//             console.log("Erreur lors de la récupération des données météo : ", error);
//         });
//     let weatherInfoSection = document.getElementById("weather-info3");
//     weatherInfoSection.style.display = "block"; // Rend la section visible

// });

// /// 4ème

// document.getElementById('submit-btn').addEventListener('click', function () {
//     console.log('44444---------------------------------')
//     let city = document.getElementById('container__search-box__city-input').value;
//     let image = `query=${city}`;
//     let openweather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${temperature}&appid=${api_key}&${language}&${celsius}`;
//     let unsplash_url = `https://api.unsplash.com/search/photos?client_id=${api_key_unsplash}&${image}&${per_page}&${relevance}`;

//     fetch(openweather_url)
//         .then((response) => response.json())
//         .then((openweatherData) => {
//             fetch(unsplash_url)
//                 .then(response => response.json())
//                 .then((unsplashData) => {
//                     let resultat = document.getElementById("weather-info4");
//                     let image_url = unsplashData.results[0].urls.small;

//                     let temperature = openweatherData.main.temp;
//                     let meteo_description = openweatherData.weather[0].description;
//                     let temperature_maximum = openweatherData.main.temp_max;
//                     let temperature_minimum = openweatherData.main.temp_min;
//                     let humidité = openweatherData.main.humidity;
//                     resultat.innerHTML =
//                         `
//                         <img class="container_2__weather-info__img" src="${image_url}">
                    
//                             <div class="container_2__weather-info__title">
//                             <h2>Météo à ${city}:</h2>
//                             </div>

//                             <div class="container_2__weather-info__informations">
//                                 <p>Température: ${temperature} °C <br>
//                                 Climat: ${meteo_description} <br>
//                                 Température maximum: ${temperature_maximum} <br>
//                                 Température minimum: ${temperature_minimum}<br>
//                                 Humidité: ${humidité}%</p><br>
//                         </div>
//                         `;
//                 })
//                 .catch(error => {
//                     console.log("Erreur lors de la récupération de l'image : ", error);
//                 });
//         })
//         .catch(error => {
//             console.log("Erreur lors de la récupération des données météo : ", error);
//         });
//     let weatherInfoSection = document.getElementById("weather-info4");
//     weatherInfoSection.style.display = "block"; // Rend la section visible

// });

// ///

// document.getElementById('submit-btn').addEventListener('click', function () {
//     let city = document.getElementById('container__search-box__city-input').value;
//     let image = `query=${city}`;
//     let openweather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${temperature}&appid=${api_key}&${language}&${celsius}`;
//     let unsplash_url = `https://api.unsplash.com/search/photos?client_id=${api_key_unsplash}&${image}&${per_page}&${relevance}`;

//     fetch(openweather_url)
//         .then((response) => response.json())
//         .then((openweatherData) => {
//             fetch(unsplash_url)
//                 .then(response => response.json())
//                 .then((unsplashData) => {
//                     let resultat = document.getElementById("weather-info5");
//                     let image_url = unsplashData.results[0].urls.small;

//                     let temperature = openweatherData.main.temp;
//                     let meteo_description = openweatherData.weather[0].description;
//                     let temperature_maximum = openweatherData.main.temp_max;
//                     let temperature_minimum = openweatherData.main.temp_min;
//                     let humidité = openweatherData.main.humidity;
//                     resultat.innerHTML =
//                         `
//                         <img class="container_2__weather-info__img" src="${image_url}">
                    
//                             <div class="container_2__weather-info__title">
//                             <h2>Météo à ${city}:</h2>
//                             </div>

//                             <div class="container_2__weather-info__informations">
//                                 <p>Température: ${temperature} °C <br>
//                                 Climat: ${meteo_description} <br>
//                                 Température maximum: ${temperature_maximum} <br>
//                                 Température minimum: ${temperature_minimum}<br>
//                                 Humidité: ${humidité}%</p><br>
//                         </div>
//                         `;
//                 })
//                 .catch(error => {
//                     console.log("Erreur lors de la récupération de l'image : ", error);
//                 });
//         })
//         .catch(error => {
//             console.log("Erreur lors de la récupération des données météo : ", error);
//         });
//     let weatherInfoSection = document.getElementById("weather-info5");
//     weatherInfoSection.style.display = "block"; // Rend la section visible

// });