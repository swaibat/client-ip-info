const fetch = require("node-fetch");
var NodeGeocoder = require("node-geocoder");
const countries = require("./api/assets/countries.json");

var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: "AIzaSyCcAP0GrIyhCe_kJfKY1Cb4OYOeP5vmhsQ",
  formatter: null
};

var geocoder = NodeGeocoder(options);

export default () => {
  fetch("https://get.client-ip.com/lookup")
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      const { latitude, longitude, clientIP } = myJson;
      geocoder.reverse({ lat: latitude, lon: longitude }, function(
        err,
        payload
      ) {
        if (err) return res.status(400).send({ status: 400, message: err });
        const {
          formattedAddress,
          latitude,
          longitude,
          country,
          countryCode,
          city,
          administrativeLevels
        } = payload[0];
        const countryDetails = countries.find(
          country => country.alpha2Code === countryCode
        );
        return {
          status: 200,
          data: {
            clientIP,
            address: formattedAddress,
            address2: administrativeLevels.level2long,
            country,
            countryCode,
            city,
            latitude,
            longitude,
            countryDetails: countryDetails
          }
        };
      });
    });
};
