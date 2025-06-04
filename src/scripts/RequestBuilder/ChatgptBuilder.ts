import { AbstractAIRequestBuilder, AiRequest } from "@RequestBuilder/AIBuilder";
import { QuestionParser } from "@src/QuestionParser";
import { ImageParser } from "@QuestionParser/ImageParser";

export interface GPTRequest extends AiRequest {
	proxyApyLink: string
	input: {
		role: string;
		content: {
			type: string;
			text?: string;
			image_url?: string;
		}[]
	}[],
}

export class GPTRequestBuilder extends AbstractAIRequestBuilder<GPTRequest> {
	private request: GPTRequest = {
		model: "gpt-4.1-nano",
		proxyApyLink: "https://api.proxyapi.ru/openai/v1/responses",
		input: [{
			role: "user",
			content: []
		}]
	};

	constructor(task: HTMLElement) {
		const taskParser = new QuestionParser(task);
		const imageParser = new ImageParser(task);
		super(taskParser, imageParser);
	}

	protected override addImage(): void {
		// добавляет в конфиг фото
		const images = this.readImage();
		for (const image of images) {
			const requestImgConfig= {
				type: "",
				image_url: ""
			}
			if (image.isLink) {
				requestImgConfig.type = "image_url";
				requestImgConfig.image_url = image.data;
			} else {
				requestImgConfig.type = "image_url";
				requestImgConfig.image_url = "data:image/png;base64," + image.data;
			}

			this.request.input[0].content.push(requestImgConfig);
		}
	}

	protected override addText(): void {
		this.request.input[0].content.push({
			type: "text",
			text: this.readText()
		})
	}

	public override build(): GPTRequest {
		this.addText();
		this.addImage();
		return this.request;
	}
}
