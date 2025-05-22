// may be write this in another folder?

export interface IBuilderConfig {
	name: string
	versions: { name: string; version: string }[]
}

export class ChooseConfig {
	private static readonly list: string[] = ["ChatGpt", "Claude", "DeepSeek"];
	// private readonly chosenConfiguration: configurationOfAi;

	constructor() {}

	public static getList(): string[] {
		return this.list;
	}
}

