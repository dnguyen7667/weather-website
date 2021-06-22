const request = require('request');
const fs = require('fs');
const path = require('path');

const apiKeyPath = path.join(__dirname, '../APIKEYS/weatherapikey');
const apiKey = fs.readFileSync(apiKeyPath, 'utf8');

forecast = (zipcode, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + apiKey + '&query=' + zipcode + '&units=f'



    request({url: url, json: true}, (error, response) => {
        // console.log(response);

            if (error) {
                callback(error, undefined);
    }
            else if (response.body.error){
                callback('Unable to load the request url.', undefined);
            }
            else {
                const temp = response.body.current.temperature;
                const feelsLike = response.body.current.feelslike;
                const placeName = response.body.location.name + ", " + response.body.location.region + ", " + response.body.location.country;

                const data = {"Location": placeName,
                            "Current": temp,
                            "Feels like": feelsLike};

                callback(undefined, data);
            }
        });

}



module.exports = {forecast};