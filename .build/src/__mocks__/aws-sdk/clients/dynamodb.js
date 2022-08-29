"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentClient = exports.awsSdkPromiseResponse = void 0;
exports.awsSdkPromiseResponse = jest
  .fn()
  .mockReturnValue(Promise.resolve(true));
var getFn = jest.fn().mockImplementation(function () {
  return { promise: exports.awsSdkPromiseResponse };
});
var putFn = jest.fn().mockImplementation(function () {
  return { promise: exports.awsSdkPromiseResponse };
});
var DocumentClient = /** @class */ (function () {
  function DocumentClient() {
    this.get = getFn;
    this.put = putFn;
  }
  return DocumentClient;
})();
exports.DocumentClient = DocumentClient;
//# sourceMappingURL=dynamodb.js.map
