"use strict";
import * as AWS from "aws-sdk";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getTrails: APIGatewayProxyHandler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const result = await dynamodb
    .scan({
      TableName: process.env.DYNAMODB_TRAILS_TABLE!,
    })
    .promise();

  if (result.Count === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};
