import * as AWS from "aws-sdk";
import {
  createTrail_rest,
  deleteTrail_rest,
  getTrail_rest,
  getTrailsList_rest,
  updateTrail_rest,
} from "../handlers";
import { APIGatewayProxyEvent } from "aws-lambda";

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
          scan: jest
            .fn()
            .mockImplementationOnce(() => {
              return {
                promise: jest
                  .fn()
                  .mockResolvedValueOnce({ Items: { Hi: "bb" } }),
              };
            })
            .mockImplementationOnce(() => {
              return {
                promise: jest.fn().mockResolvedValueOnce({ Count: 0 }),
              };
            }),
          get: jest
            .fn()
            .mockImplementation(() => {
              return {
                promise: jest.fn().mockImplementation(() =>
                  Promise.resolve({
                    Item: [
                      { id: "1", test: "AA" },
                      { id: "2", test: "bb" },
                    ],
                  })
                ),
              };
            })
            .mockImplementationOnce(() => {
              return {
                promise: jest.fn().mockImplementation(() => false),
              };
            }),
          delete: jest.fn().mockImplementation(() => {
            return {
              promise: jest.fn().mockImplementation(() => Promise.resolve({})),
            };
          }),
        };
      }),
    },
  };
});
const db = new AWS.DynamoDB.DocumentClient();

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

    const res = await createTrail_rest(createMockEvent);
    expect(createMock).toStrictEqual(res);
    expect(db.put).toBeCalledTimes(1);
  });

  it("should return the correct trails List", async () => {
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

    const res = await getTrailsList_rest(getListMockEvent);
    expect(JSON.parse(res.body)).toStrictEqual({ Hi: "bb" });
    expect(scanMock.Items).toStrictEqual({ Hi: "bb" });
    expect(db.scan).toBeCalledTimes(1);
  });
  it("should throw error if wrong the ID is entered", async () => {
    let getTrailMockEvent: APIGatewayProxyEvent = {
      body: "",
      headers: {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.29.2",
        accept: "*/*",
        "postman-token": "6a8a8376-2b7e-4d45-b835-0f36c974514e",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
        "content-length": "704",
      },
      multiValueHeaders: {
        "content-type": ["application/json"],
        "user-agent": ["PostmanRuntime/7.29.2"],
        accept: ["*/*"],
        "postman-token": ["6a8a8376-2b7e-4d45-b835-0f36c974514e"],
        host: ["localhost:3000"],
        "accept-encoding": ["gzip, deflate, br"],
        connection: ["keep-alive"],
        "content-length": ["704"],
      },

      httpMethod: "GET",
      isBase64Encoded: false,
      path: "/1",
      pathParameters: { id: "" },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: "offlineContext_accountId",
        apiId: "offlineContext_apiId",
        authorizer: { jwt: [Object] },
        domainName: "offlineContext_domainName",
        domainPrefix: "offlineContext_domainPrefix",
        httpMethod: "GET",
        path: "/1",
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
        requestTimeEpoch: 1662324596009,
        resourceId: "offlineContext_resourceId",
        resourcePath: "",
      },
      resource: "",
    };
    const mockError = await getTrail_rest(getTrailMockEvent);
    expect(mockError).toStrictEqual({
      statusCode: 404,
      body: '{"error":"not found"}',
      headers: { "content-type": "application/json" },
    });
  });

  it("should return the correct trail", async () => {
    let getTrailMockEvent: APIGatewayProxyEvent = {
      body: "",
      headers: {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.29.2",
        accept: "*/*",
        "postman-token": "6a8a8376-2b7e-4d45-b835-0f36c974514e",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
        "content-length": "704",
      },
      multiValueHeaders: {
        "content-type": ["application/json"],
        "user-agent": ["PostmanRuntime/7.29.2"],
        accept: ["*/*"],
        "postman-token": ["6a8a8376-2b7e-4d45-b835-0f36c974514e"],
        host: ["localhost:3000"],
        "accept-encoding": ["gzip, deflate, br"],
        connection: ["keep-alive"],
        "content-length": ["704"],
      },

      httpMethod: "GET",
      isBase64Encoded: false,
      path: "/1",
      pathParameters: { id: "2" },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: "offlineContext_accountId",
        apiId: "offlineContext_apiId",
        authorizer: { jwt: [Object] },
        domainName: "offlineContext_domainName",
        domainPrefix: "offlineContext_domainPrefix",
        httpMethod: "GET",
        path: "/1",
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
        requestTimeEpoch: 1662324596009,
        resourceId: "offlineContext_resourceId",
        resourcePath: "",
      },
      resource: "",
    };

    const res = await getTrail_rest(getTrailMockEvent);
    const trailBody = JSON.parse(res.body);
    expect(trailBody[0]).toMatchObject({ id: "1" });
    expect(trailBody[1]).toMatchObject({ id: "2" });
  });
  it("should update the correct trail", async () => {
    let updateMockEvent: APIGatewayProxyEvent = {
      body: "{\r\n" + '"HiHi": "GG"\r\n' + "}",
      headers: {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.29.2",
        accept: "*/*",
        "postman-token": "ebd968a9-0c66-4ed6-983c-9dda59e86496",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
        "content-length": "704",
      },
      multiValueHeaders: {
        "content-type": ["application/json"],
        "user-agent": ["PostmanRuntime/7.29.2"],
        accept: ["*/*"],
        "postman-token": ["ebd968a9-0c66-4ed6-983c-9dda59e86496"],
        host: ["localhost:3000"],
        "accept-encoding": ["gzip, deflate, br"],
        connection: ["keep-alive"],
        "content-length": ["704"],
      },

      httpMethod: "PUT",
      isBase64Encoded: false,
      path: "/fd3b6254-ac28-4895-b342-13d562cb5372",
      pathParameters: { id: "fd3b6254-ac28-4895-b342-13d562cb5372" },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: "offlineContext_accountId",
        apiId: "offlineContext_apiId",
        authorizer: { jwt: [Object] },
        domainName: "offlineContext_domainName",
        domainPrefix: "offlineContext_domainPrefix",
        httpMethod: "PUT",
        path: "/fd3b6254-ac28-4895-b342-13d562cb5372",
        protocol: "HTTP/1.1",
        requestId: "offlineContext_resourceId",
        routeKey: "PUT /{id}",
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
        requestTimeEpoch: 1662347979879,
        resourceId: "offlineContext_resourceId",
        resourcePath: "",
      },
      resource: "",
    };

    const res = await updateTrail_rest(updateMockEvent);
    expect(res.statusCode).toEqual(200);
    expect(res.headers).toStrictEqual({ "content-type": "application/json" });
    expect(res.body).toStrictEqual('{"HiHi":"GG"}');
  });

  it("should delete the correct trail", async () => {
    let deleteMockEvent: APIGatewayProxyEvent = {
      body: "{\r\n" + '"HiHi": "GG"\r\n' + "}",
      headers: {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.29.2",
        accept: "*/*",
        "postman-token": "ebd968a9-0c66-4ed6-983c-9dda59e86496",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
        "content-length": "704",
      },
      multiValueHeaders: {
        "content-type": ["application/json"],
        "user-agent": ["PostmanRuntime/7.29.2"],
        accept: ["*/*"],
        "postman-token": ["ebd968a9-0c66-4ed6-983c-9dda59e86496"],
        host: ["localhost:3000"],
        "accept-encoding": ["gzip, deflate, br"],
        connection: ["keep-alive"],
        "content-length": ["704"],
      },

      httpMethod: "PUT",
      isBase64Encoded: false,
      path: "/fd3b6254-ac28-4895-b342-13d562cb5372",
      pathParameters: { id: "fd3b6254-ac28-4895-b342-13d562cb5372" },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: "offlineContext_accountId",
        apiId: "offlineContext_apiId",
        authorizer: { jwt: [Object] },
        domainName: "offlineContext_domainName",
        domainPrefix: "offlineContext_domainPrefix",
        httpMethod: "DELETE /{id}",
        path: "/fd3b6254-ac28-4895-b342-13d562cb5372",
        protocol: "HTTP/1.1",
        requestId: "offlineContext_resourceId",
        routeKey: "DELETE /{id}",
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
        requestTimeEpoch: 1662347979879,
        resourceId: "offlineContext_resourceId",
        resourcePath: "",
      },
      resource: "",
    };

    const res = await deleteTrail_rest(deleteMockEvent);
    expect(res.statusCode).toBe(204);
    expect(res.body).toBe("Trail successfully deleted!");
  });
  it("should throw error if data is not in JSON", async () => {
    let createMockEvent: APIGatewayProxyEvent = {
      body: "{\r\n" + '"Hi": "GG"\r\n' + "",
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

    const mockError = await createTrail_rest(createMockEvent);
    expect(mockError).toStrictEqual({
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: 'Invalid request body format: "Unexpected end of JSON input"',
      }),
    });
  });
  it("should throw error if NO trails in DB", async () => {
    let getListMockEvent: APIGatewayProxyEvent = {
      body: null,
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
        httpMethod: "GET",
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
    const mockError = await getTrailsList_rest(getListMockEvent);
    expect(mockError).toStrictEqual({
      statusCode: 404,
      body: '{"error":"not found"}',
    });
  });
});
