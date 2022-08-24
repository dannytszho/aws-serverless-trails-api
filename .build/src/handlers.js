"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.updateTrail = exports.getTrailsList = exports.createTrail = void 0;
var AWS = require("aws-sdk");
var uuid_1 = require("uuid");
var dynamoDb = new AWS.DynamoDB.DocumentClient();
var createTrail = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var timestamp, trail;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timestamp = new Date().getTime();
                trail = JSON.parse(event.body);
                return [4 /*yield*/, dynamoDb
                        .put({
                        TableName: process.env.DYNAMODB_TRAILS_TABLE,
                        Item: {
                            primary_key: (0, uuid_1.v4)(),
                            name: trail.name,
                            length: trail.length,
                            elevation: trail.elevation,
                            duration: trail.duration,
                            difficulty: trail.difficulty,
                            rating: trail.rating,
                            url: trail.url,
                            imageUrl: trail.imageUrl,
                            createdAt: timestamp,
                            updatedAt: timestamp,
                        },
                    })
                        .promise()];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        statusCode: 201,
                        body: JSON.stringify(trail),
                    }];
        }
    });
}); };
exports.createTrail = createTrail;
var getTrailsList = function (_event) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dynamoDb
                    .scan({
                    TableName: process.env.DYNAMODB_TRAILS_TABLE,
                })
                    .promise()];
            case 1:
                result = _a.sent();
                if (result.Count === 0) {
                    return [2 /*return*/, {
                            statusCode: 404,
                            body: JSON.stringify({ error: "not found" }),
                        }];
                }
                return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify(result.Items),
                    }];
        }
    });
}); };
exports.getTrailsList = getTrailsList;
var updateTrail = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, timestamp, trail, putParams;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
                return [4 /*yield*/, dynamoDb
                        .get({
                        TableName: process.env.DYNAMODB_TRAILS_TABLE,
                        Key: {
                            primary_key: id,
                        },
                    })
                        .promise()];
            case 1:
                result = _b.sent();
                if (!result.Item) {
                    return [2 /*return*/, {
                            statusCode: 404,
                            body: JSON.stringify({ error: "not found" }),
                        }];
                }
                timestamp = new Date().getTime();
                trail = JSON.parse(event.body);
                putParams = {
                    TableName: process.env.DYNAMODB_TRAILS_TABLE,
                    Item: __assign({ primary_key: id, updatedAt: timestamp }, trail),
                };
                return [4 /*yield*/, dynamoDb.put(putParams).promise()];
            case 2:
                _b.sent();
                return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify(trail),
                    }];
        }
    });
}); };
exports.updateTrail = updateTrail;
//# sourceMappingURL=handlers.js.map