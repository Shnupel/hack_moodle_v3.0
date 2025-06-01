import { GPTRequestBuilder } from "@RequestBuilder/ChatgptBuilder";
import { AbstractAIRequestBuilder, AiRequest } from "@RequestBuilder/AIBuilder";
import { AbstractAiClient } from "@src/clients/AbstractAiClient";
import { GPTClient } from "@src/clients/GPTClient";

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
		const requests = this.createRequests(this.getQuestionElements());

		const client = this.createAiClient();

		// @ts-ignore
		const responsesFromAi: Promise<Response>[] = requests.map(request => client.sendRequest(request));

		const results = await Promise.all(responsesFromAi);

		console.log(results)
	}
}

const programRunner = new ProgramRunner();

programRunner.run();