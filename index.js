var searchBar = document.getElementById('search-bar')

var url = 'https://api.openweathermap.org/data/2.5/weather?q=London&APPID=07fbd3ab5870b3d955e106314afd4001'

fetch(url, {cache: "reload"})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
