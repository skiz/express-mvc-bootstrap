function request(req) {
  return req;
}

function params(req) {
  return req.params;
}

function hasMessages(req) {
  return Object.keys(req.session.flash || {}).length;
}

function messages(req) {
  var msgs = req.flash();
  return Object.keys(msgs).reduce(function(arr, type){
    return arr.concat(msgs[type]);
  }, []);
}

module.exports = function(app) {
  app.dynamicHelpers({
    request: request,
    params: params,
    hasMessages: hasMessages,
    messages: messages
  });
};
