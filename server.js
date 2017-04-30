// requires
var express = require ('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var pg = require('pg');

// setup config for the pool
var config = {
  database: 'todolist',
  host: 'localhost',
  port: 5432,
  max: 20
};
// create new pool using config
var pool = new pg.Pool(config);
// static folder
app.use(express.static('public')); // had difficulty getting my files to link
// while using subfolders ("public", "views", "scripts", "vendors), so had to
// start over twice in order to get things rolling.  subfolders were rendering
// an additional "views" folder, so I scrapped subfolders altogether.  is
// public in reference to the "public" subfolder?
app.use(bodyParser.urlencoded({extended: true}));
 // spin up server
app.listen(port, function(){
  console.log('server up on', port);
});
// base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('index.html'));
});
app.post('/addTask', function(req, res){
  console.log('addClient route');
  var clientObject = {
    response: ('from addTask' , req.body)};
    pool.connect(function(err, connection, done){
      if (err) {
        console.log(err);
        res.send(400);
      } else {
        console.log('connected');
        res.send(clientObject);
      }
      connection.query("INSERT into todolist (task, 'complete by', complete, update, delete) values ($1, $2, $3, $4, $5)", [req.body.task, req.body.complete_by, req.body.complete, req.body.update, req.body.delete]);
      done();
    });
  });

app.get('/sendTask', function(req, res){
  console.log('sendTask route');
  var allClients = [];
  pool.connect(function(err, connection, done){
    if (err) {
      console.log(err);
      res.send(400);
    } else {
      console.log('connected get clients');
      var resultSet = connection.query("SELECT task, complete_by, complete, update, delete FROM todolist");
      resultSet.on('row', function (row) {
        console.log('are you running?', row);
        allTasks.push(row);
      });
      resultSet.on('end', function(){
        console.log('allTasks ->', allTasks);
        res.send(allClients);
      done();
    });
    }
  });
});
