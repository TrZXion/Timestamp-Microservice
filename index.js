// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

//API returns json
app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const regexPattern1 = /\d{4}-\d{2}-\d{2}/;
  const regexPattern2 = /\d{10}$|\d{13}$/;
  const date_string = req.params.date;

  // Check if date parameter is empty
  if (!date_string) {
    var unix = new Date().getTime();
    var utc = new Date().toUTCString();
    return res.json({ unix: unix, utc: utc });
  }

  if (regexPattern2.test(date_string)) {
    var utc = new Date(Number(date_string)).toUTCString();
    return res.json({ unix: Number(date_string), utc: utc });
  } else if (regexPattern1.test(date_string)) {
    var unix = new Date(String(date_string)).getTime();
    var utc = new Date(String(date_string)).toUTCString();
    return res.json({ unix: unix, utc: utc });
  } else if (date_string.includes(",")) {
    unix = new Date(date_string).getTime();
    utc = new Date(date_string).toUTCString();
    return res.json({ unix: unix, utc: utc });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// date_string = "02 01 1970";
// unix = new Date(date_string).getTime();
// date = new Date(date_string).toUTCString();
// console.log(JSON.stringify({unix:unix,date:date}));
