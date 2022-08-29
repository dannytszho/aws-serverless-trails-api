import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

import { createTrail } from "../handlers";
import { DocumentClient } from "../__mocks__/aws-sdk/clients/dynamodb";

const trailsData = {
  id: "1",
  name: "Angels Landing Trail",
  length: "6.4 mi",
  elevation: "1,240 ft",
  duration: "Est. 3h 9m",
  difficulty: "Moderate",
  rating: "4.5",
  imageUrl:
    "https://photos.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMTE2OTUzMjcvNTMxNjIwMGIxODJmNjkzMzRkYmJiNTA2YzliNTE4OGQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==",
  url: "https://www.alltrails.com/explore/trail/us/nevada/hunter-creek-trail--2",
};

// jest.mock("aws-sdk", () => {
//   const documentClient = { put: jest.fn() };
//   const dynamoDb = { documentClient: jest.fn(() => documentClient) };
//   return { DynamoDB: dynamoDb };
// });
let handler;
let mockEvent: APIGatewayProxyEvent = {
  headers: "application/json",
  body: { trailsData },
} as any;
let mockResponse: APIGatewayProxyResult;

const dynamoDb = new DocumentClient();

describe("Handle Create a trail request", () => {
  beforeEach(() => {
    mockResponse = {
      statusCode: 201,
      body: "This is a test",
    };
  });
  it("should call the creatTrail method", async () => {
    const res = await createTrail(mockEvent);
    // expect(dynamoDb.put).toHaveBeenCalledTimes(1);
    expect(res.headers!["Content-Type"]).toBe("application/json");
    expect(res.body).toBe("This is a test");
  });
});
