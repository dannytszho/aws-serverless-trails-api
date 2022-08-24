"use strict";
import * as AWS from "aws-sdk";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

import { PutItemInputProps } from "./createTrail";

export const updateTrail = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;

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
  const timestamp = new Date().getTime();
  const trail = JSON.parse(event.body!);
  const putParams: PutItemInputProps = {
    TableName: process.env.DYNAMODB_TRAILS_TABLE!,
    Item: {
      primary_key: id,
      updatedAt: timestamp,
      ...trail,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(trail),
  };
};
