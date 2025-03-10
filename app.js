
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/intro.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "b2f252addf6e5738782a4a485a620f93";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp;
            const weatherdes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const img = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently " + weatherdes + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + "°C</h1>");
            res.write('<img src="' + img + '" alt="Weather icon"><br>');

            // Back Button
            res.write('<form action="/"><button type="submit">Check Another City</button></form>');

            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
