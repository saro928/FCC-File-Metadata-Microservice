'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var Multer = require('multer');

var multipartUpload = Multer({storage: Multer.diskStorage({
    destination: function (req, file, callback) { callback(null, './uploads');},
    filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now());}})
}).single('upfile');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
   res.sendFile(process.cwd() + '/views/index.html');
});

// File upload
app.post('/api/fileanalyse', multipartUpload, function(req, res) {
  if (!req.file) res.send('No File provided...');
  else {
    console.log(req.file);
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });  
  }  
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
