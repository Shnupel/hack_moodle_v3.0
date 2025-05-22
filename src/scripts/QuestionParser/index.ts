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


interface IParsingResult {
	type: QuestionTypes;
	answerOptions: string;
}

class AnswerParser {
	constructor() {
		if (new.target == AnswerParser) throw new Error("You cannot create an instance of the AnswerParser class");
	}

	public static parseTrueFalseQuestion(question: HTMLElement): IParsingResult {
		return {
			type: QuestionTypes.TRUE_FALSE,
			answerOptions: "\n Possible answers: True or False",
		}
	}

	// may be fix this?
	public static parseShortAnswer(question: HTMLElement): IParsingResult {
		return {
			type: QuestionTypes.SHORT_ANSWER,
			answerOptions: ""
		}
	}

	// may be fix it?
	public static parseNumerical(question: HTMLElement): IParsingResult {
		return this.parseShortAnswer(question);
	}

	public static defaultParse(question: HTMLElement): IParsingResult {
		return {
			type: QuestionTypes.DEFAULT_TASK,
			answerOptions: ""
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
			answerOptions: qText
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
			answerOptions: qText
		};
	}
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



}

export type TaskParserType = typeof QuestionParser;