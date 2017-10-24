var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'samandpriscilla',
    database: 'samandpriscilla',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: ' somevalue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));

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

function hash(input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, 'this-is-a-random-value');
    res.send(hashedString);
});

app.post('/create-user', function(req, res){
   // accept username and password\
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbstring = hash(password, salt);
   pool.query('INSERT into "user" (username, password) VALUES ($1, $2)',[username, dbstring], function(err, result){ 
        if (err) {
          res.status(500).send(err.toString());
        } else {
            res.status(200).send('Username successfully created: ' + username);
        }
   });
});

app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * from "user" where username = $1', [username], function(err, result){
        if (err) {
            res.status(500).send(err.toString());
        } else {
            // Match the password
            if (result.rows.length ===0)
            {
                // Bad user name
                res.status(403).send('username/password is invalid');
            } else {
                // Match the password
                var dbstring = result.rows[0].password;
                var salt = dbstring.split('$')[2];
                var hashedstring = hash(password, salt);
                if (hashedstring === dbstring) {
                    // Set the session
                    req.session.auth = {userId: result.rows[0].id};
                    res.send('{"Message":"credentials correct.' + result.rows[0].id.toString() + '"}');
                } else {
                    res.status(403).send('username/password is invalid');
                }
            }
        }
    });
});
   
app.get('/logout', function(req, res){
    delete req.session.auth;
    res.send('logged out.');
});

app.get('/check-login', function(req, res){
    if (req.session && req.session.auth && req.session.auth.userId) {
        res.send('You are logged in: '+ req.session.auth.userId.toString());
    } else {
        res.send('You are not logged in.'); 
    }
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
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result) {
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
