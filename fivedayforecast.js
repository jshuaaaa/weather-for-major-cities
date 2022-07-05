function getFiveDayApi() {
   url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchBar.value}&APPID=07fbd3ab5870b3d955e106314afd4001&units=imperial&cnt=5`
console.log(url)
fetch(url, {cache: "reload"})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $(`#forecast${0}`).remove()
    $(`#forecast${1}`).remove()
    $(`#forecast${2}`).remove()
    $(`#forecast${3}`).remove()
    $(`#forecast${4}`).remove()
    for(var i =1; i < data.list.length; i++) {
    console.log(data.list[i])

    var iconcode = data.list[i].weather[0].icon
    console.log(iconcode)
    
    $('<div>', {
        id: `forecast${[i]}`,
        style: ' border: 2px solid black; margin: 10px; flex-direction: row;',
        class: 'container'

    }).addClass('bg-primary').appendTo('#5dayforecast');
    today = moment().add(i, 'days')
    $('<h4>').text(today.format("MM/D/YYYY")).appendTo(`#forecast${[i]}`)
    
    $('<img>', {
      src: `https://openweathermap.org/img/w/${iconcode}.png`
    }).appendTo(`#forecast${[i]}`)

    $('<p>', {
        id: `temp${data.list[i]}`
    }).text("The temperature will be:  " + data.list[i].main.temp).appendTo(`#forecast${[i]}`)

    $('<p>', {
        id: `windspeed${data.list[i]}`
    }).text("The wind speed will be:  " + data.list[i].wind.speed).appendTo(`#forecast${[i]}`)

    $('<p>', {
        id: `humidity${data.list[i]}`
    }).text("The humidity will be:  " + data.list[i].main.humidity).appendTo(`#forecast${[i]}`)

}
    
  })
}