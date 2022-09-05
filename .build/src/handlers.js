"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrail = exports.updateTrail = exports.getTrail = exports.fetchTrailById = exports.getTrailsList = exports.createTrail = void 0;
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TRAILS_TABLE;
const headers = {
    "content-type": "application/json",
};
const createTrail = async (event) => {
    try {
        const timestamp = new Date().getTime();
        const trail = JSON.parse(event.body);
        await dynamoDb
            .put({
            TableName: tableName,
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
                // updatedAt: timestamp,
            },
        })
            .promise();
        return {
            statusCode: 201,
            headers,
            body: JSON.stringify(trail),
        };
    }
    catch (e) {
        return handleError(e);
    }
};
exports.createTrail = createTrail;
const getTrailsList = async (_event) => {
    const res = await dynamoDb
        .scan({
        TableName: tableName,
    })
        .promise();
    if (res.Count === 0) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: "not found" }),
        };
    }
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(res.Items),
    };
};
exports.getTrailsList = getTrailsList;
class HttpError extends Error {
    constructor(statusCode, body = {}) {
        super(JSON.stringify(body));
        this.statusCode = statusCode;
    }
}
const fetchTrailById = async (id) => {
    const res = await dynamoDb
        .get({
        TableName: tableName,
        Key: {
            primary_key: id,
        },
    })
        .promise();
    if (!res.Item) {
        throw new HttpError(404, { error: "not found" });
    }
    return res.Item;
};
exports.fetchTrailById = fetchTrailById;
const handleError = (e) => {
    if (e instanceof SyntaxError) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                error: `Invalid request body format: "${e.message}"`,
            }),
        };
    }
    if (e instanceof HttpError) {
        return {
            statusCode: e.statusCode,
            headers,
            body: e.message,
        };
    }
    throw e;
};
const getTrail = async (event) => {
    var _a;
    try {
        const id = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
        const res = await (0, exports.fetchTrailById)(id);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(res),
        };
    }
    catch (e) {
        return handleError(e);
    }
};
exports.getTrail = getTrail;
const updateTrail = async (event) => {
    var _a;
    try {
        console.log(event);
        const id = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
        console.log(id);
        await (0, exports.fetchTrailById)(id);
        const timestamp = new Date().getTime();
        const trail = JSON.parse(event.body);
        await dynamoDb
            .put({
            TableName: tableName,
            Item: Object.assign({ primary_key: id, updatedAt: timestamp }, trail),
        })
            .promise();
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(trail),
        };
    }
    catch (e) {
        return handleError(e);
    }
};
exports.updateTrail = updateTrail;
const deleteTrail = async (event) => {
    var _a;
    try {
        const id = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
        await (0, exports.fetchTrailById)(id);
        await dynamoDb
            .delete({
            TableName: tableName,
            Key: {
                primary_key: id,
            },
        })
            .promise();
        return {
            statusCode: 204,
            body: "",
        };
    }
    catch (e) {
        return handleError(e);
    }
};
exports.deleteTrail = deleteTrail;
//# sourceMappingURL=handlers.js.map