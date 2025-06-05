import { AiRequest } from "@RequestBuilder/AIBuilder";

export abstract class AbstractAiClient<T extends AiRequest> {
	protected constructor() {	}

	public abstract createRequest(request: T): Promise<any>;
}