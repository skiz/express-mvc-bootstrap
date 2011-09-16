/**
 * Provides the interface to bootstrap and start the application.
*/
var express = require('express'),
    nodepath = require('path'); //required for eb?

var path = __dirname;

var app, config;

// Initial bootstrapping
exports.boot = function(params){
	
  //Create our express instance
  app = express.createServer();

  // Import configuration
  require(path + '/config/configuration.js')(app, path, express);

  // Boot application framework
  require(path + '/config/boot.js')(app, path, express);

  return app;
};

// allow normal node loading if appropriate
if (!module.parent) {
  exports.boot().listen(3000);
  console.log("Express server %s listening on port %d", express.version, app.address().port);
}

