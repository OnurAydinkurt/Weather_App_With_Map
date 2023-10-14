mapboxgl.accessToken = 'pk.eyJ1Ijoib251cm90dGkiLCJhIjoiY2xuZXpzYWZzMGpyNTJrcXB0M3o5ZHR1MyJ9.U95Ss-RH41MSrDthw6GFLQ';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [35, 39], // starting position of Turkey [lng, lat]
    zoom: 5.85, // starting zoom
});

map.on('click', function (e) {
    const coordinates = e.lngLat;
    console.log('Tıklanan Konum:', coordinates);

    // "Get and process the weather data."
    getWeatherData(coordinates.lat, coordinates.lng, coordinates);
});

const apiKey = '3b069168447c79928a63432b39458a7f';
    function getWeatherData(lat, lon, coordinates) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      
      

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log('Hava Durumu Verileri:', data);
          let resultData = Math.round((data.main.temp - 273.15).toFixed(2));
          let name = data.name;
          let sky = data.weather[0].main;
          let popUpMessage = `Şehir: ${name}<br>Sıcaklık: ${resultData} °C<br>Gökyüzü: ${sky}`;

          new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(popUpMessage)
          .addTo(map);
        })
    }
