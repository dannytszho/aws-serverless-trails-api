"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlers_1 = require("../handlers");
var dynamodb_1 = require("../__mocks__/aws-sdk/clients/dynamodb");
// jest.mock("aws-sdk", () => {
//   const documentClient = { put: jest.fn() };
//   const dynamoDb = { documentClient: jest.fn(() => documentClient) };
//   return { DynamoDB: dynamoDb };
// });
var dynamoDb = new dynamodb_1.DocumentClient();
// const tableName = process.env.DYNAMODB_TRAILS_TABLE;
describe("Trails CRUD handlers", function () {
    //   afterAll(() => {
    //     jest.resetAllMocks();
    //   });
    it("should create a new trail", function () { return __awaiter(void 0, void 0, void 0, function () {
        var trailsData, event, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trailsData = {
                        id: "1",
                        name: "Angels Landing Trail",
                        length: "6.4 mi",
                        elevation: "1,240 ft",
                        duration: "Est. 3h 9m",
                        difficulty: "Moderate",
                        rating: "4.5",
                        imageUrl: "https://photos.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMTE2OTUzMjcvNTMxNjIwMGIxODJmNjkzMzRkYmJiNTA2YzliNTE4OGQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==",
                        url: "https://www.alltrails.com/explore/trail/us/nevada/hunter-creek-trail--2",
                    };
                    event = {
                        body: { trailsData: trailsData },
                    };
                    return [4 /*yield*/, (0, handlers_1.createTrail)(event)];
                case 1:
                    res = _a.sent();
                    // expect(res.statusCode).toEqual(201);
                    expect(dynamoDb.put).toBeCalledWith(trailsData);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=handlers.test.js.map