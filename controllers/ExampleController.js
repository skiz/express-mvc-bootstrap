var fs = require('fs');

// Example Application index - shows a list of the controllers.
function index(req, res, next) {
  var controllers = [];

  fs.readdir(__dirname + '/', function(err, files){
    if (err) { throw err; }
    files.forEach(function(file){
      controllers.push(file.replace('Controller.js','').toLowerCase());
    });
    res.render('app',{controllers:controllers});
  });
}

module.exports = {
  index: index
};
