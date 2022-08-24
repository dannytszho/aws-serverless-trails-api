"use strict";
import * as AWS from "aws-sdk";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { PutItemInput } from "aws-sdk/clients/dynamodb";
import { v4 } from "uuid";

interface PutItemInputProps {
  TableName: string;
  Item: {
    primary_key: string;
    name: string;
    length: string;
    elevation: string;
    duration: string;
    difficulty: string;
    rating: string;
    url: string;
    imageUrl: string;
    createdAt: number;
    updatedAt: number;
  };
}

export const createTrail = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const timestamp = new Date().getTime();
  const trail = JSON.parse(event.body as string);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams: PutItemInputProps = {
    TableName: process.env.DYNAMODB_TRAILS_TABLE!,
    Item: {
      primary_key: v4(),
      name: trail.name,
      length: trail.len,
      elevation: trail.elevation,
      duration: trail.duration,
      difficulty: trail.difficulty,
      rating: trail.rating,
      url: trail.url,
      imageUrl: trail.imageUrl,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(trail),
  };
};
