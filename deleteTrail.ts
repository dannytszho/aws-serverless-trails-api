"use strict";
import * as AWS from "aws-sdk";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

export const deleteTrail: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id as string;

  const scanParams = {
    TableName: process.env.DYNAMODB_TRAILS_TABLE!,
    Key: {
      primary_key: id,
    },
  };

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamoDb.get(scanParams).promise();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "not found" }),
    };
  }
  const deleteParams = {
    TableName: process.env.DYNAMODB_TRAILS_TABLE!,
    Key: {
      primary_key: id,
    },
  };
  await dynamoDb.delete(deleteParams).promise();

  return {
    statusCode: 204,
    body: "",
  };
};
