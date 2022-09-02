// import { APIGatewayProxyEvent, Context } from "aws-lambda";
// import { createTrail, getTrail, getTrailsList } from "../handlers";
// import {
//   awsSdkGetPromiseResponse,
//   awsSdkPutPromiseResponse,
//   DynamoDB,
// } from "../__mocks__/aws-sdk/clients/dynamodb";
// import * as AWS from "aws-sdk";

// jest.mock("aws-sdk", () => {
//   const mDocumentClient = {
//     put: jest.fn(() => {
//       return {
//         promise: jest.fn(() => {
//           return "hi";
//         }),
//       };
//     }),
//     scan: jest.fn(() => {
//       return {
//         promise: jest.fn(() => {
//           return Promise.resolve({
//             trailsData,
//           });
//         }),
//       };
//     }),
//   };
//   const mDynamoDB = { DocumentClient: jest.fn(() => mDocumentClient) };
//   return { DynamoDB: mDynamoDB };
// });
// const mDynamoDb = new DynamoDB.DocumentClient();

// describe("Handle create a trail request", () => {
//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   describe("create a trail", () => {
//     it("should return the correct trail", async () => {
//       let mockEvent: APIGatewayProxyEvent = {
//         body: JSON.stringify({
//           trailsData,
//         }),
//         headers: JSON.stringify({
//           "content-type": "application/json",
//         }),
//       } as any;

//       mDynamoDb.put.mockImplementationOnce((callback) =>
//         callback(null, mockEvent)
//       );

//       const res = await createTrail(mockEvent);
//       expect(res.headers).toStrictEqual({ "content-type": "application/json" });
//       expect(res.body).toBe(
//         JSON.stringify({
//           trailsData,
//         })
//       );
//     });

//     it("should return the trailsList", async () => {
//       let mockEvent: APIGatewayProxyEvent = {
//         body: {},
//         headers: {
//           "content-type": "application/json",
//         },
//       } as any;

//       const res = await getTrailsList(mockEvent);
//       console.log(res);
//     });
//   });
// });

import * as AWS from "aws-sdk";
import { createTrail, getTrailsList } from "../handlers";
import { APIGatewayProxyEvent } from "aws-lambda";
import { resolve } from "path";
const trailsData = {
  id: "1",
  name: "Angels Landing Trail",
  length: "6.4 mi",
  elevation: "1,240 ft",
  duration: "Est. 3h 9m",
};

jest.mock("aws-sdk", () => {
  return {
    __esModule: true,
    DynamoDB: {
      DocumentClient: jest.fn(() => {
        return {
          put: jest.fn().mockImplementation(() => {
            return {
              promise: jest.fn().mockImplementation(() =>
                Promise.resolve({
                  statusCode: 201,
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ Hi: "GG" }),
                })
              ),
            };
          }),
          get: jest.fn().mock,
          scan: jest.fn().mockImplementation(() => {
            return {
              promise: jest
                .fn()
                .mockImplementation(() =>
                  Promise.resolve({ Items: { Hi: "bb" } })
                ),
            };
          }),
        };
      }),
    },
  };
});
const db = new AWS.DynamoDB.DocumentClient();

// console.log(db.scan({ TableName: "" }).promise());

describe("Handle CRUD request", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should create a trail", async () => {
    let createMockEvent: APIGatewayProxyEvent = {
      body: "{\r\n" + '"Hi": "GG"\r\n' + "}",
      headers: {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.29.2",
        accept: "*/*",
        "postman-token": "56d7958c-bcd0-495f-a726-64166a9cb43c",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
        "content-length": "704",
      },
      multiValueHeaders: {
        "content-type": ["application/json"],
        "user-agent": ["PostmanRuntime/7.29.2"],
        accept: ["*/*"],
        "postman-token": ["56d7958c-bcd0-495f-a726-64166a9cb43c"],
        host: ["localhost:3000"],
        "accept-encoding": ["gzip, deflate, br"],
        connection: ["keep-alive"],
        "content-length": ["704"],
      },

      httpMethod: "POST",
      isBase64Encoded: false,
      path: "",
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: "offlineContext_accountId",
        apiId: "offlineContext_apiId",
        authorizer: { jwt: [Object] },
        domainName: "offlineContext_domainName",
        domainPrefix: "offlineContext_domainPrefix",
        httpMethod: "POST",
        path: "/",
        protocol: "HTTP/1.1",
        requestId: "offlineContext_resourceId",
        routeKey: "POST /",
        stage: "$default",
        identity: {
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          principalOrgId: null,
          sourceIp: "127.0.0.1",
          user: null,
          userAgent: null,
          userArn: null,
        },
        requestTimeEpoch: 1662062956709,
        resourceId: "offlineContext_resourceId",
        resourcePath: "",
      },
      resource: "",
    };

    const createMock = await db.put({ TableName: "", Item: {} }).promise();

    const res = await createTrail(createMockEvent);
    expect(createMock).toStrictEqual(res);
    expect(db.put).toBeCalledTimes(1);
  });

  it("should return the correct trails", async () => {
    let getListMockEvent: APIGatewayProxyEvent = {
      body: "{\r\n" + '"Hi": "GG"\r\n' + "}",
      headers: {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.29.2",
        accept: "*/*",
        "postman-token": "56d7958c-bcd0-495f-a726-64166a9cb43c",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
        "content-length": "704",
      },
      multiValueHeaders: {
        "content-type": ["application/json"],
        "user-agent": ["PostmanRuntime/7.29.2"],
        accept: ["*/*"],
        "postman-token": ["56d7958c-bcd0-495f-a726-64166a9cb43c"],
        host: ["localhost:3000"],
        "accept-encoding": ["gzip, deflate, br"],
        connection: ["keep-alive"],
        "content-length": ["704"],
      },

      httpMethod: "GET",
      isBase64Encoded: false,
      path: "",
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: "offlineContext_accountId",
        apiId: "offlineContext_apiId",
        authorizer: { jwt: [Object] },
        domainName: "offlineContext_domainName",
        domainPrefix: "offlineContext_domainPrefix",
        httpMethod: "POST",
        path: "/",
        protocol: "HTTP/1.1",
        requestId: "offlineContext_resourceId",
        routeKey: "GET /",
        stage: "$default",
        identity: {
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          principalOrgId: null,
          sourceIp: "127.0.0.1",
          user: null,
          userAgent: null,
          userArn: null,
        },
        requestTimeEpoch: 1662013370292,
        resourceId: "offlineContext_resourceId",
        resourcePath: "",
      },
      resource: "",
    };

    const scanMock = await db.scan({ TableName: "" }).promise();

    const res = await getTrailsList(getListMockEvent);
    expect(JSON.parse(res.body)).toStrictEqual({ Hi: "bb" });
    expect(scanMock.Items).toStrictEqual({ Hi: "bb" });
    expect(db.scan).toBeCalledTimes(1);
  });
});
