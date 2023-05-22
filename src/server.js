require('dotenv').config();

const express = require('express');

const cors = require('cors');

const Weather = require('./Weather');
const Movie = require('./Movie');
const cache = require('.cache');

const PORT = process.env.PORT || 9000;
const axios = require('axios');

const NodeCache = require( "node-cache" );

const app = express();//new instance of express app
app.use(cors());// allows CORS for all routes in app
app.listen(PORT)

const movieCache = new NodeCache();
const weatherCache = new NodeCache();

module.exports = weatherCache;
module.exports = movieCache;


app.get('/weather', Weather.Weather);
app.get('/movies', Movie.Movie);













// Create a router to handle routes
//const router = express.Router();

// Use the router to handle requests to the `/.netlify/functions/server` path
//creates new route for the server to handle GET requests to '/weather'

    

//app.use(`/.netlify/functions/server`, router);
    // Export the app and the serverless function
    //starts the server and listens for requests on port 3001
    // module.exports = app;
    // module.exports.handler = serverless(app);
    
   



    //gets the query param lat, lon, and searchQ from the request object
    //uses arry .find method to search for a location in the data array that matches the search criteria "location" in the function
    // let locationFinder = data.find(location => {
    //     //the conditional checks if the location finder is undefined which means that no location was found and sends an HTTP error response code w/ a message
    //     if (searchQuery === location.city_name || lat == location.lat || lon == location.lon) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // })
    // if (locationFinder === undefined) { //sends an HTTP error response code
    //     res.status(500).send({ message: "city not found" });
    //     return;
    // };

    //creates a new array of 'Forecast' objects by mapping over the data array of the locationFinder obj
    // let weatherForecaster = locationFinder.data.map(obj => {
    //     return new Forecast(obj.valid_date, obj.weather.description, locationFinder.lat, locationFinder.lon, locationFinder.city_name)
    // });
    //sends the weatherForecaster array as the responseto the client
    // res.send(weatherForecaster)
    //});
    
    //defines a class with a construction that has 5 parameters which will be used to represent a weather forecast for a specific location