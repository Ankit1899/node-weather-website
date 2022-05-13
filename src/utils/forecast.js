const request = require('request');

const forecast = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3ae9fd9bee9f5172883f8562187d0051&query="+ encodeURIComponent(location);

    // console.log(url); 
    
    request({url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback( undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees in " + response.body.location.name + " and it feels like " + response.body.current.feelslike + " degrees out there!")
        }
    })
}

module.exports = forecast 