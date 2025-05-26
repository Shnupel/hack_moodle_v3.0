import { IParsingResult, QuestionParser } from "@src/QuestionParser";
import { ImageParser } from "@QuestionParser/ImageParser";
import { PromptCreator } from "@QuestionParser/PromptCreator";

export interface AiRequest {
	model: string;
}

interface RequestData {
	text: string;
	images: ImageParser[]
}

export abstract class AbstractAIRequestBuilder<T extends AiRequest> {
	protected aiRequestData: RequestData;

	private readonly taskParser: QuestionParser;

	protected constructor(taskParser: QuestionParser) {
		this.taskParser = taskParser;
		this.aiRequestData = {
			text: "request text",
			images: []
		};
	}

	protected get getRequestData(): RequestData {
		return this.aiRequestData;
	}

	protected readText(): string {
		const parsingTextResult: IParsingResult = this.taskParser.parse();
		const promptCreator = new PromptCreator(parsingTextResult);
		return promptCreator.createPrompt();
	}

	private readImage() {

	}

	protected abstract addImage(image: HTMLElement): void;

	protected abstract addText(text: HTMLElement): void;

	public abstract build(): T;
}
