/** Module dependencies */
var express = require('express'),
  URL = require('url'),
  fs = require('fs');

// Globals
GLOBAL._url = URL;
GLOBAL.mongoose = require('mongoose');
GLOBAL.Schema = mongoose.Schema;
GLOBAL.ObjectId = mongoose.Types.ObjectId;
GLOBAL.currentDir = __dirname;
var app = module.exports = express();

// Configurations
app.configure(function(){
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/client/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser('bamn'));
  app.use(express.session({secret: 'bamn'}));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/client'));
  app.use(app.router);
  app.use(function(req, res) 
      { res.render(__dirname + '/client/views/index'); } );
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  console.log('Mongoose: Connecting to Database');
  mongoose.connect('mongodb://localhost/bamn');
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Mongoose: Connection Error:'));
  db.once('open', function callback () {
    console.log('Mongoose: Successfully connected!');
  });
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//Sniff HTTP
app.all('*', function(req, res, next) {
  //Only allow api requests to /api/auth (uncomment after testing)
  //Client folder is taken care of in configuration in the express.static 
  // if ((!(/^\/api/auth/g.test(req.url)))
  //   res.send(401);
  // else
     return next();
});

// Routes 
var routes = require('./api/routes'),
  user = require('./api/routes/user'),
  auth = require('./api/routes/login');

app.get('/partials/:name', routes.partials);
app.get('/partials/:folderName/:name', routes.partials);

//Authentication routes
app.post('/api/auth', auth.authenticate);
app.get('/api/auth', auth.check);

// API: User routes
app.get('/api/users', user.findAll);
app.get('/api/users/:id', user.findById);
app.put('/api/users', user.addUser);
app.post('/api/users/:id', user.updateUser);
app.delete('/api/users/:id', user.deleteUser);


// View routes
app.get('/', routes.index);

// Start server
app.listen(app.get('port'), function(){
  console.log('Express server listening at port %d in %s mode', this.address().port, app.settings.env);
});
