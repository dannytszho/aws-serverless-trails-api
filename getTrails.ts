"use strict";
import * as AWS from "aws-sdk";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

export const getTrails = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const scanParams = {
    TableName: process.env.DYNAMODB_TRAILS_TABLE!,
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  if (result.Count === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
    // total: result.Count,
    // items: await result.Items!.map((trail) => {
    //   return {
    //     trailID: trail.primary_key,
    //     name: trail.name,
    //     length: trail.length,
    //     elevation: trail.elevation,
    //     duration: trail.duration,
    //     difficulty: trail.difficulty,
    //     rating: trail.rating,
    //     url: trail.url,
    //     imageUrl: trail.imageUrl,
    //     createdAt: trail.createdAt,
    //     updatedAt: trail.updatedAt,
    //   };
    // }),
  };
};
