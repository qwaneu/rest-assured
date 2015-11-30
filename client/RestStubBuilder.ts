export class RestStubBuilder {
  request: Object = {};
  
  public postRequest(url: string): RestStubBuilder {
    this.request['when'] = 'POST';
    this.request['at'] = url; 
    return this;
  }
  public thenReturn(): RestStubBuilder {
    this.request['thenReturn'] = {};
    return this;
  }
  public statusCode(httpStatus: number): RestStubBuilder {
    this.request['thenReturn']['status'] = httpStatus;
    return this;
  }
  public body(theBody: Object): RestStubBuilder {
    this.request['thenReturn']['body'] = theBody;
    return this;
  }
  public build(): Object {
    return this.request;
  }
}
