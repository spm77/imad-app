var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'samandpriscilla',
    database: 'samandpriscilla',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article One | Sam Mathews',
        heading: 'Article One',
        date: 'Aug 21 2017',
        content: `
        <p> This is the content of my first article </p>
    `
    },

    'article-two': {
        title: 'Article Two | Sam Mathews',
        heading: 'Article Two',
        date: 'Aug 21 2017',
        content: `
        <p> This is the content of my second article </p>
    `
    },

    'article-three': {
        title: 'Article Three | Sam Mathews',
        heading: 'Article Three',
        date: 'Aug 22 2017',
        content: `
        <p> This is the content of my third article </p>
    `
},
}

function createTemplate(data)
{
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var date = data.date;
    
    var htmlTemplate = `
    <html>
        <head> 
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width-device-width, initial-scale-1" />
            <link href="/ui/style.css" rel="stylesheet" />
    
        </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            
            <h3>${heading}</h3>
            
            <div>
                ${date}
            </div>
            
            <div>
                <p>
                    ${content}
                </p>
                
                <p>
                    
                </p>
            </div>
        </div>
        
    </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
    pool.query('SELECT * from test', function(err, result) {
        if (err) {
          res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

var counter = 0;
app.get('/counter', function (req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) { //url/submit-name?name=param
    // Get the name from the request
    var name = req.query.name;
    names.push(name);
    
    // return a list of names in the response.
    res.send(JSON.stringify(names));
    
});

app.get('/articles/:articleName', function (req, res) {
  //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
  //var articleName = req.params.articleName;
  pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'", function(err, result) {
        if (err) {
          res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0)
            {
                res.status(404).send('Article not found.');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
  res.send(createTemplate(articles[articleName]));
});

//app.get('/article-two', function (req, res) {
//    res.send(createTemplate(articleTwo));
  //res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
//});

//app.get('/article-three', function (req, res) {
//    res.send(createTemplate(articleThree));
  //res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
//});

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
