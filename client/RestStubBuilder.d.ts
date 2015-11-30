export declare class RestStubBuilder {
    request: Object;
    postRequest(url: string): RestStubBuilder;
    thenReturn(): RestStubBuilder;
    statusCode(httpStatus: number): RestStubBuilder;
    body(theBody: Object): RestStubBuilder;
    build(): Object;
}
