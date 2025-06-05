import { GPTRequestBuilder } from "@RequestBuilder/ChatgptBuilder";
import { AbstractAIRequestBuilder, AiRequest } from "@RequestBuilder/AIBuilder";
import { AbstractAiClient } from "@src/clients/AbstractAiClient";
import { GPTClient } from "@src/clients/GPTClient";
import { sendMessage, onMessage } from "webext-bridge/content-script";

class ProgramRunner {
	private chosenAi: AbstractAIRequestBuilder<AiRequest> | null = null;
	private chosenClient: AbstractAiClient<AiRequest> | null = null;
	constructor() {	}

	private getQuestionElements(): HTMLElement[] {
		return Array.from(document.querySelectorAll('.que'));
	}

	private createAiBuilder(questionElement: HTMLElement) {
		if (this.chosenAi === null) this.chosenAi = new GPTRequestBuilder(questionElement);

		return new GPTRequestBuilder(questionElement);
	}

	private createAiClient() {
		if (this.chosenClient === null) this.chosenClient = new GPTClient();

		return new GPTClient();
	}

	private createRequests(questionElements: HTMLElement[]): AiRequest[] {
		return questionElements.map(questionElement => this.createAiBuilder(questionElement).build());
	}
	
	public async run() {
		// const requests = this.createRequests(this.getQuestionElements());
		//
		// console.log(requests);
		//
		// const client = this.createAiClient();
		//
		// @ts-ignore
		// const responsesFromAi: Promise<Response>[] = requests.map(request => client.sendRequest(request));
		//
		// const results = await Promise.all(responsesFromAi);

		// await sendMessageFromApi();

		// onMessage("123", handleMessage);
		//
		// function handleMessage(message: any) {
		// 	console.log(message);
		// }
	}
}

const programRunner = new ProgramRunner();

programRunner.run();



// import { sendMessage } from "webext-bridge";

const run = async () => {
	try {
		// Отправляем запрос в фоновый скрипт
		//@ts-ignore
		const { result, error } = await sendMessage(
			"api-request",
			{ question: "2+2=?" }, // Передаем вопрос
			"background"
		);

		if (error) {
			console.error("API Error:", error);
			return;
		}

		// Правильный доступ к данным ответа
		console.log("AI Response:", result.choices[0].message.content);
	} catch (err) {
		console.error("Message error:", err);
	}
}

run();