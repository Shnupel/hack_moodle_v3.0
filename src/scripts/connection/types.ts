import type { AiRequest } from "@RequestBuilder/AIBuilder";
import type { AiResponse } from "@src/clients/AbstractAiClient";

export type MessagePayload = {
  "AI_REQUEST": {
    request: AiRequest;
    //!!! change to AiResponse
    response: any;
  }

  //!!! here we can create users request (user profile and et.c.) with fields "request" and "response"
}