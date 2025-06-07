import { AiRequest } from "@src/content/RequestBuilder/AIBuilder";

export type AiResponse = Record<string, object | string | number>;

export abstract class AbstractAiClient<T extends AiRequest> {
	protected constructor() {	}

	public abstract createRequest(request: T): Promise<any>;
}