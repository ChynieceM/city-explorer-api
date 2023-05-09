# city-explorer-api

**Author**: Chyniece Matthews
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
This server defines an API endpoint that takes in a query string with latitude, longitude, and a search query. It returns weather data for the location specified by the query. 

## Getting Started
1. Ensure that Node.js and npm are installed on your machine. 
   ` node -v`
   ` npm -v`
2. Run `npm -init name-of-repo` to create the repo

3. Navigate to the project directory in the terminal.
4. Install the dependencies by running the following command: `npm install express`
`npm install cors`, `npm install dotenv`
5. Install nodemon as a development dependency by running the following command:
    `npm install --save-dev nodemon`
6. Create a .env file in the root directory of the project and add the following line(The user can change the port if they want the server to listen on a different port):
    `PORT=3001`

7. Update the start script in the package.json file to use nodemon by changing:
`"start": "node index.js"`
to `"start": "nodemon index.js"`
8. Start the server by running the following command:
`npm start `

9. Once the server is running, the user can access the app by opening a web browser and navigating to http://localhost:3001/weather

10. The user can test the app by adding query parameters to the URL in the browser, for example:
`http://localhost:3001/weather?lat=40.712776&lon=-74.005974
`
## Architecture
This application is a simple web server built with Node.js and Express that serves a weather API. It uses a JSON file (weather.json) that contains data for various weather locations.

The server listens for GET requests to the /weather route, and accepts three query parameters: lat, lon, and searchQuery. It uses these parameters to search for a matching location in the weather.json file.

If a matched location is found, the server returns an array of weather forecasts for that location, each represented by a Forecast object. If no matching location is found, the server returns a 404 error message.

The server uses the cors library to enable cross-origin resource sharing (CORS), which allows clients from different domains to access the API.

The Forecast class is defined in the server.js file and has five properties: date, description, lat, lon, and city_name. This class is used to represent a single weather forecast for a specific location.

To run the app, the user needs to have Node.js and npm installed on their machine. They can install the dependencies using npm install and start the server using npm start. The server will listen on port 3001 by default, but this can be changed by modifying the .env file. The nodemon library is used for development to automatically restart the server when changes are made to the code.

## Change Log

## Credit and Collaborations
`https://react-bootstrap.github.io/components/modal/`
`http://expressjs.com/en/4x/api.html`
`https://www.npmjs.com/package/dotenv`

Name of feature: Back-end -Weather info for the city I searched

Estimate of time needed to complete: 1 day

Start time: 11:45 am

Finish time: 1:45pm

Actual time needed to complete: 2 hours

Name of feature:Back-end - clear messages if something goes wrong

Estimate of time needed to complete: 1 day

Start time: 8:45 am

Finish time: 10:15pm

Actual time needed to complete: 1.5 hours


