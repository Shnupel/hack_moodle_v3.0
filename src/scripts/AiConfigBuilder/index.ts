export interface IBuilderConfig {
	name: string
	versions: { name: string; version: string }[]
}

export class ConfigAIBuilder {
	private static readonly list: string[] = ["ChatGpt", "Claude", "DeepSeek"];
	// private readonly chosenConfiguration: configurationOfAi;

	constructor() {}

	public static getList(): string[] {
		return this.list;
	}
}

