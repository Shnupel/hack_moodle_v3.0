// import { sendMessage as rawSendMessage } from "webext-bridge/content-script";
// import { MessagePayload } from "@src/connection/types";
//
// export function sendMessage<T extends keyof MessagePayload>(
//   typeOfMessage: T,
//   payload: MessagePayload[T]["request"],
// ): MessagePayload[T]["response"] {
//   return rawSendMessage<MessagePayload[T]["request"], MessagePayload[T]["response"]>(typeOfMessage, payload);
// }
//
// export function sendAiRequest<T extends keyof MessagePayload>(requestBody: MessagePayload[T]["request"]) {
//   return sendMessage("AI_REQUEST", requestBody);
// }