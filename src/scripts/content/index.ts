import { GPTRequestBuilder } from "./RequestBuilder/ChatgptBuilder";
import { AbstractAIRequestBuilder, AiRequest } from "./RequestBuilder/AIBuilder";
import { AbstractAiClient } from "./clients/AbstractAiClient";
import { GPTClient } from "./clients/GPTClient";
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
		const requests = this.createRequestsBody(this.getQuestionElements());

		const responses = await sendAiRequests(requests);

		console.log(responses);
	}
}

const programRunner = new ProgramRunner();

programRunner.run();