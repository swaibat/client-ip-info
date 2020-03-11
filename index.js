const request = require("request");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
const port = process.env.PORT || 300;

app.get("/", async (req, res) => {
  await request("https://iplocation.com/", (error, response, html) => {
    const $ = cheerio.load(html);
    const ip = $(".ip").text();
    const Latitude = $(".lat").text();
    const Longitude = $(".lng").text();
    const Organisation = $(".company").text();
    res.send({ status:200, data:{clientIp: ip, Latitude, Longitude, Organisation }});
  });
});

app.listen(port);
