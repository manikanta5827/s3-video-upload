import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "ap-south-1" });
const BUCKET_NAME = process.env.BUCKET_NAME!;

if (!BUCKET_NAME) throw new Error("BUCKET NAME is not passed in env");

export async function generateUrl(fileName: string): Promise<string> {
  return getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `uploads/${fileName}`,
    }),
    { expiresIn: 3600 }
  );
}
