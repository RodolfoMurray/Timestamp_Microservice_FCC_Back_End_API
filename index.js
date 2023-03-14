// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  let date = req.params.date
  if (!date) {
    date = new Date()
    let unix = date.toUTCString()
    let utc = date.getTime()
    res.send({unix, utc})
  } else {
    let unix = Number(date) ? +date : new Date(date).getTime()
    let utc = new Date(unix).toUTCString()
    if (unix) {
    res.send({unix, utc})
    } else {
    res.send({ error : "Invalid Date" })
  }
  }
})
app.get("/api/", (req, res) => {
    let date = new Date()
    let unix = date.getTime() 
    let utc = date.toUTCString()
    res.send({unix, utc})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
