"use strict";
import * as AWS from "aws-sdk";

export const getTrail = async (event) => {
  const id = event.pathParameters?.id;

  const scanParams = {
    TableName: process.env.DYNAMODB_TRAILS_TABLE!,
    Key: {
      primary_key: id,
    },
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.get(scanParams).promise();

  if (!result.Item) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};
