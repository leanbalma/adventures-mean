'use strict';

xdescribe('Service: ServerCommunication', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var ServerCommunication;
  beforeEach(inject(function (_ServerCommunication_) {
    ServerCommunication = _ServerCommunication_;
  }));

  it('should do something', function () {
    expect(!!ServerCommunication).toBe(true);
  });

});
