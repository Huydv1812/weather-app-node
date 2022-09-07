const request = require("request");

const getCode = (address = "HaNoi", callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9fc1e88edd5b4932a8d816e84afaefc6&query=" +
    address;

  request({ url, json: true }, (error, response) => {
    if (error || response.body.error) {
      callback("Unable to connect to location services!", undefined);
    } else {
      callback("", response.body);
    }
  });
};

module.exports = getCode;
