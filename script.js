document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    getWeather(city);
});

async function getWeather(city) {
    const apiKey = 'fda8c693fa6af46f65adbb62cb746965'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            
            document.getElementById('cityName').textContent = data.name;
            document.getElementById('temperature').textContent = `${data.main.temp}°C`;
            document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

            // Calculate local time
            const timezoneOffset = data.timezone; // Timezone offset in seconds
            const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);
            document.getElementById('currentTime').textContent = `Local Time- ${localTime.toUTCString().slice(17, 25)}`;

            // Set weather image
            const weatherDescription = data.weather[0].main.toLowerCase();
            const weatherImageMap = {
                'clear': 'clear.jpg',
                'thunderstorm': 'thunder.jpg',
                'clouds': 'cloudy_sunny.jpg',
                'rain': 'rain.jpg'
            };

            const imageUrl = weatherImageMap[weatherDescription] || 'default.jpg';
            document.getElementById('weatherImage').src = imageUrl;

            // Hide the container and show the weather section
            document.getElementById('container').style.display = 'none';
            document.getElementById('weather').style.display = 'block';
        } else {
            alert('City not found!');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
    
}
