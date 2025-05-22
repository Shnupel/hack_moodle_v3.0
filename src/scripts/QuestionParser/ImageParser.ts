export interface ImageDataType {
	isLink: boolean;
	data: string;
}


export class ImageParser {
	constructor() {	}

	public static parseImage(element: HTMLImageElement): ImageDataType | null {
		const image = element.querySelector(".qtext img") as HTMLImageElement;

		if (!image) return null;

		// try {
		// image.crossOrigin = "anonymous";
		// } catch (e) {
		// check tcs pref, question 19
		// }

		if (!image.src.includes("moodle.innopolis.university")) {
			return {
				isLink: true,
				data: image.src,
			};
		}

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		canvas.width = image.width;
		canvas.height = image.height;

		ctx.drawImage(image, 0, 0);

		const dataURL = canvas.toDataURL("image/png");

		const imageBase64 = dataURL.replace(/^data:image\/\w+;base64,/, "");

		const decoded = atob(imageBase64);

		let isCorrectDecode = true;

		// Проверяем, что результат содержит только допустимые байты
		for (let i = 0; i < decoded.length; i++) {
			if (decoded.charCodeAt(i) > 255) {
				isCorrectDecode = false;
			}
		}

		if (!isCorrectDecode) throw new Error("Image format is not correct");

		return {
			isLink: false,
			data: imageBase64,
		};
	}
}