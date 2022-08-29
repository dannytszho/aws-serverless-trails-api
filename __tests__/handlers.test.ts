import { createTrail, getTrailsList } from "../handlers";
import { DocumentClient } from "../__mocks__/aws-sdk/clients/dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";

// jest.mock("aws-sdk", () => {
//   const documentClient = { put: jest.fn() };
//   const dynamoDb = { documentClient: jest.fn(() => documentClient) };
//   return { DynamoDB: dynamoDb };
// });

const dynamoDb = new DocumentClient();
// const tableName = process.env.DYNAMODB_TRAILS_TABLE;

describe("Trails CRUD handlers", () => {
  //   afterAll(() => {
  //     jest.resetAllMocks();
  //   });
  it("should create a new trail", async () => {
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

    const event: APIGatewayProxyEvent = {
      body: { trailsData },
    } as any;
    const res = await createTrail(event);

    // expect(res.statusCode).toEqual(201);
    expect(dynamoDb.put).toBeCalledWith(trailsData);
  });
});
