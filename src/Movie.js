const axios = require('axios');

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

    exports.Movie = function(req, res){
        const api = '015aa99beb288e6a4a24ca05fa54bebb'
    let { searchQuery } = req.query;
    axios.get(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&api_key=${api}`)
        .then(response => {
            const data = response.data;
            let newMovie = data.results.map(obj => {
                return new Movie(obj.title, obj.overview, obj.vote_average, 'https://image.tmdb.org/t/p/w500/' + obj.poster_path, obj.popularity, obj.release_date)
            });
            //res.send(newMovie)
            if (newMovie.length === 0) {
                res.status(500).json({ error: "Movie not found" });
            } else {
                res.send(newMovie)
            }
            console.log(response)
        })
      };



