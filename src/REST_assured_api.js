var util = require('util');
var _ = require('underscore');
var express = require('express');

module.exports = function (config) {
  var self = this;
  var endPointNotFoundError = { status: 404, body: { error: ("Undefined endpoint: " + method + " " + path) } };
  var router = express.Router();
  self._stubs = [];

  self._setStubs = function (stubs) {
    console.log('Saving stubs');
    self._stubs = stubs;
  };

  function noRoute(found) { typeof found === 'undefined' }
  function recordStubsRoute(method, baseUrl) {
    baseUrl === '/rest-assured/stub' && method === 'PUT'
  }

  self._findReturn = function (method, path) {
    var found = self._findStub(method, path);
    if (noRoute(found)) {
      return endPointNotFoundError;
    }
    return found.thenReturn;
  };
  self._findStub = function (method, path) {
    return _.detect(self._stubs, function (stub) {
      return (stub.at === path);
    });
  };

  router.route('/*').all(function (req, res) {
    // TODO extract recordStubs - if(!recordStubs(req)) { }
    if (recordStubsRoute(req.baseUrl, req.method)) {
      self._setStubs(req.body);
      res.status(200).json("Stubs saved.");
    } else {
      var thenReturn = self._findReturn(req.method, req.baseUrl);
      res.status(thenReturn.status).json(thenReturn.body);
    }
  });

  return router;
};
