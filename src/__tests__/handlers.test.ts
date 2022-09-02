import * as AWS from "aws-sdk";
import { createTrail, fetchTrailById, getTrailsList } from "../handlers";
import { APIGatewayProxyEvent } from "aws-lambda";

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
          scan: jest.fn().mockImplementation(() => {
            return {
              promise: jest
                .fn()
                .mockImplementation(() =>
                  Promise.resolve({ Items: { Hi: "bb" } })
                ),
            };
          }),
          get: jest.fn().mockImplementation(() => {
            return {
              promise: jest.fn().mockReturnValue(
                Promise.resolve({
                  Item: { test: "AA" },
                })
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

  it("should return the specific trail", async () => {
    const getMock = await db
      .get({ TableName: "yoyo", Key: { primary_key: "2" } })
      .promise();

    console.log("/////////");
    const res = await fetchTrailById("1");
    expect(res).toEqual({ test: "AA" });
    expect(db.get).toBeCalledWith({
      TableName: "yoyo",
      Key: { primary_key: "2" },
    });
    console.log(res);
  });
});
