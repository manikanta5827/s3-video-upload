import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const s3 = new S3Client({ region: "ap-south-1" });

const BUCKET_NAME = process.env.BUCKET_NAME;

if (!BUCKET_NAME) throw new Error("BUCKET_NAME is not passed in env");

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  let body: { fileName: string } = JSON.parse(event.body as string);

  if (!body.fileName) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "error",
        message: "fileName is required",
      }),
    };
  }
  
  let fileName = body.fileName;

  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `uploads/${fileName}`,
    }),
    { expiresIn: 3600 }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ url }),
  };
};
