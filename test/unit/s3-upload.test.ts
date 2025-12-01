import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {handler} from "../../lambda-functions/s3-upload/app";
import { expect, describe, it } from "@jest/globals";
import { mockClient } from "aws-sdk-client-mock";


describe('Testing s3 upload file', ()=>{
    it('s3 pre signed url generation', async()=>{
        
    })
})
