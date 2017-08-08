var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var content= {
  title : 'Vjax Page 1 Article',
  heading : 'Watch Dogs 2',
  date : '8th August, 2017',
  content :'<p>Watch Dogs 2  is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sequel to 2014 Watch Dogs and was released worldwide for PlayStation 4, Xbox One and Microsoft Windows in November 2016.</p>'
};

app.get('/vjaxpage1', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','vjaxpage1.html'));
});

app.get('/vjaxpage2', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','vjaxpage2.html'));
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
