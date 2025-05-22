import { GPTRequestBuilder } from "@RequestBuilder/chatgptBuilder";

const firstQuestion = document.querySelector('.que');

console.log(firstQuestion)

if (firstQuestion) {
	const gptBuilder = new GPTRequestBuilder((firstQuestion as HTMLElement));

	const config = gptBuilder.build();

	console.log(config);
}