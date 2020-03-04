
const request = require("jsonrequest");
const express = require("express");
const app = express();

app.use(async (req, res, next) => {
  try {
    const data = await request({
      url: "https://api.ipdata.co?api-key=test",
      headers: {
        "User-Agent": "JsonRequest"
      }
    });
    req.userInfo = data;
    next();
  } catch (error) {
    res.status(400).send({ status: 400, message: "something went wrong" });
  }

  next();
});

app.get("/", (req, res) =>
  res.status(200).send({ status: 200, data: req.userInfo })
);

app.listen(process.env.PORT || 1000);
