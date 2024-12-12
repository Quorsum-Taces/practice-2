async function getCurrentWeatherByCity(city) {
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=788de06acb144cba94a173447240111&q=${city}&aqi=no`)
    const currentWeather = await data.json()
    console.log(currentWeather)
    return currentWeather
}



const locationInput = document.querySelector('.location-input')

const locationButton = document.querySelector('.location-button')


locationButton.addEventListener('click', async () => {
    const locationInputValue = locationInput.value 
    const currentWeather = await getCurrentWeatherByCity(locationInputValue)
    const forecast = await getForecastCurrentWeatherByCity(locationInputValue)

    const currentWeatherIcon = `http:${currentWeather.current.condition.icon}`
    const currentWeatherTempreture = currentWeather.current.temp_c
    const currentWeatherStatus = currentWeather.current.condition.text
    
    resetWeatherApp()

    renderCurrentWeather(currentWeatherIcon, currentWeatherTempreture, currentWeatherStatus)

    
    renderForecast(forecast.forecast.forecastday[0].hour)

})

function renderCurrentWeather(iconSrc, tempreture, status) {
        const currentWeatherIconEl = document.createElement('img')
        currentWeatherIconEl.setAttribute('class', "current-weather-icon")
        currentWeatherIconEl.setAttribute('src', iconSrc)

        const currentWeatherTempretureEl = document.createElement('p')
        currentWeatherTempretureEl.setAttribute('class', "current-weather-tempreture")
        currentWeatherTempretureEl.innerHTML = tempreture

        const currentWeatherStatusEl = document.createElement('p')
        currentWeatherStatusEl.setAttribute('class', "current-weather-status")
        currentWeatherStatusEl.innerHTML = status

        const currentWeather = document.querySelector('.current-weather')
        currentWeather.appendChild(currentWeatherIconEl)
        currentWeather.appendChild(currentWeatherTempretureEl)
        currentWeather.appendChild(currentWeatherStatusEl)
}

async function getForecastCurrentWeatherByCity(city) {
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=788de06acb144cba94a173447240111&q=${city}&days=1&aqi=no&alerts=no`)
    const forecast = await data.json()
    console.log(forecast)
    return forecast
}


function createForecastElement(iconSrc, time, tempreture) {


    const forecastElement = document.createElement('div')
    forecastElement.setAttribute('class', "forecast-element")

    const forecastTime = document.createElement('p')
    forecastTime.setAttribute('class', "forecast-time")
    forecastTime.innerHTML = time.slice(11)


    const forecastIcon = document.createElement('img')
    forecastIcon.setAttribute('class', "forecast-icon")
    forecastIcon.setAttribute('src', `http:${iconSrc}`)

    const forecastTempreture = document.createElement('div')
    forecastTempreture.setAttribute('class', "forecast-tempreture")
    forecastTempreture.innerHTML = tempreture

    forecastElement.appendChild(forecastTime)
    forecastElement.appendChild(forecastIcon)
    forecastElement.appendChild(forecastTempreture)

    return forecastElement
}

function renderForecast(forecast) {
    const forecastContainer = document.querySelector(".forecast")


    forecast.forEach(forecastItem => {
        const forecastElement = createForecastElement(forecastItem.condition.icon, forecastItem.time, forecastItem.temp_c)
        forecastContainer.appendChild(forecastElement)
    })
}

function resetWeatherApp() {
    const currentWeather = document.querySelector('.current-weather')
    currentWeather.innerHTML = ''

    const forecastContainer = document.querySelector(".forecast")
    forecastContainer.innerHTML = ''




}