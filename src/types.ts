export interface PutItemInputProps {
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
