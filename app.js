var input = document.querySelector(".input-value");
var main = document.querySelector(".name");
var temp = document.querySelector(".temp");
var feels = document.querySelector(".feels");
var max = document.querySelector(".max");
var min = document.querySelector(".min");
var desc = document.querySelector(".desc");
var clouds = document.querySelector(".clouds");
var button = document.querySelector(".search");
var current = document.querySelector(".currentLocation");

button.addEventListener("click", function (name) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.value +
      "&appid=50a7aa80fa492fa92e874d23ad061374&units=metric"
  )
    .then((response) => response.json())
    .then((data) => {
      var tempValue = data["main"]["temp"];
      var feelsValue = data["main"]["feels_like"];
      var minValue = data["main"]["temp_min"];
      var maxValue = data["main"]["temp_max"];
      var nameValue = data["name"];
      var descValue = data["weather"][0]["description"];
      var cloudValue = data["weather"][0]["icon"];
      main.innerHTML = nameValue;
      desc.innerHTML = descValue;
      temp.innerHTML = "Temp: " + tempValue + "°C";
      feels.innerHTML = "Feels like: " + feelsValue + "°C";
      max.innerHTML = "Max Temperature: " + maxValue + "°C";
      min.innerHTML = "Min Temperature: " + minValue + "°C";
      clouds.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + cloudValue + "@2x.png"
      );
      input.value = "";
    })

    .catch((err) => alert("Wrong city name!"));
});

current.addEventListener("click", function (name) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function showPosition(position) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=50a7aa80fa492fa92e874d23ad061374&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var tempValue = data["main"]["temp"];
      var feelsValue = data["main"]["feels_like"];
      var minValue = data["main"]["temp_min"];
      var maxValue = data["main"]["temp_max"];
      var nameValue = data["name"];
      var descValue = data["weather"][0]["description"];
      var cloudValue = data["weather"][0]["icon"];

      main.innerHTML = nameValue;
      desc.innerHTML = descValue;
      temp.innerHTML = "Temp: " + tempValue + "°C";
      feels.innerHTML = "Feels like: " + feelsValue + "°C";
      max.innerHTML = "Max Temperature: " + maxValue + "°C";
      min.innerHTML = "Min Temperature: " + minValue + "°C";
      clouds.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + cloudValue + "@2x.png"
      );
      input.value = "";
    });
}
