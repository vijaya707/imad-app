var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var http = require('http');
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

var config = {
    database : 'u707viee',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    username : 'u707viee',
    password : process.env.DB_PASSWORD
};

var pool = new Pool(config);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt)
{
    var hashed= crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');

}

app.get('/hash/:input',function (req,res){
    var hashString = hash(req.params.input,'this-is-vijaya');
    
    res.send(hashString);
    
});

app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM ARTICLE',function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString())
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});

var articles = {
 'article-one' : {
    title : 'Article one',
    date : '18th August, 2017',
    heading:'REST - Representational State Transfer Article 1',
    content :`<p>Representational state transfer (REST) or RESTful web services is a way of providing interoperability between computer systems on the Internet. REST-compliant Web services allow requesting systems to access and manipulate textual representations of Web resources using a uniform and predefined set of stateless operations. Other forms of Web service exist, which expose their own arbitrary sets of operations such as WSDL and SOAP.</p>

        <p>"Web resources" were first defined on the World Wide Web as documents or files identified by their URLs, but today they have a much more generic and abstract definition encompassing every thing or entity that can be identified, named, addressed or handled, in any way whatsoever, on the Web. In a RESTful Web service, requests made to a resource's URI will elicit a response that may be in XML, HTML, JSON or some other defined format. The response may confirm that some alteration has been made to the stored resource, and it may provide hypertext links to other related resources or collections of resources. Using HTTP, as is most common, the kind of operations available include those predefined by the HTTP verbs GET, POST, PUT, DELETE and so on.</p>

        <p>By using a stateless protocol and standard operations, REST systems aim for fast performance, reliability, and the ability to grow, by re-using components that can be managed and updated without affecting the system as a whole, even while it is running. </p>`
},
 'article-two' : {
      title : 'Article Two',
    date : '21th August, 2017',
    heading:'REST - Representational State Transfer Article 2',
    content :`<p>Representational state transfer (REST) or RESTful web services is a way of providing interoperability between computer systems on the Internet. REST-compliant Web services allow requesting systems to access and manipulate textual representations of Web resources using a uniform and predefined set of stateless operations. Other forms of Web service exist, which expose their own arbitrary sets of operations such as WSDL and SOAP.</p>

        <p>"Web resources" were first defined on the World Wide Web as documents or files identified by their URLs, but today they have a much more generic and abstract definition encompassing every thing or entity that can be identified, named, addressed or handled, in any way whatsoever, on the Web. In a RESTful Web service, requests made to a resource's URI will elicit a response that may be in XML, HTML, JSON or some other defined format. The response may confirm that some alteration has been made to the stored resource, and it may provide hypertext links to other related resources or collections of resources. Using HTTP, as is most common, the kind of operations available include those predefined by the HTTP verbs GET, POST, PUT, DELETE and so on.</p>

        <p>By using a stateless protocol and standard operations, REST systems aim for fast performance, reliability, and the ability to grow, by re-using components that can be managed and updated without affecting the system as a whole, even while it is running. </p>`
 }
};

function createTemplate(data)
{
    var date = data.date;
    var title = data.title;
    var content = data.content;
    var heading = data.heading;
    
var htmltemplate = `
<html>
  <head>
    <title>${title}</title>
    <link href="/ui/style.css" rel="stylesheet"/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div class="container">
    
    <div><a href="/">Home</a> </div>
    <hr/>
   
    <div> 
    
    <h1>${heading} </h1>
    </div>
   
    <div>
      ${date}
    </div>
   
    <div>
        ${content}
        </div>
    </div>
  </body>
  
</html>
`;

return htmltemplate;
}

app.get('/articles/:articleName',function (req,res){
    pool.query("SELECT * FROM ARTICLE WHERE TITLE= '"+req.params.articleName+" ' ",function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
           if(result.rows.length===0)
            {
                res.status(404).send('Article not found');
            }
            else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData)) ;
            }
            
            
        }//else
    });
    
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
