import { GPTRequestBuilder } from "@RequestBuilder/chatgptBuilder";

const firstQuestion = document.querySelector('.que');

console.log(firstQuestion)

if (firstQuestion) {
	const gptBuilder = new GPTRequestBuilder((firstQuestion as HTMLElement));
	const obj = gptBuilder.build();

	console.log(obj)
}