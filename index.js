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

app.get("/api/date?", (req, res) => {
  const regexPattern1 = /\d{4}-\d{2}-\d{2}/;
  const regexPattern2 = /\d{10}$|\d{13}$/;
  const date_string = req.params.date;

  // Check if date parameter is empty
  if (!date_string) {
    var unix = Math.floor(new Date().getTime());
    var myDate = new Date(unix);
    var formattedDate = new Date(myDate).toUTCString();
    var utc = formattedDate.toString();
    return res.json({ unix: unix, utc: utc });
  }

  if (regexPattern2.test(date_string)) {
    var unix = Number(date_string);
    var myDate = new Date(unix);
    var formattedDate = new Date(myDate).toUTCString();
    var utc = formattedDate.toString();

    return res.json({ unix: unix, utc: utc });
  } else if (regexPattern1.test(date_string)) {
    var utcOld = String(date_string);
    var unix = Math.floor(new Date(utcOld).getTime());
    var myDate = new Date(unix);
    var utc = new Date(myDate).toUTCString();
    // var utc = formattedDate.toString();
    return res.json({ unix: unix, utc: utc });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// var unix = Math.floor(new Date().getTime());
// var myDate = new Date(unix);
// var formattedDate = new Date(myDate).toUTCString();
// var utc = formattedDate.toString();
// console.log(unix);
