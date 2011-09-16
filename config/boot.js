/**
 *  Application Framework and Middleware
 *  Any of these settings can be modified globally within config/configuration.js
 *  or within environment specific configuration files located in config/environments.
*/
var fs = require('fs'),
    mongoose = require('mongoose');


function bootApplication(app, path, express) {

  // Load middleware stack configuration
  require(path + '/config/middleware')(app, path, express);

  // Default 500 page
  app.error(function(err, req, res){
    console.log('Internal Server Error: ' + err.message);
    res.render('500');
  });

  // Default 404 page
  app.use(function(req, res){
    res.render('404');
  });
}

function bootModel(app, path, file) {
  var name = file.replace('.js', ''),
      schema = require(path + '/models/'+ name);
}

function bootModels(app, path, express) {
  fs.readdir(path + '/models', function(err, files){
    if (err) { throw err; }
    files.forEach(function(file){
      bootModel(app, path, file);
    });
  });
  mongoose.connect(app.set('db-uri'));
}

function bootHelper(app, path, file) {
  var name = file.replace('.js', ''),
      helper = path + '/helpers/' + name;
  require(helper)(app);
}

function bootHelpers(app, path, express) {
  fs.readdir(path + '/helpers', function(err, files){
    if (err) { throw err; }
    files.forEach(function(file){
      bootHelper(app, path, file);
    });
  });
}

// Application Boot Sequence
module.exports = function(app, path, express) {
  bootApplication(app, path, express);
  bootModels(app, path, express);
  bootHelpers(app, path, express);
};
