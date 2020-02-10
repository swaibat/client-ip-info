const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const Bluebird = require("bluebird");
var NodeGeocoder = require("node-geocoder");

fetch.Promise = Bluebird;

const app = express();
app.use(express.static("api/assets"));
app.use(cors());
var options = {
  provider: "google",
  httpAdapter: "https", // Default
  apiKey: "AIzaSyCcAP0GrIyhCe_kJfKY1Cb4OYOeP5vmhsQ", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

app.get("/api/v1/basic", (req, res) => {
  fetch("https://get.client-ip.com/lookup")
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      res.send(myJson);
    });
});

app.get("/api/v1/detailed", (req, res) => {
  fetch("https://get.client-ip.com/lookup")
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      const { latitude, longitude } = myJson;
      geocoder.reverse({ lat: latitude, lon: longitude }, function(err, res) {
        const {
          formattedAddress,
          latitude,
          longitude,
          country,
          countryCode,
          city,
          administrativeLevels
        } = res[0];
        console.log({
          address: formattedAddress,
          address2: administrativeLevels.level2long,
          country,
          countryCode,
          city,
          latitude,
          longitude
        });
      });
    });
});

app.listen(process.env.PORT || 3000);
