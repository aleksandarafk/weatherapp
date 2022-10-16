let weather = {
  "apiKey": "474f08de5897b38fd6a4e95fed327c3a", //adding a valid api key
  getWeather: function (city) { //function for getting the weather data by city
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey //specific approach on how to gather the wanted data from the api
      )
        .then((response) => {
          if (!response.ok) {
            alert("No results.");
            throw new Error("No results.");
          }
          return response.json(); //returns the api`s response (converted to json)
        })
        .then((data) => this.weatherDisplay(data)); //displays the results of the function below
  },
  weatherDisplay: function (data) { //function for displaying desired things from the api into the HTML
    const { name } = data;  //constants for the data that we want to show on the HTML
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name; //using doc.querySelector we show the data on the HTML exactly where we want to
    document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + name + "')"; //adding background image depending on the name of the location
  },
  searchWeather: function () { //creating a functuion to search  for the weather
    this.getWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function(){  //calling the search function
  weather.searchWeather();                                                             //when pressing the search button in the app
});

document.querySelector(".search-bar").addEventListener("keyup", function(e){ //calling the search function the weather
  if(e.key == "Enter") {                                                     //when pressing the ENTER key
    weather.searchWeather();
  }
});
