let button=document.getElementById("getWeather");
let result=document.getElementById("result");
button.addEventListener("click", () => {
    let city=document.getElementById("city").value.trim();
    if(city===""){
        result.innerText="Please enter a city name!";
        return;
    }

    result.innerText="Loading...";
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then(res => res.json())
    .then(geo => {
        if (!geo.results || geo.results.length === 0) {
            result.innerText = "City not found!";
            return;
        }
        let { latitude, longitude, name, country } = geo.results[0];
        return fetch(
             `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
             .then(res => res.json())
             .then(weather => {
                if (!weather.current_weather) {
                    result.innerText = "Weather data unavailable";
                    return;
                }
                result.innerHTML = `
                <h2>${name}, ${country}</h2>
                <p>Temperature: ${weather.current_weather.temperature} °C</p>
                <p>Wind Speed: ${weather.current_weather.windspeed} km/h</p>
                `;
            });
        })
        .catch(() => {
            result.innerText = "Error fetching data!";
        });
    });