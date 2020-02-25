// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date?", (req, res)=>{
    let date = req.params.date;
    let dates;
    
  if(!date){dates = new Date();}
   
   else{ if(!isNaN(date)){dates = new Date(parseInt(date));}
    else {dates = new Date(date);}}
    
 if(dates.toString() === "Invalid Date"){ res.json({error: dates.toString()});}
   else{ res.json({unix: dates.getTime(), utc: dates.toUTCString()});}
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});