/**
 * Configure your middleware stack as required
**/

module.exports = function(app, path, express){
  var dispatcher = require('dispatcher')(path);

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: app.set('session-key') }));
  app.use(express["static"](path + '/public'));
  app.use(dispatcher);
};
