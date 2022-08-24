"use strict";
import * as AWS from "aws-sdk";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { PutItemInput } from "aws-sdk/clients/dynamodb";

module.exports.createTrail = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const timestamp = new Date().getTime().toString();
  const trail = JSON.parse(event.body!);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams: PutItemInput = {
    TableName: process.env.DYNAMODB_TRAILS_TABLE!,
    Item: {
      primary_key: trail.name,
      length: trail.length,
      elevation: trail.elevation,
      duration: trail.duration,
      difficulty: trail.difficulty,
      rating: trail.rating,
      url: trail.url,
      imageUrl: trail.imageUrl,
      // createdAt: trail.timestamp,
      // updatedAt: timestamp
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(trail),
  };
};
