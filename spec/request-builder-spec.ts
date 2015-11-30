/// <reference path="../typings/tsd.d.ts"/>
import {RestStubBuilder} from '../client/RestStubBuilder';
import {expect, config} from 'chai';

describe('Request Builder', function() {
  
   it('can build a POST stub', function() { 
     config.includeStack = true; 
     var expected:Object = {when: 'POST', at: '/orders',     
                         thenReturn: {status: 401, body: "You Failed" }};
     var builder = new RestStubBuilder();
     var built = builder.postRequest('/orders').thenReturn().
                 statusCode(401).body("You Failed").build();
     expect(built).to.deep.equal(expected);
   });

});
