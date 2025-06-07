import { GPTRequestBuilder } from "@RequestBuilder/ChatgptBuilder";
import { AbstractAIRequestBuilder, AiRequest } from "@RequestBuilder/AIBuilder";
import { AbstractAiClient } from "@src/clients/AbstractAiClient";
import { GPTClient } from "@src/clients/GPTClient";
import { sendAiRequests } from "@src/connection/contentMessage";

class ProgramRunner {
	private chosenAi: AbstractAIRequestBuilder<AiRequest> | null = null;
	private chosenClient: AbstractAiClient<AiRequest> | null = null;
	constructor() {	}

	public getQuestionElements(): HTMLElement[] {
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

	private createRequestsBody(questionElements: HTMLElement[]): AiRequest[] {
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

		const requests = this.createRequestsBody(this.getQuestionElements());

		console.log(requests);
	}
}

const programRunner = new ProgramRunner();

programRunner.run();

const run = async () => {
	const chatGptBuilder = new GPTRequestBuilder(programRunner.getQuestionElements()[0]);

	console.log(programRunner.getQuestionElements()[0]);

	const responses = await sendAiRequests([chatGptBuilder.build(), chatGptBuilder.build()]);

	console.log(responses, "dsf");
};

run()