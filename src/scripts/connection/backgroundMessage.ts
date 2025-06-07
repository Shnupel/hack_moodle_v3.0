import { onMessage as rawOnMessage } from "webext-bridge/background";
import { MessagePayload } from "@src/connection/types";

export async function onMessage<T extends keyof MessagePayload>(
	messageType: T,
	requestFunction: (
		request: Array<MessagePayload[T]["request"]>,
	) => Promise<MessagePayload[T]["response"]>,
) {
	return rawOnMessage<MessagePayload[T]["request"], MessagePayload[T]["response"]>
	(messageType, async ({ data }) => {
		return await requestFunction(data as Array<MessagePayload[T]["request"]>);
	});
}