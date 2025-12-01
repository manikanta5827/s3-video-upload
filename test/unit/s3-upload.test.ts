import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handler } from "../../lambda-functions/s3-upload/app";
import { expect, describe, it } from "@jest/globals";
import * as urlModule from "../../lambda-functions/s3-upload/generateUrl";

jest.mock("../../lambda-functions/s3-upload/generateUrl");

describe("Testing s3 upload file", () => {
  it("s3 pre signed url generation", async () => {
        (urlModule.generateUrl as jest.Mock).mockResolvedValue("https://mocked-url.com");

        
  });
});
