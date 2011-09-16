/**
 * Forward routed requests to proper controllers
*/
var inflection = require('inflection'),
    barista = require('barista'),
    router = new barista.Router();

module.exports = function(path) {
  require(path + '/config/routes')(router);

  return function dispatch(req, res, next){
    var route = router.first(req.url, req.method);
    if (route) {
      var controllerPath = path + "/controllers/" + route.controller.toString().capitalize() + 'Controller';
      var controllerLib = require(controllerPath);

      if(typeof controllerLib[route.action] === 'function') {
        controllerLib[route.action](req,res,next);
      } else {
        next();
      }
    } else {
      next();
    }
  };
}
