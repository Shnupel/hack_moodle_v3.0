import { AbstractAiClient, AiResponse } from "@src/clients/AbstractAiClient";
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

interface ChatCompletionResponse extends AiResponse {
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

	// !!! add as argument: request: GPTRequest
	public createRequest(): Promise<Response> {
		const testPayload = {
			input: [
				{
					role: "user",
					content: [
						{ type: "input_text", text: "Hello! How are you?" }
					]
				}
			],
			model: "gpt-3.5-turbo"
		};
		//!!! change to request.proxyApyLink
		return fetch("https://api.proxyapi.ru/openai/v1/responses", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer sk-r88he4fDmrYqsjNvfc28RrvvOuNQ5RSB`
			},
			body: JSON.stringify(testPayload)
		})
	}
}