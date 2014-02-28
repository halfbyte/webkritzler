var port = "/dev/cu.usbmodem1421"
var serialPort = require("serialport");
var express = require('express');
var app = express();


var SerialPort = serialPort.SerialPort; // localize object constructor

var sp = new SerialPort(port, {
  baudrate: 57600,
  parser: serialPort.parsers.readline("\n")
});

var state = 0

sp.on('open', function() {
  console.log("Serial open");
});



sp.on('data', function(data) {
  console.log("data: " + data);
  if (data.match(/OK/)) {
    if (state==0) {
      state = 1;
    }
  }

});
app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end("Usage: /c/x/y (command, x, y)\n");
});
app.get('/:c/:x/:y', function(req, res){
  var c = req.params.c;
  var x = req.params.x;
  var y = req.params.y;
  res.setHeader('Content-Type', 'text/plain');
  if (state == 1 && ['m','M','l','L'].indexOf(c) != -1) {
    var string = c + ' ' + x + " " + y + "\n";
    sp.write(string, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        console.log("sent: " + result);
      }
    });
    var okayer = function(data) {
      if (data.match(/OK/)) {
        console.log("successful");
        res.end("OK");
        sp.removeListener('data', okayer);
      }
    };
    sp.on('data', okayer);
  } else {
      res.status('422').end('Kritzer bork bork bork.\n');
  }

});

app.listen(3000);
console.log('Listening on port 3000');
