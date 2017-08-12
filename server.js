var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user : 'u707viee',
    database : 'u707viee',
    password : process.env.DB_PASSWORD,
    host : 'http://db.imad.hasura-app.io',
    port: 5432
};

var app = express();
app.use(morgan('combined'));



app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
  pool.query('Select * from user',function(err,result){
      if(err) {
        res.status('Cannot fetch data'); 
          
      }
        
        else{
        res.send(JSON.stringify(result));
        }
  });
  
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
