# S3 Video Upload Service

This project helps you securely upload files, especially videos, directly to an Amazon S3 storage bucket. It does this by creating special, temporary upload links (called "presigned URLs").

## How it Works

1.  **Request an Upload Link**: Your application asks this service for a secure link to upload a file. You just need to tell it the name of the file you want to upload.
2.  **Get a Secure Link**: The service gives your application a unique, temporary link.
3.  **Upload Directly to S3**: Your application then uses this link to upload the file straight to an S3 bucket, without the file ever passing through a separate server.

This method makes file uploads faster and more secure.

## Key Features

-   **Secure Uploads**: Generates temporary, secure links for direct file uploads to S3.
-   **Serverless**: Uses AWS Lambda and API Gateway for an efficient, scalable, and cost-effective solution.
-   **API Endpoint**: Provides a simple way to request these upload links.

## API Endpoint: `POST /url`

To get a presigned upload URL, send a POST request to the `/url` endpoint with the name of your file.

**Example Request Body:**

```json
{
  "fileName": "my-cool-video.mp4"
}
```

**Example Success Response:**

```json
{
  "url": "https://your-s3-bucket.s3.amazonaws.com/my-cool-video.mp4?..."
}
```
You then use this `url` to upload your file.

## Deployment

This project uses AWS Serverless Application Model (SAM). To deploy it to your AWS account, use the SAM CLI:

```bash
# Build the application
sam build

# Deploy it (follow the guided steps)
sam deploy --guided
```