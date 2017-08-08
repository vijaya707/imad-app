var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var pageContents = {
    'page1Con' :{ title : 'Vjax Page 1 Article',
  heading : 'Watch Dogs 2',
  date : '8th August, 2017',
  content :'<p>Watch Dogs 2  is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sequel to 2014 Watch Dogs and was released worldwide for PlayStation 4, Xbox One and Microsoft Windows in November 2016.</p>'},
    
    'page2Con' : { title : 'Vjax Page 2 Article',
  heading : 'Watch Dogs 2',
  date : '9th August, 2017',
  content :'<p>Watch Dogs 2  is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sequel to 2014 Watch Dogs and was released worldwide for PlayStation 4, Xbox One and Microsoft Windows in November 2016.</p>'},
};


function createTemplate(data) {
    var date = data.date;
    var content = data.content;
    var heading = data.heading;
    var title = data.title;
    
var htmlTemplate = `<html>
<head>
<title>${title} </title>
<meta name="viewport" content="width=device-width, initial-scale=1">
       <style>
       .container {
    max-width: 80px;
    margin: 0 auto;
    color: #9ef3dc;
    font-family: Sans-Serif;
    padding-top: 16px;
    text-decoration: none;
    padding-left: 10px;
    padding-right: 10px;
    
}

       </style>
    </head>
    
    <body>
        <div class="container">
            <h3><a href="/">Home</a></h3>
        </div>
        <hr>
        
        <h3>${heading}</h3>
        <div>
            ${date}
        </div>
        
        <div>
           ${content}
        </div>
    
    </body>
        
</html>`;

return htmlTemplate;

}

app.get('/:articleName', function (req, res) {
  var articleName = req.param.articleName;      
  res.send(createTemplate(pageContents[articleName]));
});

app.get('/:articleName', function (req, res) {
    
  var articleName = req.param.articleName;      
  res.send(createTemplate(pageContents[articleName]));
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
