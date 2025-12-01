import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { generateUrl } from "./generateUrl";
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  let body: { fileName: string } = JSON.parse(event.body as string);
  let { fileName } = body;

  if (!fileName || fileName === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "error",
        message: "fileName is required",
      }),
    };
  }

  fileName = body.fileName;

  const url = await generateUrl(fileName);

  return {
    statusCode: 200,
    body: JSON.stringify({ url }),
  };
};
