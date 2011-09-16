/**
 * Default configuration manager for multiple environments
*/
module.exports = function(app, path, express) {

  // Express Environment Specific Configurations
  app.configure('development', function() { require("./environments/development.js")(app, express); });
  app.configure('test', function() { require("./environments/test.js")(app, express); });
  app.configure('production', function() { require("./environments/production.js")(app, express); });

  // Setup default views templates
  app.set('views', path + '/views');
  app.set('view engine', 'html');
  app.register('.html', require('ejs'));

  // Cryptographic session key
  app.set('session-key', 'd9ed1da6edd3e623975ba9004946631c');
};
