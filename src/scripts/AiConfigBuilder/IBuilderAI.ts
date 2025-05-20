export interface IBuilderAIConfigs {
	name: string;
	versions: {
		name: string
	}[]

	addText(text: HTMLElement): void
	addImage(image: HTMLElement): void

	config: any
}

