/// <reference path ="../typings/jasmine/jasmine.d.ts" />

import {RestStubBuilder} from '../client/RestStubBuilder';

describe('Request Builder', function() {
  
   it('can build a POST stub', function() { 
     var expected:any = {when: 'POST', at: '/orders',     thenReturn: {status: 401, body: "You Failed" }};
     var builder = new RestStubBuilder();
     var built = builder.postRequest('/orders').thenReturn().
                 statusCode(401).body("You Failed").build();
     expect(built).toEqual(expected);
   });

});
