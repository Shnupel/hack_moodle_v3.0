import { IParsingResult, QuestionTypes } from "@QuestionParser/index";

export class PromptCreator {
	private readonly parsingResult: IParsingResult;

	private readonly basePrompts: Record<QuestionTypes, string> = {
		[QuestionTypes.TRUE_FALSE]:      "Please provide the correct answer in one word (TRUE or FALSE) without any explanations:",
		[QuestionTypes.MATCH]:           "Please provide the correct matching answers in the format: 1.\\n answer X, 2. answer Y,\\n and so on, without any explanations: ",
		[QuestionTypes.SHORT_ANSWER]:    "Please provide a short answer (1-2 words) without any explanations:",
		[QuestionTypes.MULTIPLE_CHOICE]: "Please provide a short and direct answer without any explanations, separated by commas: ",
		[QuestionTypes.SINGLE_CHOICE]:   "Please provide a short and direct answer without any explanations. You must choose only one answer:",
		[QuestionTypes.NUMERICAL]:       "Please provide a short answer (1-2 words) without any explanations:",
		[QuestionTypes.DEFAULT_TASK]:    "Answer the question below:",
	};

	constructor(parsingResult: IParsingResult) {
		this.parsingResult = parsingResult;
	}

	public createPrompt(): string {
		const firstPart = "This is a question from my university test. ";

		const template = this.basePrompts[this.parsingResult.type] ?? this.basePrompts[QuestionTypes.DEFAULT_TASK];

		return firstPart + template + "\n\n" + this.parsingResult.data + "Check the correctness twice before answering.";
	}
}