import { AbstractAIRequestBuilder, AiRequest } from "@RequestBuilder/AIBuilder";
import { QuestionParser } from "@src/QuestionParser";

interface GPTRequest extends AiRequest {
	input: {
		role: string;
		content: {
			type: string;
			text?: string;
			image_url?: string;
		}[]
	}[]
}

export class GPTRequestBuilder extends AbstractAIRequestBuilder<GPTRequest> {
	constructor(task: HTMLElement) {
		const taskParser = new QuestionParser(task);
		super(taskParser);
	}

	protected override addImage(image: HTMLElement): void {
		// добавляет в конфиг фото
	}

	protected override addText(text: HTMLElement): void {
		// добавляет в конфиг текст
	}

	public override build(): GPTRequest {
		return {
			model: "GPT",
			input: [{
				role: "user",
				content: [{
					type: "type of request data",
					text: "text"
				}]
			}]
		}
	}
}
