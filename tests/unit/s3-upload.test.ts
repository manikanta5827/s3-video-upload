import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handler } from "../../lambda-functions/s3-upload/app";
import { expect, describe, it } from "@jest/globals";
import * as urlModule from "../../lambda-functions/s3-upload/generateUrl";

import { readFileSync } from "node:fs";
import path from "node:path";
const event: APIGatewayProxyEvent = JSON.parse(
  readFileSync(path.join(__dirname + "/../events/s3-upload.event.json"), "utf8")
);

jest.mock("../../lambda-functions/s3-upload/generateUrl");

describe("Testing s3 upload file", () => {
  it("s3 pre signed url generation", async () => {
    (urlModule.generateUrl as jest.Mock).mockResolvedValue(
      "https://mocked-url.com"
    );

    let response: APIGatewayProxyResult = await handler(event);

    console.log(response);
    expect(response.statusCode).toBe(200);
  });

  it("send file name required if filename is empty", async () => {
    (urlModule.generateUrl as jest.Mock).mockResolvedValue(
      "https://mocked-url.com"
    );

    // remove filename from body and submit it
    let parsedBody = JSON.parse(event.body as string);
    delete parsedBody.fileName;
    event.body = JSON.stringify(parsedBody);

    let response: APIGatewayProxyResult = await handler(event);

    console.log(response);
    expect(response.statusCode).toBe(400);
  });
});
