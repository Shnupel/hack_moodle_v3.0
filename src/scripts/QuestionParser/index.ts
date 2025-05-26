import { ImageParser } from "@QuestionParser/ImageParser";

export enum QuestionTypes {
	TRUE_FALSE = "truefalse",
	MATCH = "match",
	SHORT_ANSWER = "shortanswer",
	MULTIPLE_CHOICE = "multichoice",
	SINGLE_CHOICE = "singlechoice",
	NUMERICAL = "numerical",
	DEFAULT_TASK = "default",
}


export interface IParsingResult {
	type: QuestionTypes;
	data: string;
}

class AnswerParser {
	constructor() {}

	public static parseTrueFalseQuestion(question: HTMLElement): IParsingResult {
		return {
			type: QuestionTypes.TRUE_FALSE,
			data: "\n Possible answers: True or False",
		}
	}

	// may be fix this?
	public static parseShortAnswer(question: HTMLElement): IParsingResult {
		return {
			type: QuestionTypes.SHORT_ANSWER,
			data: ""
		}
	}

	// may be fix it?
	public static parseNumerical(question: HTMLElement): IParsingResult {
		return this.parseShortAnswer(question);
	}

	public static defaultParse(question: HTMLElement): IParsingResult {
		return {
			type: QuestionTypes.DEFAULT_TASK,
			data: ""
		}
	}

	public static parseMatch(question: HTMLElement): IParsingResult {
		let qText = "";
		const rows = Array.from(question.querySelectorAll("table tr"));

		rows.forEach((row, index) => {
			const question = row.querySelector("td")?.innerText;
			// было: (option as HTMLElement).text, стало (option as HTMLElement).innerText
			const answers = Array.from(row.querySelectorAll("select option")).map(option => (option as HTMLElement).innerText);

			qText += `Question ${ index + 1 }: ${question} \n  Answer options: \n ${ answers.toString() } \n`;
		});

		// for single choice, rewrite it after
		// if (rows.length === 0) {
		//     qText += question.querySelector("fieldset").innerText;
		// }

		return {
			type: QuestionTypes.MATCH,
			data: qText
		};
	}

	public static parseMultipleChoice(question: HTMLElement): IParsingResult {
		let qText = "";

		const answers = question.querySelectorAll(".answer p");

		qText += "Answers: \n";
		Array.from(answers).forEach(answer => {
			qText += (answer as HTMLElement).innerText + "\n";
		});

		// check tcs pref. 6th answer didn`t parsed
		if (answers.length < 2) {
			const innerAnswers = question.querySelector(".answer");
			qText += "Answers: \n" + (innerAnswers as HTMLElement).innerText;
		}

		let qType;

		if (question.querySelector(".answer")?.querySelector("input")?.type === "radio") {
			qType = QuestionTypes.SINGLE_CHOICE;
		} else {
			qType = QuestionTypes.MULTIPLE_CHOICE;
		}

		return {
			type: qType,
			data: qText
		};
	}
}

const ANSWER_PARSERS: {
	[key in QuestionTypes]: (taskElemn: HTMLElement) => IParsingResult;
} = {
	[QuestionTypes.TRUE_FALSE]:      AnswerParser.parseTrueFalseQuestion,
	[QuestionTypes.MATCH]:           AnswerParser.parseMatch,
	[QuestionTypes.SHORT_ANSWER]:    AnswerParser.parseShortAnswer,
	[QuestionTypes.NUMERICAL]:       AnswerParser.parseNumerical,
	[QuestionTypes.MULTIPLE_CHOICE]: AnswerParser.parseMultipleChoice,
	[QuestionTypes.SINGLE_CHOICE]:   AnswerParser.parseMultipleChoice,
	[QuestionTypes.DEFAULT_TASK]:    AnswerParser.defaultParse,
}

export class QuestionParser {
	private readonly task: HTMLElement;
	private readonly imageParser: ImageParser
	constructor(task: HTMLElement) {
		this.task = task;
		this.imageParser = new ImageParser();
	}

	private parseCondition(): string {
		return ((this.task.querySelector("div.qtext") as HTMLElement).innerText || "") + "\n";
	}

	private determineTaskType(): QuestionTypes {
		for (const questionType of Object.values(QuestionTypes)) {
			if (this.task.classList.contains(questionType)) {
				return questionType;
			}
		}

		return QuestionTypes.DEFAULT_TASK;
	}

	private parseAnswerOptions(): IParsingResult {
		const qType: QuestionTypes = this.determineTaskType();

		const functionParser: (elem: HTMLElement) => IParsingResult = ANSWER_PARSERS[qType] ?? AnswerParser.defaultParse;

		return functionParser(this.task);
	}

	public parse(): IParsingResult {
		const condition = this.parseCondition();
		const answers = this.parseAnswerOptions();

		return {
			type: answers.type,
			data: condition + "\n" + answers
		}
	}
}

export type TaskParserType = typeof QuestionParser;