const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");
const country = document.getElementById("country");
const weatherIcon = document.getElementById("weatherIcon");

// Weather Code -> Text
function weatherDescription(code){

    if(code===0) return "Clear Sky";
    if(code<=3) return "Partly Cloudy";
    if(code<=48) return "Fog";
    if(code<=67) return "Rain";
    if(code<=77) return "Snow";
    if(code<=82) return "Rain Showers";
    if(code<=99) return "Thunderstorm";

    return "Unknown";

}

async function getWeather(city){

    loading.style.display="block";
    error.style.display="none";
    weatherCard.style.display="none";

    try{

        // Get Latitude & Longitude
        const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if(!geoData.results){

            throw new Error("City not found");

        }

        const place = geoData.results[0];

        // Get Weather
        const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );

        const data = await weatherResponse.json();

        cityName.textContent = place.name;

        country.textContent = place.country;

        temperature.textContent =
        data.current.temperature_2m;

        humidity.textContent =
        data.current.relative_humidity_2m;

        wind.textContent =
        data.current.wind_speed_10m;

        condition.textContent =
        weatherDescription(data.current.weather_code);

        // Static Weather Icon
        weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/1779/1779940.png";

        weatherIcon.alt="Weather";

        weatherCard.style.display="block";

    }

    catch(err){

        error.style.display="block";

    }

    finally{

        loading.style.display="none";

    }

}

// Search Button

searchBtn.addEventListener("click",()=>{

    const city = cityInput.value.trim();

    if(city===""){

        alert("Please enter a city name.");

        return;

    }

    getWeather(city);

});

// Enter Key

cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});