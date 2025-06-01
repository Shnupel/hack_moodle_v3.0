import { AiRequest } from "@RequestBuilder/AIBuilder";

export abstract class AbstractAiClient<T extends AiRequest> {
	protected constructor() {	}

	public abstract sendRequest(request: T): Promise<any>;
}