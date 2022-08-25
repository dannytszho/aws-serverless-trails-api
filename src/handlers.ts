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
  const res = await dynamoDb
    .scan({
      TableName: tableName!,
    })
    .promise();

  if (res.Count === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(res.Items),
  };
};

class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

const fetchTrailById = async (id: string) => {
  const res = await dynamoDb
    .get({
      TableName: tableName!,
      Key: {
        primary_key: id,
      },
    })
    .promise();

  if (!res.Item) {
    throw new HttpError(404, { error: "not found" });
  }

  return res.Item;
};

const handleError = (e: unknown) => {
  if (e instanceof HttpError) {
    return {
      statusCode: e.statusCode,
      body: e.message,
    };
  }

  throw e;
};

export const getTrail: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;

    const res = await fetchTrailById(id);

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    return handleError(e);
  }
};

export const updateTrail: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;

    await fetchTrailById(id);

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
  } catch (e) {
    return handleError(e);
  }
};

export const deleteTrail: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;

    await fetchTrailById(id);

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
  } catch (e) {
    return handleError(e);
  }
};
