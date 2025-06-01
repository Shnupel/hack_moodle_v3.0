import { AbstractAiClient } from "@src/clients/AbstractAiClient";
import { GPTRequest } from "@RequestBuilder/ChatgptBuilder";

interface ChatCompletionMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

interface ChatCompletionChoice {
	index: number;
	message: ChatCompletionMessage;
	finish_reason: string;
}

interface ChatCompletion {
	id: string;
	object: 'chat.completion';
	created: number;
	model: string;
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
	choices: ChatCompletionChoice[];
}


export class GPTClient extends AbstractAiClient<GPTRequest> {
	constructor() { super()	}

	private createRequest(request: GPTRequest): Promise<Response> {
		return fetch(request.proxyApyLink, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer sk-auPCuVqtlgdAaYMMrfmCxs0zQ6IEgSr9`
			},
			body: JSON.stringify(request)
		})
	}

	public sendRequest(request: GPTRequest): Promise<Response> {
		return this.createRequest(request);
	}
}