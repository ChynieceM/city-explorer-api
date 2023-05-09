//imports the 'dotenv' package & configures environ variables
require('dotenv').config();
//imports express package
const express = require('express');
//imports cors package, allows cross-origin resource sharing(CORS) in app
const cors = require('cors');
//imports json file with weather locations
const data = require('./data/weather.json');
//sets the port# for the server to listen, if the PORT is set it will use that value else default port 3001
const PORT = process.env.PORT || 3001;


const app = express();//new instance of express app
app.use(cors());// allows CORS for all routes in app

//creates new route for the server to handle GET requests to '/weather'
app.get('/weather', function (req, res) {
    //gets the query param lat, lon, and searchQ from the request object
    let { lat, lon, searchQuery } = req.query
    //uses arry .find method to search for a location in the data array that matches the search criteria "location" in the function
    let locationFinder = data.find(location => {
        //the conditional checks if the location finder is undefined which means that no location was found and sends an HTTP error response code w/ a message
        if (searchQuery === location.city_name || lat == location.lat || lon == location.lon) {
            return true;
        } else {
            return false;
        }
    })
    if (locationFinder === undefined) { //sends an HTTP error response code
        res.status(404).send({ message: "city not found" });
        return;
    };

    //creates a new array of 'Forecast' objects by mapping over the data array of the locationFinder obj
    let weatherForecaster = locationFinder.data.map(obj => {
        return new Forecast(obj.valid_date, obj.weather.description, locationFinder.lat, locationFinder.lon, locationFinder.city_name)
    });
    //sends the weatherForecaster array as the responseto the client
    res.send(weatherForecaster)

});
//starts the server and listens for requests on port 3001
app.listen(3001)

//defines a class with a construction that has 5 parameters which will be used to represent a weather forecast for a specific location
class Forecast {
    constructor(date, description, lat, lon, city_name) {
        this.date = date;
        this.description = description;
        this.lat = lat;
        this.lon = lon;
        this.city_name = city_name
    }
};