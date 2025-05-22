import { ChooseConfig } from "./ChooseAi";

const toggleButton: HTMLElement | null = document.getElementById("toggleButton");
const statusText: HTMLElement | null = document.getElementById("statusText");

toggleButton?.addEventListener("click", () => {
	const isActive = JSON.parse(localStorage.getItem("isActive") || "false");

	localStorage.setItem("isActive", JSON.stringify(!isActive));

	if (statusText) {
		if (isActive) {
			toggleButton.classList.add('vpn-popup__toggle--active');
			statusText.textContent = 'Подключено';
			statusText.classList.add('vpn-popup__indicator-value--connected');
		} else {
			toggleButton.classList.remove('vpn-popup__toggle--active');
			statusText.textContent = 'Не подключено';
			statusText.classList.remove('vpn-popup__indicator-value--connected');
		}
	}
})

const btn = document.getElementById("open-configs");

const form = document.createElement("form");
form.setAttribute("class", "ai-variants")

btn?.addEventListener("click", () => {
	btn.classList.toggle("active");
	const listOfAi = ChooseConfig.getList();

	for (let i = 0; i < listOfAi.length; i++) {
		const element = document.createElement("label");
		element.setAttribute("class", "ai-variants__input");

		const nameOfAi = document.createElement("span");
		nameOfAi.innerText = listOfAi[i];

		element.append(nameOfAi);

		const radioElement = document.createElement("input");
		radioElement.setAttribute("type", "radio");
		radioElement.setAttribute("value", listOfAi[i]);
		radioElement.setAttribute("name", "AIName");

		element.append(radioElement);
		form.append(element);
	}

	if (btn.classList.contains("active"))	{
		document.getElementById("footer")?.appendChild(form);
	} else {
		form.innerHTML = "";
	}
})