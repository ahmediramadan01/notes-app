import checkboxIcon from "../../assets/icons/checkbox-icon.svg";
import checkboxCheckedIcon from "../../assets/icons/checkbox-checked-icon.svg";

class ShowCompletedView {
	#buttonElement = document.querySelector(".button--show-completed");

	addHandlerShow(handler) {
		this.#buttonElement.addEventListener("click", () => {
			if (!this.#buttonElement.classList.contains("button--checked")) {
				this.#buttonElement.classList.add("button--checked");
				this.#buttonElement.querySelector("img").src = checkboxCheckedIcon;
			} else {
				this.#buttonElement.classList.remove("button--checked");
				this.#buttonElement.querySelector("img").src = checkboxIcon;
			}
			handler();
		});
	}
}

export default new ShowCompletedView();
