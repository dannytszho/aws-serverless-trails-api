"use strict";
import * as AWS from "aws-sdk";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { v4 } from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TRAILS_TABLE;

export const createTrail = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const timestamp = new Date().getTime();
  const trail = JSON.parse(event.body as string);

  await dynamoDb
    .put({
      TableName: tableName!,
      Item: {
        primary_key: v4(),
        name: trail.name,
        length: trail.length,
        elevation: trail.elevation,
        duration: trail.duration,
        difficulty: trail.difficulty,
        rating: trail.rating,
        url: trail.url,
        imageUrl: trail.imageUrl,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(trail),
  };
};

export const getTrailsList: APIGatewayProxyHandler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const result = await dynamoDb
    .scan({
      TableName: tableName!,
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

export const getTrail: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;

  const res = await dynamoDb
    .get({
      TableName: tableName!,
      Key: {
        primary_key: id,
      },
    })
    .promise();

  if (!res.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(res.Item),
  };
};

export const updateTrail: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;

  const res = await dynamoDb
    .get({
      TableName: tableName!,
      Key: {
        primary_key: id,
      },
    })
    .promise();

  if (!res.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "not found" }),
    };
  }
  const timestamp = new Date().getTime();
  const trail = JSON.parse(event.body!);

  await dynamoDb
    .put({
      TableName: tableName!,
      Item: {
        primary_key: id,
        updatedAt: timestamp,
        ...trail,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(trail),
  };
};

export const deleteTrail: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id as string;

  const res = await dynamoDb
    .get({
      TableName: tableName!,
      Key: {
        primary_key: id,
      },
    })
    .promise();

  if (!res.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "not found" }),
    };
  }
  await dynamoDb
    .delete({
      TableName: tableName!,
      Key: {
        primary_key: id,
      },
    })
    .promise();

  return {
    statusCode: 204,
    body: "Data successfully deleted",
  };
};
