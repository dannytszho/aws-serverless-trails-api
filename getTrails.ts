"use strict";
import * as AWS from "aws-sdk";

export const getTrails = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_TRAILS_TABLE!,
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  if (result.Count === 0) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items!.map((trail) => {
        return {
          trailID: trail.primary_key,
          name: trail.name,
          length: trail.len,
          elevation: trail.elevation,
          duration: trail.duration,
          difficulty: trail.difficulty,
          rating: trail.rating,
          url: trail.url,
          imageUrl: trail.imageUrl,
        };
      }),
    }),
  };
};
