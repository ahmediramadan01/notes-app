class AddView {
	#dialogAddElement = document.querySelector(".dialog--add");
	#buttonOpenElement = document.querySelector(".button--open");
	#formElement = document.querySelector(".dialog--add__form");
	#descriptionElement = document.querySelector("#description");
	#descriptionCountElement = document.querySelector(".description-count");
	#buttonCloseElement = document.querySelector(".button--close");
	#buttonCancelElement = document.querySelector(".button--cancel");

	constructor() {
		this.#addHandlerOpenFormDialog();
		this.#addHandlerCloseFormDialog();
		this.#addHandlerResetForm();
		this.#addHandlerDescriptionCount();
	}

	#resetForm() {
		this.#formElement.reset();
	}

	#openFormDialog() {
		this.#dialogAddElement.showModal();
	}

	#closeFormDialog() {
		this.#dialogAddElement.close();
		this.#resetForm();
	}

	#addHandlerOpenFormDialog() {
		this.#buttonOpenElement.addEventListener(
			"click",
			this.#openFormDialog.bind(this),
		);
	}

	#addHandlerCloseFormDialog() {
		this.#buttonCloseElement.addEventListener(
			"click",
			this.#closeFormDialog.bind(this),
		);
		this.#buttonCancelElement.addEventListener(
			"click",
			this.#closeFormDialog.bind(this),
		);
	}

	#addHandlerResetForm() {
		window.addEventListener("keydown", (event) => {
			if (event.key === "Escape") {
				this.#resetForm();
			}
		});
	}

	#addHandlerDescriptionCount() {
		this.#descriptionElement.addEventListener("input", (event) => {
			this.#descriptionCountElement.textContent = event.target.value.length;
		});
	}

	addHandlerAddNote(handler) {
		this.#formElement.addEventListener("submit", (event) => {
			event.preventDefault();
			let note;

			if (document.querySelector("#id").value === "") {
				const now = new Date();
				const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

				const noteArray = [...new FormData(this.#formElement)];
				const noteObject = Object.fromEntries(noteArray);
				note = {
					...noteObject,
					id: String(Date.now()),
					creationDate: formattedDate,
					completed: false,
				};
				handler(note, true);
			} else {
				const noteArray = [...new FormData(this.#formElement)];
				const noteObject = Object.fromEntries(noteArray);
				note = {
					...noteObject,
				};

				handler(note, false);
			}

			this.#closeFormDialog();
		});
	}
}

export default new AddView();
