const request = require("request");

const foreCast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9fc1e88edd5b4932a8d816e84afaefc6&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else {
      callback("200", response.body);
    }
  });
};

module.exports = foreCast;
