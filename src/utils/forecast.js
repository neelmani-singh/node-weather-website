const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ea7dbe6d638aa85b2afc7325c17ee818&query=' + latitude + ',' + longitude

    request({url,json: true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error){
            callback('Unable to find location!',undefined)
        } else{
            callback(undefined,body.current.weather_descriptions[0] + '. it is currently '+ body.current.temperature + ' degrees celsius out. It feels like ' + body.current.feelslike + ' degrees celsius out. The humidity is ' + body.current.humidity + ' %')
        }
    })
}
 

module.exports = forecast