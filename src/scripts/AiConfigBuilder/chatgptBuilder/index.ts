import { IBuilderAIConfigs } from "../IBuilderAI";

interface IBuilderGpt extends IBuilderAIConfigs {
	config: {
		model: string
		input: {
			role: string;
			content: {
				type: string;
				text?: string;
				image_url?: string
			}[]
		}[]
	}
}

class GptConfigBuilder implements IBuilderGpt {
	config: any;
	name: string = "";
	versions: { name: string }[] = [];

	addImage(image: HTMLElement): void {
	}

	addText(text: HTMLElement): void {
	}

}