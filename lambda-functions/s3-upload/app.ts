import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { generateUrl } from "./generateUrl";
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const body = event.body ? JSON.parse(event.body) : {};
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "error",
        message: "fileName is required",
      }),
    };
  }
  const fileName = body.fileName as string;
  console.log(fileName);

  if (!fileName) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "error",
        message: "fileName is required",
      }),
    };
  }

  const url = await generateUrl(fileName);

  return {
    statusCode: 200,
    body: JSON.stringify({ url }),
  };
};
