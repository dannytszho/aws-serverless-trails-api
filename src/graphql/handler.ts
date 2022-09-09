import * as AWS from "aws-sdk";
import { v4 } from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TRAILS_TABLE;
const headers = {
  "content-type": "application/json",
};

export const createTrail = async event => {
  const timestamp = new Date().getTime();
  const trail = event.arguments.input;
  console.log(trail);

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
        // updatedAt: timestamp,
      },
    })
    .promise();

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify(trail),
  };
};
