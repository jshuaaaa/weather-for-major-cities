var searchBar = document.getElementById('search-bar')
var searchButton = document.getElementById('search-button')
var todayTitle = document.getElementById('today-title')
var todayTemp = document.getElementById('today-temp')
var todayWind = document.getElementById('today-wind')
var todayHumidity = document.getElementById('today-humidity')
var UVIndex = document.getElementById('UV-Index')
var url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.previousSearch}&APPID=07fbd3ab5870b3d955e106314afd4001&units=imperial`
var todayContainer = document.getElementById('today-container')
var icon = document.getElementById('icon')
var today = moment()


let searchHistory = localStorage.getItem("searchHistory")
searchHistory = JSON.parse(searchHistory)

if(searchHistory) {
  for(var i=0; i<searchHistory.length; i++) {
    $('<button>',{
      id: [i]
     }).appendTo('#search-history').text(searchHistory[i])
  }
}







searchButton.addEventListener("click", 
function editSearch(e) {
    e.preventDefault()
    todayContainer.setAttribute("style", "border: 2px solid black;")

    url = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&APPID=07fbd3ab5870b3d955e106314afd4001&units=imperial`
      getApi()
      getFiveDayApi()
});

function getApi() {
  fetch(url, {cache: "reload"})
  .then(function (response) {
    console.log(response)
    return response.json();
  })
  .then(function (data) {
    var name = data.name
    console.log(data.name)
  
    let searchHistory = localStorage.getItem("searchHistory") || '[]';
    searchHistory = JSON.parse(searchHistory)
    searchHistory.push(name)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
   storeData(searchHistory, name)
  
   
   
  
 
   

    console.log(data)
   
  
    var iconcode = data.weather[0].icon;
   
    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png"
  
    icon.setAttribute('src', `https://openweathermap.org/img/w/${iconcode}.png`)
    todayTitle.textContent = name + " " + today.format("MM/D/YYYY")
    todayTemp.textContent = "Temperature is: " + data.main.temp + "F"
    todayWind.textContent = "The wind speed is: " + data.wind.speed
    todayHumidity.textContent = "The humidity is: " + data.main.humidity

    $('#'+name).on("click", function(){
      url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=07fbd3ab5870b3d955e106314afd4001&units=imperial`
      getApi()
     })
    }
)}

function storeData(name, searchHistory) {
  $('<button>',{
    id: name
   }).appendTo('#search-history').text(searchHistory)
}







