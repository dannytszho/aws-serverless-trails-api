import * as AWS from "aws-sdk";
import { PutItemInput } from "aws-sdk/clients/dynamodb";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TRAILS_TABLE;

export const createTrail = async event => {
  try {
    const trail = event.arguments.input;

    const params: PutItemInput = {
      TableName: tableName!,
      Item: {
        primary_key: trail.primary_key,
        name: trail.name,
        length: trail.length,
        elevation: trail.elevation,
        duration: trail.duration,
        difficulty: trail.difficulty,
        rating: trail.rating,
        url: trail.url,
        imageUrl: trail.imageUrl,
        createdAt: trail.createdAt,
      },
    };
    await dynamoDb.put(params).promise();

    return trail;
  } catch (e) {
    return e;
  }
};
