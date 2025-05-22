import { QuestionParser } from "@src/QuestionParser";
import { ImageObject } from "@src/QuestionParser/ImageObject";

export interface AiRequest {
	model: string;
}

interface RequestData {
	text: string;
	images: ImageObject[]
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

	private readText(): void {

	}

	private readImage() {

	}

	protected abstract addImage(image: HTMLElement): void;

	protected abstract addText(text: HTMLElement): void;

	public abstract build(): T;
}
