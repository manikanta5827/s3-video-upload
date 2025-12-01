import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { generateUrl } from "./generateUrl";
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  let body: { fileName: string } = JSON.parse(event.body as string);
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "error",
        message: "fileName is required",
      }),
    };
  }
  const fileName = body.fileName;
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
