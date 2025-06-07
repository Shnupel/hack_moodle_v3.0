import { onMessage as rawOnMessage } from "webext-bridge/background";
import { MessagePayload } from "@src/connection/types";
//
// export function onMessage<T extends keyof MessagePayload>(
//   messageType: T,
//   requestFunction: (
//     request: MessagePayload[T]["request"]
//   ) => Promise<MessagePayload[T]["response"]>
// ) {
//   console.log("background message worker")
//   // !!! here can be error. review this
//   console.log(messageType)
//   console.log(requestFunction)
//   rawOnMessage<MessagePayload[T]["request"], MessagePayload[T]["response"]>(messageType, async ({ data }) => {
//     console.log(data)
//     console.log(requestFunction)
//     console.log("fsdjhkfksdgfldsjkhgfjkasdgfjahksgfjkdsgsdgfasdhjafghjashgjdfghjASDHGJFASDFJKHG")
//
//     const response = await requestFunction(data);
//     console.log(response)
//     return response;
//   });
// }
//

export function onMessageWrapped<T extends keyof MessagePayload>(
	message: T,
	requestFunction: (
		request: MessagePayload[T]["request"],
	) => Promise<MessagePayload[T]["response"]>,
) {
	return rawOnMessage<MessagePayload[T]["request"], MessagePayload[T]["response"]>(message, async ({ data }) => {
		const response = await requestFunction(data as MessagePayload[T]["request"]);

		const d = await response.json();

		console.log(d, data);

		return d;
	});
}