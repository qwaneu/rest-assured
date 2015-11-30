var util = require('util');
var _ = require('underscore');
var express = require('express');

module.exports = function (config) {
  var self = this;
  var router = express.Router();
  function endPointNotFoundError(method, path) {
    return { status: 404, body: { error: ("Undefined endpoint: " + method + " " + path) } }
  };

  self._stubs = [];

  self._setStubs = function (stubs) {
    console.log('Saving stubs');
    self._stubs = stubs;
  };

   function recordStubsRoute(method, baseUrl) {
    return baseUrl === '/rest-assured/stub' && method === 'PUT'
  }

  self._findReturn = function (method, path) {
    var found = self._findStub(method, path);
    console.log(found);
    // apparently can not extract a check on undefined :-(
    if ( typeof found === 'undefined') {
      return endPointNotFoundError(method, path);
    }
    return found.thenReturn;
  };
  self._findStub = function (method, path) {
    return _.detect(self._stubs, function (stub) {
      return (stub.at === path);
    });
  };

  router.route('/*').all(function (req, res) {
    if (recordStubsRoute(req.method, req.baseUrl)) {
      self._setStubs(req.body);
      res.status(200).json("Stubs saved.");
    } else {
      var thenReturn = self._findReturn(req.method, req.baseUrl);
      res.status(thenReturn.status).json(thenReturn.body);
    }
  });

  return router;
};
