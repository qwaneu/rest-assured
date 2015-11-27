// Node
var util = require('util');
var _ = require('underscore');

// Express
var express = require('express');


module.exports = function (config) {
  var self = this;
  var router = express.Router();
  self._stubs = [];

  self._setStubs = function(stubs) {
    self._stubs = stubs;
  };

  self._findReturn = function(method, path) {
     var found = self._findStub(method, path);
     return found.thenReturn;
  };
  self._findStub = function(method, path) {
    return _.detect(self._stubs, function(stub) {
      return (stub.at === path);
    });
  };
  router.route('/*')
    .get(function (req, res) {
      console.log('GET');

      res.json(req.route);
    })
    .put(function (req, res) {
      var theStubs = req.body;
      console.log('PUT', util.inspect(theStubs, { colors: true }));
      if(req.baseUrl === '/rest-assured/stub') {
        console.log('Saving stubs');
        self._setStubs(theStubs);
        res.json("REST assured");
      }
      else {
       stub = self._findStub('PUT', req.baseUrl);
       res.status(stub.status).json(stub);
      }
    })
    .post(function (req, res) {
       thenReturn = self._findReturn('POST', req.baseUrl);
       res.status(thenReturn.status).json(thenReturn.body);
    });


  return router;
};
