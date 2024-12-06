const apiKey = 'cdcd53d2c3c66d8fba3871fc35fb830a&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';


const getWeatherData = async (baseUrl, zip, apiKey) => {
    try {
        const response = await fetch(`${baseUrl}${zip},us&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        alert('Failed to fetch weather data. Please check the zip code or API key.');
    }
};


  
  const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    try {
      return await response.json();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  
  const updateUI = async () => {
    const response = await fetch('/all');
    try {
      const data = await response.json();
      document.getElementById('date').innerHTML = `Date: ${data.date}`;
      document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}°F`;
      document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`;
    } catch (error) {
      console.error('Error updating UI:', error);
    }
  };


  document.getElementById('generate').addEventListener('click', async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
  
    if (!zip) {
      alert('Please enter a zip code!');
      return;
    }
  
    const weatherData = await getWeatherData(baseUrl, zip, apiKey);
  
    if (weatherData && weatherData.main) {
      await postData('/add', {
        temperature: weatherData.main.temp,
        date: new Date().toLocaleDateString(),
        userResponse: feelings,
      });
  
      updateUI();
    } else {
      alert('Failed to fetch weather data. Please check the zip code.');
    }
  });

  

