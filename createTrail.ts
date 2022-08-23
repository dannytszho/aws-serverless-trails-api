"use strict";
import * as AWS from "aws-sdk";
import { PutItemInput } from "aws-sdk/clients/dynamodb";

module.exports.createTrail = async (event) => {
  const body = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams: PutItemInput = {
    TableName: process.env.DYNAMODB_TRAILS_TABLE!,
    Item: {
      // primary_key: body.name,
      primary_key: body.name,
      email: body.email,
      // length: body.length,
      // elevation: body.elevation,
      // duration: body.duration,
      // difficulty: body.difficulty,
      // rating: body.rating,
      // url: body.url,
      // imageUrl: body.imageUrl,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
  };
};
