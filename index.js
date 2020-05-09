const express = require("express");
const cors = require("cors");
const request = require("jsonrequest");
const Bluebird = require("bluebird");
var NodeGeocoder = require("node-geocoder");
var path = require('path');
const countries = require("./api/assets/countries.json");

const app = express();
app.use(express.static("api/assets"));
app.use(cors());

var options = {
  provider: "google",
  httpAdapter: "https", // Default
  apiKey: "AIzaSyCcAP0GrIyhCe_kJfKY1Cb4OYOeP5vmhsQ", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};



const ipInfo = (module.exports = function(type, token, callback) {
  let url = null;

  if (typeof token === "function") {
    callback = token;
    token = undefined;
  }

  if (typeof type === "function") {
    callback = type;
    type = "";
  }

  url = `https://get.client-ip.com/lookup`;

  request(url, (err, body) => {
    if (err && err.message && err.message.startsWith("Unexpected token")) {
      err = null;
    }
    if (err) {
      return callback(err);
    }
    callback(null, body);
  });
});

var geocoder = NodeGeocoder(options);

app.get("/api/v1/basic", (req, res) => {
    ipInfo((err, cLoc) => {
      res.send(cLoc);
    });
});
app.use(express.static(path.join(__dirname)));
// app.get('/', function(req, res) {
//   return res.send({status:200, data:req.query})
// });
app.post('/', function(req, res) {
    console.log('why', req.query);
    return res.redirect('/hello');
    // return res.send({status:200, data:req.query})
});
// app.get("/api/v1/details",  (req, res) => {
//   fetch("https://get.client-ip.com/lookup")
//     .then(response => {
//       return response.json();
//     })
//     .then(myJson => {
//       const { latitude, longitude, clientIP } = myJson;
//       geocoder.reverse({ lat: latitude, lon: longitude }, function(
//         err,
//         payload
//       ) {
//         if (err) return res.status(400).send({ status: 400, message: err });
//         const {
//           formattedAddress,
//           latitude,
//           longitude,
//           country,
//           countryCode,
//           city,
//           administrativeLevels
//         } = payload[0];
//         const countryDetails = countries.find(
//           country => country.alpha2Code === countryCode
//         );
//         return res.status(200).send({
//           status: 200,
//           data: {
//             clientIP,
//             address: formattedAddress,
//             address2: administrativeLevels.level2long,
//             country,
//             countryCode,
//             city,
//             latitude,
//             longitude,
//             countryDetails: countryDetails
//           }
//         });
//       });
//     });
// });

app.listen(process.env.PORT || 3000);




