_ = require('underscore');

describe('stubs', function() {

   it('can be found back', function() {
     var stubs = [{when: 'POST', at: '/orders',     thenReturn: {status: 401, body: "You Failed" }},
      {when: 'POST', at: '/gatherings', thenReturn: {status: 402, body: "You Failed Otherwise" }},
     ];
     status = _.detect(stubs, function(item) {
      return ('POST' === item.when && item.at === '/gatherings');
     }).thenReturn.status;
     expect(status).toBe(402);
   });

});
