import { APIGatewayProxyEvent } from "aws-lambda";
import { createTrail } from "../handlers";
import {
  awsSdkGetPromiseResponse,
  awsSdkPutPromiseResponse,
  DynamoDB,
} from "../__mocks__/aws-sdk/clients/dynamodb";
import * as AWS from "aws-sdk";

const trailsData = {
  id: "1",
  name: "Angels Landing Trail",
  length: "6.4 mi",
  elevation: "1,240 ft",
  duration: "Est. 3h 9m",
};

jest.mock("aws-sdk", () => {
  const mDocumentClient = {
    put: jest.fn(() => {
      return {
        promise: jest.fn(() => {
          return JSON.stringify({
            trailsData,
          });
        }),
      };
    }),
  };
  const mDynamoDB = { DocumentClient: jest.fn(() => mDocumentClient) };
  return { DynamoDB: mDynamoDB };
});
const mDynamoDb = new DynamoDB.DocumentClient();

describe("Handle create a trail request", () => {
  // beforeAll(() => {
  //   jest.useFakeTimers("modern");
  //   jest.setSystemTime(new Date(2022, 8, 30));
  // });
  // afterAll(() => {
  //   jest.resetAllMocks();
  // });

  describe("create a trail", () => {
    it("should return the correct trail", async () => {
      let mockEvent: APIGatewayProxyEvent = {
        body: JSON.stringify({
          trailsData,
        }),
        headers: JSON.stringify({
          "content-type": "application/json",
        }),
      } as any;

      mDynamoDb.put.mockImplementationOnce((callback) =>
        callback(null, mockEvent)
      );

      const res = await createTrail(mockEvent);
      console.log(res);
      expect(res.headers).toStrictEqual({ "content-type": "application/json" });
      expect(res.body).toBe(
        JSON.stringify({
          trailsData,
        })
      );
    });
  });
});
