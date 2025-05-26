import { AbstractAIRequestBuilder, AiRequest } from "@RequestBuilder/AIBuilder";
import { QuestionParser } from "@src/QuestionParser";
import { PromptCreator } from "@QuestionParser/PromptCreator";

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
	private request: GPTRequest = {
		model: "GPT",
		input: [{
			role: "user",
			content: [{
				type: "type of request data",
				text: "text"
			}]
		}]
	};

	constructor(task: HTMLElement) {
		const taskParser = new QuestionParser(task);

		super(taskParser);
	}

	protected override addImage(image: HTMLElement): void {
		// добавляет в конфиг фото
	}

	protected override addText(): void {
		// добавляет в конфиг текст

		this.request.input[0].content[0].type = "text";
		this.request.input[0].content[0].text = this.readText();
	}

	public override build(): GPTRequest {
		this.addText();
		return this.request;
	}
}
