import { AbstractAiClient, AiResponse } from "@src/content/clients/AbstractAiClient";
import { GPTRequest } from "@src/content/RequestBuilder/ChatgptBuilder";

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
	public createRequest(request: GPTRequest): Promise<Response> {
		const testPayload = {
			input: [
				{
					role: "user",
					content: [
						{ type: "input_text", text: "2+2=?" }
					]
				}
			],
			model: "gpt-3.5-turbo"
		};
		//!!! change to request.proxyApyLink
		const { proxyApyLink, ...requestBody } = request;
		//"https://api.proxyapi.ru/openai/v1/responses"
		return fetch(proxyApyLink, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer sk-r88he4fDmrYqsjNvfc28RrvvOuNQ5RSB`
			},
			body: JSON.stringify(testPayload)
		})
	}
}