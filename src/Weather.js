const axios = require('axios');
const NodeCache = require( "node-cache" );
const cache = new NodeCache();



class Forecast {
    constructor(date, description, lat, lon, city_name) {
        this.date = date;
        this.description = description;
        this.lat = lat;
        this.lon = lon;
        this.city_name = city_name
    }
};

exports.Weather = function(req, res){
    let { lat, lon, searchQuery } = req.query;
    const apiKey = 'c747c969b2404e4dabfbd420e7d9a9f7';
    const cacheKey = `${searchQuery}`;

    const cacheData = cache.get(cacheKey);
    if(cacheData !== "undefined"){
        res.send(cacheData)
    }else{

        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&city=${searchQuery}&key=${apiKey}`)
            .then(response => {
    
                const data = response.data;
                console.log(data);
                let weatherForecaster = response.data.data.map(obj => {
                    return new Forecast(obj.valid_date, obj.weather.description, data.lat, data.lon, data.city_name)
                });
                cache.set(cacheKey, weatherForecaster, 3600);
                res.send(weatherForecaster);
            })
    
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: "City not found" });
            });
        };
    }

    
