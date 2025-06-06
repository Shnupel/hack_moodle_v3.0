import { IParsingResult, QuestionParser } from "@src/QuestionParser";
import { ImageDataType, ImageParser } from "@QuestionParser/ImageParser";
import { PromptCreator } from "@QuestionParser/PromptCreator";

export type AiRequest = {
	model: string;
}

interface RequestData {
	text: string;
	images: ImageParser[]
}

export abstract class AbstractAIRequestBuilder<T extends AiRequest> {
	protected aiRequestData: RequestData;

	private readonly taskParser: QuestionParser;
	private readonly imageParser: ImageParser;

	protected constructor(taskParser: QuestionParser, imageParser: ImageParser) {
		this.taskParser = taskParser;
		this.imageParser = imageParser;
		this.aiRequestData = {
			text: "request text",
			images: []
		};
	}

	protected readText(): string {
		const parsingTextResult: IParsingResult = this.taskParser.parse();
		const promptCreator = new PromptCreator(parsingTextResult);
		return promptCreator.createPrompt();
	}

	protected readImage(): ImageDataType[] {
		return this.imageParser.getImagesConfigs();
	}

	protected abstract addImage(image: HTMLElement): void;

	protected abstract addText(text: HTMLElement): void;

	public abstract build(): T;
}
