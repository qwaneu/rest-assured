var request = require('request');
var should = require('chai').should();

describe('stub server', function() {
  var server = 'http://localhost:3002/rest-assured';
  var makeStub = server + '/stub'; 
  beforeEach(function(done) {
    /* wishful thinking: stubs.postRequest('/gatherings').thenReturn.statusCode(402).body("You Failed Otherwise");
       stubs.setup().then(done); // request
       */
    requestBody = {url: makeStub, method: 'PUT', json: 
      [{when: 'POST', at: '/orders',     thenReturn: {status: 401, body: "You Failed" }},
        {when: 'POST', at: '/gatherings', thenReturn: {status: 402, body: "You Failed Otherwise" }},

    ]};

    request(requestBody, function(error, response, body) {
      error.should.equal(null);
      response.statusCode.should.equal(200); //find the code in the response in a test endpoints: letters, numbers, dashes. Statuses 0-999
      done();
    });
  });

  it('Responds with 404 NOT FOUND when stub undefined', function(done) {
     var whatever = 'http://localhost:3002/whatever';
    requestBody = {url: whatever, method: 'PUT', json: {}};
    request(requestBody, function(error, response, body) {
      response.statusCode.should.equal(404);
      done();
    });
  });

  it('returns a stubbed value on POST /orders', function(done) {
    request.post('http://localhost:3002/orders',{}, function(error, response, body) {
      body.should.equal('"You Failed"');
      response.statusCode.should.equal(401);
      done();
    });
  });

  it('returns a stubbed value on POST /gathering', function(done) {
    request.post('http://localhost:3002/gatherings',{}, function(error, response, body) {
      body.should.equal('"You Failed Otherwise"');
      response.statusCode.should.equal(402);
      done();
    }); // GET, PUT, DELETE - check node methods.all matching, and remove duplication in tests, request with nested function and unused error is annoyingx 
  });
});
