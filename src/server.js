const serverless = require("serverless-http");

//imports the 'dotenv' package & configures environ variables
require('dotenv').config();
//imports express package
const express = require('express');
//imports cors package, allows cross-origin resource sharing(CORS) in app
const cors = require('cors');
//imports json file with weather locations

//const data = require('./data/weather.json');
//sets the port# for the server to listen, if the PORT is set it will use that value else default port 3001

const PORT = process.env.PORT || 3001;
const axios = require('axios');
const app = express();//new instance of express app
app.use(cors());// allows CORS for all routes in app

// Create a router to handle routes
const router = express.Router();

// Use the router to handle requests to the `/.netlify/functions/server` path
app.use(`/.netlify/functions/server`, router);
//creates new route for the server to handle GET requests to '/weather'
router.get('/weather', function (req, res) {
const apiKey = 'c747c969b2404e4dabfbd420e7d9a9f7';
    let {lat, lon} = req.query;
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}`)
        .then(response => {

            const data = response.data;
            console.log(data);
            let weatherForecaster = response.data.data.map(obj => {
                     return new Forecast(obj.valid_date, obj.weather.description, data.lat, data.lon, data.city_name)
                 });
            res.send(weatherForecaster);
        })

        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "City not found" });
         });
    });
    router.get('/movies', function(req,res){
        const api = '015aa99beb288e6a4a24ca05fa54bebb'
         let {searchQuery} = req.query;
axios.get(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&api_key=${api}`)
.then(response=>{
    const data = response.data;
    let newMovie = data.results.map(obj => {
        return new Movie (obj.title, obj.overview, obj.vote_average, 'https://image.tmdb.org/t/p/w500/'+obj.poster_path, obj.popularity, obj.release_date)
    });
    res.send(newMovie)
    console.log(response)
})
.catch(error => {
    console.error(error);
    res.status(500).json({ error: "Movie not found" });
 });
    });

    // Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);
    //starts the server and listens for requests on port 3001
    app.listen(3001)
    
    class Forecast {
    constructor(date, description, lat, lon, city_name) {
        this.date = date;
        this.description = description;
        this.lat = lat;
        this.lon = lon;
        this.city_name = city_name
    }
};
class Movie {
constructor(title, overview, vote_average, poster_path,popularity,release_date){
    this.title = title;
    this.overview = overview;
    this.vote_average = vote_average;
    this.poster_path = poster_path;
    this.popularity = popularity;
    this.release_date = release_date;
}
};


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